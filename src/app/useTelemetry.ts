import { useEffect, useState } from "react";
import type { ScenarioId, TelemetrySnapshot } from "../domain/types";
import { demoTelemetryService } from "../services/telemetryService";

export function useTelemetry(siteId: string, scenario: ScenarioId) {
  const [snapshot, setSnapshot] = useState<TelemetrySnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);
    demoTelemetryService
      .getSnapshot(siteId, scenario)
      .then((nextSnapshot) => {
        if (active) setSnapshot(nextSnapshot);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os dados da unidade.");
      });
    return () => {
      active = false;
    };
  }, [siteId, scenario]);

  return { snapshot, error };
}
