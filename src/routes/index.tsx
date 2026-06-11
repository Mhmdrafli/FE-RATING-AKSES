import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AppRoot from "../app/AppRoot";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <AppRoot />;
}