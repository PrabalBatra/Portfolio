import { createFileRoute } from "@tanstack/react-router";
import { Stack } from "@/components/sections/Stack";

export const Route = createFileRoute("/stack")({
  head: () => ({
    meta: [
      { title: "Tech Ecosystem // Prabal Batra" },
      { name: "description", content: "Explore Prabal Batra's engineering stack, multi-agent frameworks, neural architectures, and big data technology integrations." },
    ],
  }),
  component: StackPage,
});

function StackPage() {
  return <Stack />;
}
