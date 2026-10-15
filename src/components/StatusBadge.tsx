import type { ReactNode } from "react";
import type { Health } from "../domain/types";

const labels: Record<Health, string> = {
  ok: "Normal",
  warn: "Atenção",
  bad: "Falha confirmada",
  unknown: "Dados indisponíveis",
  info: "Informativo",
};

export function StatusBadge({
  health,
  children,
  className = "",
}: {
  health: Health;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span className={`badge badge-${health} ${className}`}>
      <span className="badge-dot" />
      {children ?? labels[health]}
    </span>
  );
}

export function Value({ value, unit }: { value: string | null; unit: string }) {
  if (value === null)
    return <span className="italic text-muted">Indisponível</span>;
  return (
    <span className="font-display text-lg font-bold text-ink">
      {value}{" "}
      <small className="font-sans text-xs font-medium text-muted">{unit}</small>
    </span>
  );
}
