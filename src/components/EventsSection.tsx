import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import type { EventRecord } from "../domain/types";
import { Panel } from "./Panel";
import { StatusBadge } from "./StatusBadge";

function Acknowledgment({ value }: { value: EventRecord["acknowledgment"] }) {
  if (value === "Pendente")
    return <StatusBadge health="warn">Pendente</StatusBadge>;
  if (value === "Confirmado")
    return <StatusBadge health="ok">Confirmado</StatusBadge>;
  return <span className="text-xs text-muted">Não se aplica</span>;
}

export function EventsSection({
  events,
  limit,
  alarmsOnly = false,
}: {
  events: EventRecord[];
  limit?: number;
  alarmsOnly?: boolean;
}) {
  const visibleEvents = (
    alarmsOnly
      ? events.filter(
          (event) =>
            event.acknowledgment === "Pendente" ||
            /alarme|falta|perda/i.test(event.message),
        )
      : events
  ).slice(0, limit);
  return (
    <Panel
      title={alarmsOnly ? "Alarmes e ocorrências" : "Eventos recentes"}
      subtitle={
        alarmsOnly
          ? "Ocorrências que precisam de acompanhamento"
          : "Últimas alterações identificadas pelo sistema"
      }
      action={
        !alarmsOnly && (
          <button type="button" className="text-action">
            Ver histórico <ArrowUpRight size={14} />
          </button>
        )
      }
    >
      <div className="table-scroll">
        <table className="data-table events-table">
          <thead>
            <tr>
              <th>Data e hora</th>
              <th>Origem</th>
              <th>Evento</th>
              <th>Confirmação</th>
            </tr>
          </thead>
          <tbody>
            {visibleEvents.length ? (
              visibleEvents.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap">
                    <span className="flex items-center gap-2 text-xs text-muted">
                      <Clock3 size={14} />
                      {event.occurredAt}
                    </span>
                  </td>
                  <td>
                    <span className="source-tag">{event.source}</span>
                  </td>
                  <td className="font-medium text-ink">{event.message}</td>
                  <td>
                    <Acknowledgment value={event.acknowledgment} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-muted">
                  <CheckCircle2
                    size={18}
                    className="mx-auto mb-2 text-success"
                  />
                  Nenhum alarme registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
