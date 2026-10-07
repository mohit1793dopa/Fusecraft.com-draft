"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";

export type MorphGalleryItem = {
  src: string;
  thumb?: string;
  alt?: string;
};

type MorphGalleryProps = {
  items: MorphGalleryItem[];
  /** Autoplay interval in ms. Pass 0 / false to disable. */
  autoplay?: number | false;
  className?: string;
  showArrows?: boolean;
  showThumbs?: boolean;
  onIndexChange?: (index: number) => void;
  /** Controlled index — when set, parent owns slide position */
  index?: number;
};

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_from;
uniform sampler2D u_to;
uniform float u_progress;
uniform vec2 u_res;
uniform float u_ratio_from;
uniform float u_ratio_to;

vec2 cover(vec2 uv, float imgRatio) {
  float canvasRatio = u_res.x / max(u_res.y, 1.0);
  vec2 scaled = uv;
  if (canvasRatio > imgRatio) {
    float s = imgRatio / canvasRatio;
    scaled.y = (uv.y - 0.5) * s + 0.5;
  } else {
    float s = canvasRatio / imgRatio;
    scaled.x = (uv.x - 0.5) * s + 0.5;
  }
  return scaled;
}

// Value noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uvFrom = cover(v_uv, u_ratio_from);
  vec2 uvTo = cover(v_uv, u_ratio_to);

  vec4 fromC = texture2D(u_from, uvFrom);
  vec4 toC = texture2D(u_to, uvTo);

  // Drifting shreds — noise threshold burns the incoming image through
  float n = fbm(v_uv * 4.5 + vec2(u_progress * 0.35, u_progress * -0.2));
  float edge = 0.12;
  float p = smoothstep(u_progress - edge, u_progress + edge, n);
  // Invert so progress 0 = fully from, 1 = fully to
  float mixAmt = 1.0 - p;
  // Soft edge shreds
  float shred = smoothstep(0.0, 0.04, abs(n - u_progress));
  vec3 burn = mix(fromC.rgb, toC.rgb, mixAmt);
  burn = mix(burn, toC.rgb * 1.08, (1.0 - shred) * mixAmt * 0.35);

  gl_FragColor = vec4(burn, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function loadTexture(
  gl: WebGLRenderingContext,
  src: string,
): Promise<{ tex: WebGLTexture; ratio: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const tex = gl.createTexture();
      if (!tex) {
        reject(new Error("texture"));
        return;
      }
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      resolve({ tex, ratio: img.naturalWidth / Math.max(img.naturalHeight, 1) });
    };
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

export function MorphGallery({
  items,
  autoplay = 4500,
  className,
  showArrows = true,
  showThumbs = false,
  onIndexChange,
  index: controlledIndex,
}: MorphGalleryProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const texturesRef = useRef<
    Array<{ tex: WebGLTexture; ratio: number } | null>
  >([]);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const animRef = useRef<number | null>(null);
  const progressRef = useRef(1);
  const fromRef = useRef(0);
  const toRef = useRef(0);
  const transitioningRef = useRef(false);
  const reduceRef = useRef(false);

  const [index, setIndex] = useState(controlledIndex ?? 0);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [tick, setTick] = useState(0);

  const count = items.length;
  const active = controlledIndex ?? index;

  const setActive = useCallback(
    (next: number) => {
      const n = ((next % count) + count) % count;
      if (controlledIndex === undefined) setIndex(n);
      onIndexChange?.(n);
    },
    [count, controlledIndex, onIndexChange],
  );

  const morphTo = useCallback(
    (next: number) => {
      if (!count || next === toRef.current) return;
      const gl = glRef.current;
      if (!gl || !progRef.current || fallback || reduceRef.current) {
        fromRef.current = next;
        toRef.current = next;
        setActive(next);
        setTick((t) => t + 1);
        return;
      }

      if (transitioningRef.current) {
        // Snap current transition
        progressRef.current = 1;
        fromRef.current = toRef.current;
      }

      fromRef.current = toRef.current;
      toRef.current = next;
      progressRef.current = 0;
      transitioningRef.current = true;
      setActive(next);
      setTick((t) => t + 1);
    },
    [count, fallback, setActive],
  );

  const go = useCallback(
    (dir: -1 | 1) => {
      morphTo((active + dir + count) % count);
    },
    [active, count, morphTo],
  );

  // Sync controlled index
  useEffect(() => {
    if (controlledIndex === undefined) return;
    if (controlledIndex !== toRef.current) morphTo(controlledIndex);
  }, [controlledIndex, morphTo]);

  // Init WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || count === 0) return;

    reduceRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl || reduceRef.current) {
      setFallback(true);
      setReady(true);
      return;
    }
    glRef.current = gl;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFallback(true);
      setReady(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setFallback(true);
      setReady(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      setReady(true);
      return;
    }
    progRef.current = program;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    uniformsRef.current = {
      u_from: gl.getUniformLocation(program, "u_from"),
      u_to: gl.getUniformLocation(program, "u_to"),
      u_progress: gl.getUniformLocation(program, "u_progress"),
      u_res: gl.getUniformLocation(program, "u_res"),
      u_ratio_from: gl.getUniformLocation(program, "u_ratio_from"),
      u_ratio_to: gl.getUniformLocation(program, "u_ratio_to"),
    };

    let cancelled = false;
    (async () => {
      try {
        const loaded = await Promise.all(
          items.map((item) => loadTexture(gl, item.src)),
        );
        if (cancelled) return;
        texturesRef.current = loaded;
        fromRef.current = 0;
        toRef.current = 0;
        progressRef.current = 1;
        setReady(true);
      } catch {
        if (!cancelled) {
          setFallback(true);
          setReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      texturesRef.current.forEach((t) => {
        if (t) gl.deleteTexture(t.tex);
      });
      gl.deleteProgram(program);
      glRef.current = null;
      progRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.src).join("|"), count]);

  // Render loop
  useEffect(() => {
    if (!ready || fallback) return;
    const canvas = canvasRef.current;
    const gl = glRef.current;
    const program = progRef.current;
    if (!canvas || !gl || !program) return;

    const u = uniformsRef.current;
    const DURATION = 1.15; // seconds

    let last = performance.now();

    const resize = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (wrapRef.current) ro.observe(wrapRef.current);

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (transitioningRef.current) {
        progressRef.current = Math.min(1, progressRef.current + dt / DURATION);
        if (progressRef.current >= 1) {
          progressRef.current = 1;
          transitioningRef.current = false;
          fromRef.current = toRef.current;
        }
      }

      const fromT = texturesRef.current[fromRef.current];
      const toT = texturesRef.current[toRef.current];
      if (!fromT || !toT) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      gl.useProgram(program);
      gl.uniform2f(u.u_res, canvas.width, canvas.height);
      gl.uniform1f(u.u_progress, progressRef.current);
      gl.uniform1f(u.u_ratio_from, fromT.ratio);
      gl.uniform1f(u.u_ratio_to, toT.ratio);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fromT.tex);
      gl.uniform1i(u.u_from, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, toT.tex);
      gl.uniform1i(u.u_to, 1);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [ready, fallback]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || reduceRef.current || count < 2) return;
    const id = window.setInterval(() => go(1), autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, go, count, tick]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Swipe
  const pointerX = useRef<number | null>(null);
  const onPointerDown = (e: ReactPointerEvent) => {
    pointerX.current = e.clientX;
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    if (pointerX.current == null) return;
    const dx = e.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(dx) < 40) return;
    go(dx < 0 ? 1 : -1);
  };

  if (count === 0) return null;

  return (
    <div
      ref={wrapRef}
      className={cn("relative h-full w-full overflow-hidden bg-black", className)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {!fallback ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-pan-y"
          aria-hidden
        />
      ) : (
        // Cross-fade fallback
        <div className="absolute inset-0">
          {items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.src}
              src={item.src}
              alt={item.alt ?? ""}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                i === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      )}

      {/* Screen-reader live region */}
      <p className="sr-only" aria-live="polite">
        {items[active]?.alt ?? `Slide ${active + 1} of ${count}`}
      </p>

      {showArrows && count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/25 active:scale-95 md:left-5"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/25 active:scale-95 md:right-5"
          >
            ›
          </button>
        </>
      ) : null}

      {showThumbs && count > 1 ? (
        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2 px-4">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => morphTo(i)}
              className={cn(
                "h-1.5 w-6 rounded-full transition",
                i === active ? "bg-white" : "bg-white/35 hover:bg-white/55",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default MorphGallery;
