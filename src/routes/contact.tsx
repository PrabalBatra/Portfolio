import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Portfolio-Prabal Batra" },
      { name: "description", content: "Establish direct contact with Prabal Batra for AI development, geospatial projects, spatial modeling platforms, or multi-agent research." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <Contact />;
}
