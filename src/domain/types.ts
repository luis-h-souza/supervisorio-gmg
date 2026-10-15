export type Health = "ok" | "warn" | "bad" | "unknown" | "info";
export type ViewId =
  | "dashboard"
  | "energy"
  | "generators"
  | "history"
  | "alarms";
export type ScenarioId = "normal" | "outage" | "failure" | "offline";

export interface EventRecord {
  id: string;
  occurredAt: string;
  source: string;
  message: string;
  acknowledgment: "Pendente" | "Confirmado" | "Não se aplica";
}

export interface GeneratorReading {
  id: string;
  name: string;
  health: Health;
  status: string;
  engine: string;
  load: string;
  voltage: string | null;
  frequency: string | null;
  current: string | null;
  activePower: string | null;
  alarm?: string;
}

export interface ElectricalReading {
  voltage: string | null;
  frequency: string | null;
  current: string | null;
  activePower: string | null;
  stale?: boolean;
}

export interface TelemetrySnapshot {
  source: {
    label: string;
    health: Health;
    description: string;
    gridAvailable: boolean | null;
    generatorsFeeding: boolean | null;
  };
  communication: {
    health: Health;
    age: string;
    lastUpdated: string;
  };
  generators: GeneratorReading[];
  grid: ElectricalReading;
  events: EventRecord[];
}
