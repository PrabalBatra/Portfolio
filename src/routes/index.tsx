import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prabal Batra — AI Engineer · Geospatial Intelligence" },
      { name: "description", content: "Cinematic portfolio of Prabal Batra. Building intelligent AI systems, multi-agent reasoning and geospatial intelligence platforms." },
      { property: "og:title", content: "Prabal Batra — AI Engineer" },
      { property: "og:description", content: "Building Intelligent AI Systems for Real-World Intelligence." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-[var(--bg-deep)] text-foreground">
      <Nav />
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Experience />
      <Stack />
      <Contact />
    </main>
  );
}
