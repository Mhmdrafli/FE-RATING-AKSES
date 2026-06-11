import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AppRoot from "../app/AppRoot";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Akses Learning" },
      { name: "description", content: "Akses Learning — the way become expert" },
    ],
  }),
  component: SplatPage,
});

function SplatPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <AppRoot />;
}