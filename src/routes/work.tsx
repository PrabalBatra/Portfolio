import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/sections/Projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Production Repositories // Prabal Batra" },
      { name: "description", content: "Review featured work, multi-agent query routing pipelines, patent projects, and open-source geospatial repositories built by Prabal Batra." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return <Projects />;
}
