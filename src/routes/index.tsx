import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/components/gbi/App";

export const Route = createFileRoute("/")({
  component: App,
});
