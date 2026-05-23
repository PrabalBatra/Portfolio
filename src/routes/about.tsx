import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/sections/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Identity // Prabal Batra" },
      { name: "description", content: "Learn about Prabal Batra's educational background, computer science engineering expertise, and geospatial credentials." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <About />;
}
