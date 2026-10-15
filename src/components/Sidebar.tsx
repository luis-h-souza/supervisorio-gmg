import {
  Activity,
  Bell,
  Bolt,
  ChevronDown,
  Clock3,
  GitBranch,
  LayoutDashboard,
  RadioTower,
  Zap,
} from "lucide-react";
import type { ViewId } from "../domain/types";

const navigation: {
  id: ViewId;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: "dashboard", label: "Visão geral", icon: LayoutDashboard },
  { id: "diagram", label: "Diagrama", icon: GitBranch },
  { id: "energy", label: "Energia", icon: Zap },
  { id: "generators", label: "Geradores", icon: Bolt },
  { id: "history", label: "Histórico", icon: Clock3 },
  { id: "alarms", label: "Alarmes e comunicação", icon: Bell },
];

export const viewTitles: Record<ViewId, string> = {
  dashboard: "Visão geral",
  diagram: "Diagrama de operação",
  energy: "Energia",
  generators: "Geradores",
  history: "Histórico",
  alarms: "Alarmes e comunicação",
};

export function Sidebar({
  activeView,
  onNavigate,
}: {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <Activity size={20} strokeWidth={2.4} />
        </div>
        <div>
          <span className="font-display text-[15px] font-extrabold tracking-tight">
            NEXUS<span className="text-brand">.ENERGY</span>
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-muted">
            Monitoramento
          </span>
        </div>
      </div>
      <button
        className="site-select"
        type="button"
        aria-label="Unidade selecionada: Loja 01"
      >
        <span className="site-icon">
          <Zap size={16} />
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-xs font-bold">Loja 01</span>
          <span className="block truncate text-[11px] text-muted">
            Energia e geradores
          </span>
        </span>
        <ChevronDown size={15} className="text-muted" />
      </button>
      <div className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[.17em] text-muted">
        Monitoramento
      </div>
      <nav className="mt-2 space-y-1" aria-label="Navegação principal">
        {navigation.map(({ id, label, icon: Icon }) => {
          const active = activeView === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={active ? "page" : undefined}
              className={`nav-link ${active ? "nav-link-active" : ""}`}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-bottom">
        <div className="connection-card">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <RadioTower size={15} className="text-success" /> Gateway ESP32
            </span>
            <span className="h-2 w-2 rounded-full bg-success ring-4 ring-emerald-100" />
          </div>
          <p className="mt-2 text-[11px] text-muted">
            Conectado · demonstração
          </p>
        </div>
        <div className="px-3 pt-4 text-[10px] text-muted">
          Supervisório v0.1 · Somente leitura
        </div>
      </div>
    </aside>
  );
}
