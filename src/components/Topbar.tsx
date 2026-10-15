import { Moon, Sun } from "lucide-react";
import type { ScenarioId, ViewId } from "../domain/types";
import { scenarioLabels } from "../data/demoData";
import { viewTitles } from "./Sidebar";

export function Topbar({
  view,
  scenario,
  onScenarioChange,
  dark,
  onThemeToggle,
}: {
  view: ViewId;
  scenario: ScenarioId;
  onScenarioChange: (value: ScenarioId) => void;
  dark: boolean;
  onThemeToggle: () => void;
}) {
  return (
    <header className="topbar">
      <div>
        <div className="text-[11px] font-semibold text-muted">
          Unidades <span className="mx-1 text-line">/</span> Loja 01
        </div>
        <h1 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">
          {viewTitles[view]}
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <label className="sr-only" htmlFor="scenario">
          Simular situação
        </label>
        <select
          id="scenario"
          className="scenario-select"
          value={scenario}
          onChange={(event) =>
            onScenarioChange(event.target.value as ScenarioId)
          }
        >
          {Object.entries(scenarioLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <button
          className="theme-button"
          onClick={onThemeToggle}
          type="button"
          aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
          title={dark ? "Tema claro" : "Tema escuro"}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand sm:flex">
          L1
        </div>
      </div>
    </header>
  );
}
