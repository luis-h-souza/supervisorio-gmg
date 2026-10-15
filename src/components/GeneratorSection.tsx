import { AlertTriangle, BatteryCharging, Cog, Gauge, Zap } from "lucide-react";
import type { GeneratorReading } from "../domain/types";
import { Panel } from "./Panel";
import { StatusBadge, Value } from "./StatusBadge";

function GeneratorCard({ generator }: { generator: GeneratorReading }) {
  return (
    <article className={`generator-card generator-${generator.health}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`generator-icon generator-icon-${generator.health}`}>
            <Cog size={19} />
          </span>
          <div>
            <h3 className="font-display text-base font-extrabold text-ink">
              {generator.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted">{generator.engine}</p>
          </div>
        </div>
        <StatusBadge health={generator.health}>{generator.status}</StatusBadge>
      </div>
      <div className="generator-rule" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <div className="metric-label">
            <BatteryCharging size={14} />
            Situação de carga
          </div>
          <div className="mt-1 text-sm font-semibold text-ink">
            {generator.load}
          </div>
        </div>
        <div>
          <div className="metric-label">
            <Zap size={14} />
            Tensão
          </div>
          <div className="mt-0.5">
            <Value value={generator.voltage} unit="V" />
          </div>
        </div>
        <div>
          <div className="metric-label">
            <Gauge size={14} />
            Frequência
          </div>
          <div className="mt-0.5">
            <Value value={generator.frequency} unit="Hz" />
          </div>
        </div>
        <div>
          <div className="metric-label">Potência ativa</div>
          <div className="mt-0.5">
            <Value value={generator.activePower} unit="kW" />
          </div>
        </div>
      </div>
      {generator.alarm && (
        <div className="generator-alarm">
          <AlertTriangle size={15} />
          <span>
            <strong>Alarme:</strong> {generator.alarm}
          </span>
        </div>
      )}
    </article>
  );
}

export function GeneratorSection({
  generators,
}: {
  generators: GeneratorReading[];
}) {
  return (
    <Panel
      title="Grupos geradores"
      subtitle="Estado operacional e grandezas por equipamento"
      action={<span className="count-pill">{generators.length} unidades</span>}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {generators.map((generator) => (
          <GeneratorCard key={generator.id} generator={generator} />
        ))}
      </div>
    </Panel>
  );
}
