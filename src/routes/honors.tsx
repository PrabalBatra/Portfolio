import { createFileRoute } from "@tanstack/react-router";
import { Achievements } from "@/components/sections/Achievements";

export const Route = createFileRoute("/honors")({
  head: () => ({
    meta: [
      { title: "Academic Decorations & Honors // Prabal Batra" },
      { name: "description", content: "Highlights of Prabal Batra's academic awards, hackathon championships, and technical scholarship decorations." },
    ],
  }),
  component: HonorsPage,
});

function HonorsPage() {
  return <Achievements />;
}
