import { ArrowRight, CloudOff, PlugZap, RadioTower } from "lucide-react";
import type { TelemetrySnapshot } from "../domain/types";
import { StatusBadge } from "./StatusBadge";

export function SourcePanel({ snapshot }: { snapshot: TelemetrySnapshot }) {
  const { source, communication } = snapshot;
  const tone = source.health;
  return (
    <>
      {communication.health !== "ok" && (
        <div role="alert" className="stale-banner">
          <CloudOff size={18} />
          <span>
            <strong>Sem comunicação há {communication.age}.</strong> Os valores
            abaixo são o último dado conhecido ({communication.lastUpdated}).
          </span>
        </div>
      )}
      <section
        className={`source-card source-${tone}`}
        aria-label="Fonte de alimentação atual"
      >
        <div className="source-copy">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">Alimentação atual</span>
            <StatusBadge health={source.health}>
              {source.health === "info"
                ? "Desenergização programada"
                : source.health === "bad" && source.storeEnergized === false
                  ? "Sem energia"
                  : undefined}
            </StatusBadge>
          </div>
          <h2>{source.label}</h2>
          <p>{source.description}</p>
        </div>
        <div className="source-flow" aria-label={`Fonte: ${source.label}`}>
          <div
            className={`flow-node ${source.gridAvailable ? "flow-active" : ""}`}
          >
            <PlugZap size={17} />
            <span>Rede</span>
          </div>
          <ArrowRight size={15} className="text-muted" />
          <div
            className={`flow-node ${source.generatorsFeeding ? "flow-active" : ""}`}
          >
            <RadioTower size={17} />
            <span>Geradores</span>
          </div>
          <ArrowRight size={15} className="text-muted" />
          <div
            className={`flow-node ${source.storeEnergized ? "flow-active" : ""}`}
          >
            <span className="store-icon">L</span>
            <span>
              {source.storeEnergized === null
                ? "Sem dados"
                : source.storeEnergized
                  ? "Loja"
                  : "Sem energia"}
            </span>
          </div>
        </div>
      </section>
      <div className="communication-strip">
        <span
          className={`comm-icon ${communication.health === "ok" ? "comm-ok" : "comm-bad"}`}
        >
          <RadioTower size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-ink">Comunicação</div>
          <div className="text-xs text-muted">
            Última atualização: {communication.lastUpdated}{" "}
            <span className="mx-1">·</span> há {communication.age}
          </div>
        </div>
        <StatusBadge health={communication.health}>
          {communication.health === "ok" ? "Ativa" : "Interrompida"}
        </StatusBadge>
      </div>
    </>
  );
}
