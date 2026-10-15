import { RadioTower } from "lucide-react";
import type { TelemetrySnapshot } from "../domain/types";
import { Panel } from "./Panel";
import { StatusBadge } from "./StatusBadge";

export function CommunicationCard({
  snapshot,
}: {
  snapshot: TelemetrySnapshot;
}) {
  const { communication } = snapshot;
  return (
    <Panel
      title="Comunicação"
      subtitle="Estado de conexão com o gateway de telemetria"
      className="communication-panel"
    >
      <div className="flex items-center gap-3">
        <div
          className={`comm-icon ${communication.health === "ok" ? "comm-ok" : "comm-bad"}`}
        >
          <RadioTower size={18} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-ink">Gateway ESP32</div>
          <div className="mt-0.5 text-xs text-muted">
            Última atualização em {communication.lastUpdated}
          </div>
        </div>
        <StatusBadge health={communication.health}>
          {communication.health === "ok" ? "Conectado" : "Sem comunicação"}
        </StatusBadge>
      </div>
      <div className="mt-4 rounded-lg bg-canvas px-3 py-2.5 text-xs text-muted">
        A comunicação e a situação elétrica são indicadores independentes. A
        conexão pode estar normal enquanto a unidade está sem rede.
      </div>
    </Panel>
  );
}
