import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/sections/Experience";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Professional Trajectory // Prabal Batra" },
      { name: "description", content: "Trace Prabal Batra's professional career milestones, software engineering milestones, and spatial analyst tenures." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return <Experience />;
}
