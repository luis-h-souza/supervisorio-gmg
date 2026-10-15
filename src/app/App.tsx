import { useEffect, useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { CommunicationCard } from "../components/CommunicationCard";
import { ElectricalMeasurements } from "../components/ElectricalMeasurements";
import { EventsSection } from "../components/EventsSection";
import { GeneratorSection } from "../components/GeneratorSection";
import { OperationDiagram } from "../components/OperationDiagram";
import { Sidebar } from "../components/Sidebar";
import { SourcePanel } from "../components/SourcePanel";
import { Topbar } from "../components/Topbar";
import type { ScenarioId, ViewId } from "../domain/types";
import { useTelemetry } from "./useTelemetry";

export default function App() {
  const [view, setView] = useState<ViewId>("dashboard");
  const [scenario, setScenario] = useState<ScenarioId>("normal");
  const [dark, setDark] = useState(
    () =>
      window.localStorage.getItem("theme") === "dark" ||
      (window.localStorage.getItem("theme") === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );
  const { snapshot, error } = useTelemetry("loja-01", scenario);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    window.localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="app-shell">
      <Sidebar activeView={view} onNavigate={setView} />
      <div className="main-column">
        <Topbar
          view={view}
          scenario={scenario}
          onScenarioChange={setScenario}
          dark={dark}
          onThemeToggle={() => setDark((current) => !current)}
        />
        <main className="content-area">
          <div className="demo-notice">
            <Info size={16} />
            <span>
              <strong>Ambiente demonstrativo</strong>
              <span className="hidden sm:inline">
                {" "}
                · Valores fictícios para validar a organização do supervisório.
              </span>
            </span>
            <span className="ml-auto rounded-full border border-current/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Somente leitura
            </span>
          </div>
          {error && (
            <div role="alert" className="error-banner">
              <AlertTriangle size={17} />
              {error}
            </div>
          )}
          {!snapshot ? (
            <div className="panel p-10 text-center text-sm text-muted">
              Carregando telemetria...
            </div>
          ) : (
            <div className="content-stack">
              {(view === "dashboard" ||
                view === "energy" ||
                view === "alarms") && <SourcePanel snapshot={snapshot} />}
              {(view === "dashboard" || view === "energy") && (
                <ElectricalMeasurements
                  grid={snapshot.grid}
                  generators={snapshot.generators}
                />
              )}
              {view === "dashboard" && <OperationDiagram snapshot={snapshot} />}
              {(view === "dashboard" || view === "generators") && (
                <GeneratorSection generators={snapshot.generators} />
              )}
              {(view === "dashboard" || view === "history") && (
                <EventsSection
                  events={snapshot.events}
                  limit={view === "dashboard" ? 5 : undefined}
                />
              )}
              {view === "alarms" && (
                <>
                  <CommunicationCard snapshot={snapshot} />
                  <EventsSection events={snapshot.events} alarmsOnly />
                </>
              )}
              {view === "generators" && (
                <ElectricalMeasurements
                  grid={snapshot.grid}
                  generators={snapshot.generators}
                />
              )}
            </div>
          )}
          <footer className="page-footer">
            <span>© 2026 · Supervisório Loja 01</span>
            <span>Telemetria via ESP32 · Dados de demonstração</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
