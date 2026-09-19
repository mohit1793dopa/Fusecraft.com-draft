import { Hero } from "@/components/home/Hero";
import { RoomGrid } from "@/components/home/RoomGrid";
import { PressStrip } from "@/components/home/PressStrip";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ProjectSectors } from "@/components/home/ProjectSectors";
import { CollaboratorsBand } from "@/components/home/CollaboratorsBand";
import { ApproachTeaser } from "@/components/home/ApproachTeaser";
import { DesignBlog } from "@/components/home/DesignBlog";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <PressStrip />
      <RoomGrid />
      <CategoryCarousel />
      <FeaturedWork />
      <ProjectSectors />
      <CollaboratorsBand />
      <ApproachTeaser />
      <DesignBlog />
      <ContactCTA />
    </main>
  );
}
