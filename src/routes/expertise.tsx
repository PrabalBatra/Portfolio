import { createFileRoute } from "@tanstack/react-router";
import { Expertise } from "@/components/sections/Expertise";

export const Route = createFileRoute("/expertise")({
  head: () => ({
    meta: [
      { title: "Visual Intelligence // Prabal Batra" },
      { name: "description", content: "Interactive visual intelligence dome showcasing geospatial layers, temporal tracking, and multi-agent spatial coordination models." },
    ],
  }),
  component: ExpertisePage,
});

function ExpertisePage() {
  return <Expertise />;
}
