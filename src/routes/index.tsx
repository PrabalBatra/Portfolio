import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";

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
  return <Hero />;
}
