export const navLinks = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Compact header tabs — logo covers home; Inquire covers contact */
export const primaryNav = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
] as const;

export const brand = {
  name: "Fusecrafts",
  location: "Nagpur, India",
  est: "2014",
  email: "hello@fusecrafts.com",
  phone: "+91 712 000 0000",
  tagline: "Fusion is the discipline.",
  subTagline: "Combination is the craft.",
  heroLine: "Detail is a discipline, not a finishing touch.",
  pitch:
    "A detail design and manufacturing studio for the in-betweens of architectural work. We enter early, combine materials and crafts with intent, and make what we draw.",
} as const;

/** Shared hero CTAs — one primary path + one conversion (avoids redundant links) */
export const heroCtas = [
  { href: "/work", label: "Selected work", primary: true },
  { href: "/contact", label: "Start a project", primary: false },
] as const;

export const heroSlides = [
  {
    image: "/images/hero-interior.jpg",
    eyebrow: "Detail design & manufacturing · Nagpur",
    title: "Detail is a discipline, not a finishing touch.",
    support:
      "We begin where others end — resolving the in-betweens of architectural work with intent.",
  },
  {
    image: "/images/hero-dining.jpg",
    eyebrow: "Facade · Lighting · Furniture · Partitions",
    title: "Fusion is the discipline.",
    support:
      "Combination is the craft. Materials, techniques, and trades brought together until the piece is right.",
  },
  {
    image: "/images/hero-workshop.jpg",
    eyebrow: "Est. 2014 — Ten years in the workshop",
    title: "Architectural thinking at the object scale.",
    support:
      "We enter early, while drawings are still being made, and stay through to what gets built.",
  },
] as const;

export const categories = [
  { slug: "beds", title: "Beds", image: "/images/browse-by-craft/beds.jpg", href: "/craft/beds" },
  { slug: "chairs", title: "Chairs", image: "/images/browse-by-craft/chairs.jpg", href: "/craft/chairs" },
  { slug: "doors", title: "Doors", image: "/images/browse-by-craft/doors.jpg", href: "/craft/doors" },
  { slug: "jhula", title: "Jhula", image: "/images/browse-by-craft/jhula.jpg", href: "/craft/jhula" },
  { slug: "lightings", title: "Lightings", image: "/images/browse-by-craft/lightings.jpg", href: "/craft/lightings" },
  { slug: "chandelier", title: "Chandelier", image: "/images/browse-by-craft/lightings.jpg", href: "/craft/lightings" },
  { slug: "partitions", title: "Partitions", image: "/images/browse-by-craft/partitions.jpg", href: "/craft/partitions" },
  { slug: "sofa", title: "Sofa", image: "/images/browse-by-craft/sofa.jpg", href: "/craft/sofa" },
  { slug: "tables", title: "Tables", image: "/images/browse-by-craft/tables.jpg", href: "/craft/tables" },
  { slug: "handles", title: "Handles", image: "/images/material-brass.jpg", href: "/work" },
  { slug: "facade-design", title: "Facade design", image: "/images/cat-facade.jpg", href: "/work" },
  { slug: "outdoor-furniture", title: "Outdoor furniture", image: "/images/browse-by-craft/chairs.jpg", href: "/craft/chairs" },
  { slug: "metal-furniture", title: "Metal furniture", image: "/images/cat-metal.jpg", href: "/work" },
  { slug: "shelve-design", title: "Shelve design", image: "/images/work-console.jpg", href: "/work" },
  { slug: "railing-design", title: "Railing design", image: "/images/room-entry.jpg", href: "/work" },
  { slug: "lounge-chairs", title: "Lounge chairs", image: "/images/work-lounge.jpg", href: "/craft/chairs" },
] as const;

/** Home showcase — projects & products. Tags never repeat kind (shown via CTA). */
export const showcaseSlides = [
  {
    kind: "project" as const,
    title: "Dining",
    blurb: "Table, seating, and light resolved as one continuous room detail.",
    tags: ["Dining", "Furniture", "Interiors"],
    image: "/images/slider/projects-01.jpg",
    primary: { href: "/work", label: "View projects" },
    secondary: { href: "/approach", label: "Explore" },
  },
  {
    kind: "project" as const,
    title: "Living",
    blurb: "Lounge volumes tuned to the plan — soft seating and joinery in balance.",
    tags: ["Living", "Joinery", "Interiors"],
    image: "/images/slider/projects-02.jpg",
    primary: { href: "/work", label: "View projects" },
    secondary: { href: "/approach", label: "Explore" },
  },
  {
    kind: "project" as const,
    title: "Entryway",
    blurb: "Thresholds, screens, and storage that hold the arrival sequence.",
    tags: ["Entryway", "Partitions", "Storage"],
    image: "/images/slider/projects-03.jpg",
    primary: { href: "/work", label: "View projects" },
    secondary: { href: "/approach", label: "Explore" },
  },
  {
    kind: "product" as const,
    title: "Objects",
    blurb: "A chair built as an object — clear form, honest materials, workshop finish.",
    tags: ["Chair", "Metal", "Furniture"],
    image: "/images/slider/products-objects.jpg",
    primary: { href: "/work#chairs", label: "View work" },
    secondary: { href: "/approach", label: "Explore" },
  },
  {
    kind: "product" as const,
    title: "Bed detail",
    blurb: "Headboard panels, frame, and fabric resolved as one bedroom detail.",
    tags: ["Bedroom", "Upholstery", "Joinery"],
    image: "/images/slider/products-02.jpg",
    primary: { href: "/work", label: "View work" },
    secondary: { href: "/approach", label: "Explore" },
  },
  {
    kind: "product" as const,
    title: "Seating",
    blurb: "Lounge and dining seats shaped for the rooms they belong to.",
    tags: ["Seating", "Wood", "Upholstery"],
    image: "/images/slider/products-01.jpg",
    primary: { href: "/work#chairs", label: "View work" },
    secondary: { href: "/approach", label: "Explore" },
  },
] as const;

/** @deprecated use showcaseSlides */
export const roomPanels = showcaseSlides.map((s) => ({
  title: s.title,
  image: s.image,
  href: s.primary.href,
  cta: s.primary.label,
}));

export const disciplines = [
  {
    slug: "beds",
    title: "Beds",
    note: "Bedroom pieces resolved to the plan — frame, finish, and proportion.",
    image: "/images/browse-by-craft/beds.jpg",
  },
  {
    slug: "chairs",
    title: "Chairs",
    note: "Seating built for daily use — clear form, honest materials.",
    image: "/images/browse-by-craft/chairs.jpg",
  },
  {
    slug: "doors",
    title: "Doors",
    note: "Thresholds and entries finished as architecture.",
    image: "/images/browse-by-craft/doors.jpg",
  },
  {
    slug: "jhula",
    title: "Jhula",
    note: "Swing seating crafted for lounges and covered outdoor rooms.",
    image: "/images/browse-by-craft/jhula.jpg",
  },
  {
    slug: "lightings",
    title: "Lightings",
    note: "Fixtures tuned to the room — scale, glow, and metalwork as one.",
    image: "/images/browse-by-craft/lightings.jpg",
  },
  {
    slug: "partitions",
    title: "Partitions",
    note: "Screens and divides that hold space without closing it.",
    image: "/images/browse-by-craft/partitions.jpg",
  },
  {
    slug: "sofa",
    title: "Sofa",
    note: "Lounge volumes tuned to the room — soft structure, workshop finish.",
    image: "/images/browse-by-craft/sofa.jpg",
  },
  {
    slug: "tables",
    title: "Tables",
    note: "Surfaces and bases resolved as one continuous detail.",
    image: "/images/browse-by-craft/tables.jpg",
  },
] as const;

export const works = [
  {
    slug: "beds",
    title: "Beds",
    category: "Collection",
    discipline: "beds",
    materials: "Wood · Upholstery",
    image: "/images/browse-by-craft/beds.jpg",
    href: "/craft/beds",
    blurb:
      "Bedroom pieces resolved to the plan — frame, finish, and proportion as one.",
  },
  {
    slug: "chairs",
    title: "Chairs",
    category: "Collection",
    discipline: "chairs",
    materials: "Wood · Finish",
    image: "/images/browse-by-craft/chairs.jpg",
    href: "/craft/chairs",
    blurb:
      "Seating built for daily use — clear form, honest materials, workshop joinery.",
  },
  {
    slug: "doors",
    title: "Doors",
    category: "Collection",
    discipline: "doors",
    materials: "Wood · Metal",
    image: "/images/browse-by-craft/doors.jpg",
    href: "/craft/doors",
    blurb:
      "Entries and thresholds finished as architecture — not catalogue hardware.",
  },
  {
    slug: "jhula",
    title: "Jhula",
    category: "Collection",
    discipline: "jhula",
    materials: "Wood · Rope",
    image: "/images/browse-by-craft/jhula.jpg",
    href: "/craft/jhula",
    blurb:
      "Swing seating with a calm silhouette — for lounges and covered outdoor rooms.",
  },
  {
    slug: "lightings",
    title: "Lightings",
    category: "Collection",
    discipline: "lightings",
    materials: "Metal · Glass",
    image: "/images/browse-by-craft/lightings.jpg",
    href: "/craft/lightings",
    blurb:
      "Ceiling and lobby light designed as architecture — scale, glow, and metalwork.",
  },
  {
    slug: "partitions",
    title: "Partitions",
    category: "Collection",
    discipline: "partitions",
    materials: "Wood · Screen",
    image: "/images/browse-by-craft/partitions.jpg",
    href: "/craft/partitions",
    blurb:
      "Screens and divides that hold space without closing it — grain and joinery in plane.",
  },
  {
    slug: "sofa",
    title: "Sofa",
    category: "Collection",
    discipline: "sofa",
    materials: "Wood · Fabric",
    image: "/images/browse-by-craft/sofa.jpg",
    href: "/craft/sofa",
    blurb:
      "Lounge pieces resolved for the room’s scale — soft volume, firm structure.",
  },
  {
    slug: "tables",
    title: "Tables",
    category: "Collection",
    discipline: "tables",
    materials: "Wood · Stone",
    image: "/images/browse-by-craft/tables.jpg",
    href: "/craft/tables",
    blurb:
      "Center and dining tables built to the plan — surface, edge, and base as one.",
  },
] as const;

export const materials = [
  {
    name: "Wood",
    note: "Grain as structure, not decoration.",
    image: "/images/material-wood.jpg",
  },
  {
    name: "Metal",
    note: "Warm brass and steel that age with the room.",
    image: "/images/material-brass.jpg",
  },
  {
    name: "Stone",
    note: "Mass and coolness as counterweight.",
    image: "/images/material-stone.jpg",
  },
  {
    name: "Rattan",
    note: "Breath and tactility in open weave.",
    image: "/images/work-lounge.jpg",
  },
] as const;

/** Named projects — hover list + detail pages */
export const projectSectors = [
  {
    slug: "matra-cafe",
    title: "Matra Cafe Project",
    tag: "Commercial",
    label: "Outdoor seating · tables · landscape",
    location: "Nagpur, India",
    area: "~2,400 sq ft outdoor dining",
    scope: "Outdoor furniture · custom tables · metal seating",
    collaborator: "Monochrome Studio",
    blurb:
      "Outdoor dining furniture designed as part of the café’s landscape — green metal, timber, and a communal table that anchors the terrace.",
    body: "Matra Cafe’s outdoor furniture was developed with Monochrome Studio as a continuous outdoor dining environment, not a set of drop-in pieces. Rounded metal chairs with curved backs and armrests take a signature green finish that ties seating to the planting and gravel around them. Tall stools for high counters keep the same light silhouette, while timber-slatted tabletops warm the concrete base. The large communal table integrates a central planter so furniture and landscape share one centreline. Powder-coated metal, timber, and soft seating were chosen for weather, daily turnover, and a playful but calm terrace character — repeated forms, soft edges, and green accents that read as one outdoor room.",
    image: "/images/project-media/matra-cafe/cover.jpg",
    cover: "/images/project-media/matra-cafe/cover.jpg",
    gallery: [
      "/images/project-media/matra-cafe/01.jpg",
      "/images/project-media/matra-cafe/02.jpg",
      "/images/project-media/matra-cafe/03.jpg",
      "/images/project-media/matra-cafe/04.jpg",
      "/images/project-media/matra-cafe/05.jpg",
      "/images/project-media/matra-cafe/06.jpg"
    ],
    catalog: [
      "/images/project-media/matra-cafe/catalog/01.jpg",
      "/images/project-media/matra-cafe/catalog/02.jpg",
      "/images/project-media/matra-cafe/catalog/03.jpg",
      "/images/project-media/matra-cafe/catalog/04.jpg",
      "/images/project-media/matra-cafe/catalog/05.jpg",
      "/images/project-media/matra-cafe/catalog/06.jpg"
    ],
    color: "#31331F",
  },
  {
    slug: "akbr-residence",
    title: "Akbr Residence",
    tag: "Residential",
    label: "Living · dining · sleep",
    location: "Nagpur, India",
    area: "Private residence",
    scope: "Custom furniture · joinery · room objects",
    collaborator: "Fatema Nasikwala",
    blurb:
      "Living, dining, and bedroom pieces designed to the plan — consoles, seating, and storage that belong to the home’s light and circulation.",
    body: "At Akbar Residence we entered as furniture and detail partners to the architectural plan, designing objects that hold their place in living, dining, and sleep rather than reading as catalogue add-ons. Consoles, seating, and storage follow the rooms’ proportions, material grain, and how the family moves between them. Edges, heights, and finishes were resolved for daily use — soft enough for home life, precise enough to sit next to architecture. The work stays quiet: wood, metal, and soft surfaces tuned so each piece feels inevitable in its corner of the house, not decorative afterthought.",
    image: "/images/project-media/akbr-residence/cover.jpg",
    cover: "/images/project-media/akbr-residence/cover.jpg",
    gallery: [
      "/images/project-media/akbr-residence/01.jpg",
      "/images/project-media/akbr-residence/02.jpg",
      "/images/project-media/akbr-residence/03.jpg",
      "/images/project-media/akbr-residence/04.jpg",
      "/images/project-media/akbr-residence/05.jpg",
      "/images/project-media/akbr-residence/06.jpg"
    ],
    catalog: [
      "/images/project-media/akbr-residence/catalog/01.jpg",
      "/images/project-media/akbr-residence/catalog/02.jpg",
      "/images/project-media/akbr-residence/catalog/03.jpg",
      "/images/project-media/akbr-residence/catalog/04.jpg",
      "/images/project-media/akbr-residence/catalog/05.jpg",
      "/images/project-media/akbr-residence/catalog/06.jpg",
      "/images/project-media/akbr-residence/catalog/07.jpg",
      "/images/project-media/akbr-residence/catalog/08.jpg"
    ],
    color: "#6F5947",
  },
  {
    slug: "fc-clap",
    title: "FC Clap",
    tag: "Commercial",
    label: "Restaurant furniture · joinery · brand colour",
    location: "Nagpur, India",
    area: "Neighbourhood restaurant",
    scope: "Dining chairs · stools · tables · ceiling accents",
    blurb:
      "A burger restaurant interior where deep red, wood, and cream repeat from chairs to communal table and overhead grid.",
    body: "FC Clap is a contemporary burger restaurant built around a clear material language: deep red, natural wood, cream upholstery, black metal, and exposed brick. We designed the furniture as the brand’s daily touchpoints — wooden dining chairs with cream seats and red backs, slim metal stools for the bar, and rounded tables that keep circulation open. The sculptural communal table uses a wooden base with red vertical detailing so a functional centrepiece also carries identity. Ceiling work folds lighting and signage into a red metal grid, tying overhead architecture back to the furniture palette. The approach is repetition and contrast over decoration: curves, warm timber, and red accents that feel youthful, durable, and ready for everyday dining.",
    image: "/images/project-media/fc-clap/cover.jpg",
    cover: "/images/project-media/fc-clap/cover.jpg",
    gallery: [
      "/images/project-media/fc-clap/01.jpg",
      "/images/project-media/fc-clap/02.jpg"
    ],
    catalog: [
      "/images/project-media/fc-clap/catalog/01.jpg",
      "/images/project-media/fc-clap/catalog/02.jpg",
      "/images/project-media/fc-clap/catalog/03.jpg",
      "/images/project-media/fc-clap/catalog/04.jpg",
      "/images/project-media/fc-clap/catalog/05.jpg"
    ],
    color: "#8B4F35",
  },
  {
    slug: "riwayat-fine-dining",
    title: "Riwayat Fine Dining",
    tag: "Commercial",
    label: "Dining chairs · ceiling · cultural detail",
    location: "Nagpur, India",
    area: "Fine-dining restaurant",
    scope: "Custom chairs · patterned ceiling · brass accents",
    blurb:
      "Fine dining where deep blue, antique gold, and hand-detailed chairs translate heritage into a contemporary room.",
    body: "Riwayat Dining interprets Indian cultural dining heritage through pattern, craft, and colour without becoming a period set. A deep blue and antique-gold palette sits on warm timber and quiet walls. We designed metal-framed dining chairs with blue upholstery and hand-painted floral motifs, softened by curved gold-toned elements that echo brass accents in the room. The ceiling becomes a decorative canopy — modular patterned panels in gold frames with warm pendant lanterns — so the overhead plane carries as much identity as the walls. Calligraphic gold works on the blue feature wall set rhythm across the dining hall. Furniture, ceiling, artwork, and light work as one layered story of ‘riwayat’ — tradition held in contemporary, serviceable form.",
    image: "/images/project-media/riwayat-fine-dining/cover.jpg",
    cover: "/images/project-media/riwayat-fine-dining/cover.jpg",
    gallery: [
      "/images/project-media/riwayat-fine-dining/01.jpg",
      "/images/project-media/riwayat-fine-dining/02.jpg"
    ],
    catalog: [
      "/images/project-media/riwayat-fine-dining/catalog/01.jpg",
      "/images/project-media/riwayat-fine-dining/catalog/02.jpg",
      "/images/project-media/riwayat-fine-dining/catalog/03.jpg"
    ],
    color: "#1D1E12",
  },
  {
    slug: "fidvi-residence",
    title: "Fidvi Residence",
    tag: "Residential",
    label: "Entry · living · custom doors",
    location: "Nagpur, India",
    area: "Private residence",
    scope: "Entry doors · furniture · architectural details",
    collaborator: "Aziz Rasheed",
    blurb:
      "A residence where entry doors, living pieces, and joinery details are resolved for how the family arrives and lives at home.",
    body: "Fidvi Residence asked for furniture and architectural details that feel permanent in a private home — especially at the threshold. We developed entry doors and living-room pieces so the first impression and the daily rooms share the same material discipline: brass and timber work, clear joinery, and finishes meant for years of use. Circulation from gate to living spaces guided proportions and hardware; living furniture was sized to the plan rather than styled as standalone objects. Detail photography of edges, panels, and fittings shows the workshop focus — not surface decoration, but doors and pieces that carry the house’s character every time someone enters or settles into a room.",
    image: "/images/project-media/fidvi-residence/cover.jpg",
    cover: "/images/project-media/fidvi-residence/cover.jpg",
    gallery: [
      "/images/project-media/fidvi-residence/01.jpg",
      "/images/project-media/fidvi-residence/02.jpg",
      "/images/project-media/fidvi-residence/03.jpg",
      "/images/project-media/fidvi-residence/04.jpg",
      "/images/project-media/fidvi-residence/05.jpg",
      "/images/project-media/fidvi-residence/06.jpg"
    ],
    catalog: [
      "/images/project-media/fidvi-residence/catalog/01.jpg",
      "/images/project-media/fidvi-residence/catalog/02.jpg",
      "/images/project-media/fidvi-residence/catalog/03.jpg",
      "/images/project-media/fidvi-residence/catalog/04.jpg",
      "/images/project-media/fidvi-residence/catalog/05.jpg",
      "/images/project-media/fidvi-residence/catalog/06.jpg",
      "/images/project-media/fidvi-residence/catalog/07.jpg",
      "/images/project-media/fidvi-residence/catalog/08.jpg"
    ],
    color: "#4B4C2E",
  },
] as const;

/** Studios & agencies we collaborate with */
export const collaborators = [
  {
    name: "Firdos Furnitures",
    role: "Furniture",
    image: "/images/collaborators/firdos-furnitures.png",
    href: "https://firdosy.com/",
  },
  {
    name: "Studio Tint",
    role: "Finishes",
    image: "/images/collaborators/studio-tint.png",
  },
  {
    name: "Venetian Design",
    role: "Mirrors & glass",
    image: "/images/collaborators/venetian-design.png",
    href: "https://www.venetiandesign.in/",
  },
  {
    name: "Stoneage Nagpur",
    role: "Stone",
    image: "/images/collaborators/stoneage-nagpur.png",
    href: "https://www.instagram.com/stoneagenagpurofficial/",
  },
  {
    name: "Variety Enterprises",
    role: "Materials",
    image: "/images/collaborators/variety-enterprises.png",
    href: "https://www.justdial.com/Nagpur/Variety-Enterprises-Near-Passport-Office-Jafar-Nagar/0712PX712-X712-211213174717-Q6F3_BZDET",
  },
  {
    name: "Moksh Lightings",
    role: "Lighting",
    image: "/images/collaborators/moksh-lightings.png",
    href: "https://www.instagram.com/p/DcjKI-YhxJM/",
  },
  {
    name: "Wall Souls",
    role: "Wall finishes",
    image: "/images/collaborators/wall-souls.png",
    href: "https://www.instagram.com/wall_souls/",
  },
] as const;

/** Design journal teasers */
export const blogPosts = [
  {
    slug: "enter-early",
    tag: "Approach",
    title: "Why entering at design stage changes the detail",
    author: "Fusecrafts",
    excerpt:
      "Called in at execution, we can only limit damage. Onboarded early, we can shape the outcome.",
    image: "/images/hero-workshop.jpg",
  },
  {
    slug: "material-fusion",
    tag: "Craft",
    title: "Fusion is a methodology, not a look",
    author: "Fusecrafts",
    excerpt:
      "Wood with metal, stone with rattan — combinations tested until the detail belongs to the room.",
    image: "/images/material-brass.jpg",
  },
  {
    slug: "mockups-matter",
    tag: "Process",
    title: "Full-scale mockups before we commit to production",
    author: "Fusecrafts",
    excerpt:
      "What works on paper rarely survives the workshop. We prototype until it does.",
    image: "/images/work-chair.jpg",
  },
] as const;

export const approachSteps = [
  {
    num: "01",
    title: "Enter early",
    body: "We join as a thinking partner at the design stage — not as a vendor handed fixed specs.",
  },
  {
    num: "02",
    title: "Fuse materials",
    body: "Wood with metal, stone with rattan, industrial strength with precise hand finishing.",
  },
  {
    num: "03",
    title: "Mock up & iterate",
    body: "Full-scale mockups and workshop testing until the detail belongs to the space.",
  },
  {
    num: "04",
    title: "Resolve deeply",
    body: "We do not merely build pieces to sit inside a room — we resolve them so they truly belong.",
  },
] as const;

export const messagingPillars = [
  {
    title: "Fusion is the method",
    body: "The best version of a product is rarely made from one material or one technique. It is made by combining them with intent.",
  },
  {
    title: "Present from the design stage",
    body: "The work begins while the drawings are still being made, not after they are finished.",
  },
  {
    title: "Ten years in the workshop",
    body: "A decade spent testing combinations most studios would not attempt is what makes the result dependable.",
  },
  {
    title: "One standard, every scale",
    body: "A door handle gets the same care as the room it belongs to — ten years of practice, not a policy.",
  },
] as const;

export const workshopTrades = [
  "Metalwork",
  "Painting",
  "Upholstery",
  "Carpentry",
] as const;

export const pressBrands = [
  {
    name: "Indian.architects",
    logo: "/images/featured-in/indian-architects.png",
  },
  {
    name: "Sylph Consultancy",
    logo: "/images/featured-in/sylph-consultancy.png",
  },
  {
    name: "The Architect's Diary",
    logo: "/images/featured-in/architects-diary.png",
  },
  {
    name: "Architect and Interiors India",
    logo: "/images/featured-in/architect-and-interiors-india.png",
  },
  {
    name: "India art n design",
    logo: "/images/featured-in/india-art-n-design.png",
  },
] as const;

/** @deprecated use pressBrands */
export const pressLogos = pressBrands.map((b) => b.name);

export const botReplies: Record<string, string> = {
  default:
    "I'm the Fusecrafts assistant. Ask about our approach, disciplines, or how to start a project.",
  approach:
    "We enter at the design stage, fuse materials and crafts with intent, mock up at full scale, and resolve every detail so it belongs to the room.",
  work: "We work across facade, lighting, furniture, and partitions — for architects, designers, and discerning clients.",
  contact:
    "Share a brief at Contact, or email hello@fusecrafts.com. We typically reply within a few business days.",
  location: "Our studio is based in Nagpur, India — established 2014.",
  fusion:
    "Fusion is our methodology: combining materials, techniques, and crafts until the best version of a piece is found.",
};
