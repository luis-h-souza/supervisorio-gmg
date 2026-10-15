import { demoSnapshots } from "../data/demoData";
import type { ScenarioId, TelemetrySnapshot } from "../domain/types";

/** Contract consumed by the UI. Production implementations should call the backend API. */
export interface TelemetryService {
  getSnapshot(
    siteId: string,
    scenario?: ScenarioId,
  ): Promise<TelemetrySnapshot>;
}

/** Temporary adapter for UI validation; replace with an HTTP API adapter when the backend is ready. */
export const demoTelemetryService: TelemetryService = {
  async getSnapshot(_siteId, scenario = "normal") {
    return demoSnapshots[scenario];
  },
};

/** Example API adapter. The backend owns MQTT ingestion and database access. */
export function createHttpTelemetryService(baseUrl: string): TelemetryService {
  return {
    async getSnapshot(siteId) {
      const response = await fetch(
        `${baseUrl}/sites/${encodeURIComponent(siteId)}/telemetry/current`,
      );
      if (!response.ok)
        throw new Error(`Falha ao carregar telemetria (${response.status})`);
      return response.json() as Promise<TelemetrySnapshot>;
    },
  };
}
