import { Activity, Zap } from "lucide-react";
import type { ElectricalReading, GeneratorReading } from "../domain/types";
import { Panel } from "./Panel";
import { StatusBadge, Value } from "./StatusBadge";

function Quality({ reading }: { reading: ElectricalReading }) {
  if (reading.stale)
    return <StatusBadge health="unknown">Dado vencido</StatusBadge>;
  if (reading.voltage)
    return <StatusBadge health="info">Demonstrativo</StatusBadge>;
  return <StatusBadge health="unknown">Sem leitura</StatusBadge>;
}

export function ElectricalMeasurements({
  grid,
  generators,
}: {
  grid: ElectricalReading;
  generators: GeneratorReading[];
}) {
  const rows = [
    { id: "grid", name: "Rede elétrica", reading: grid },
    ...generators.map((generator) => ({
      id: generator.id,
      name: generator.name,
      reading: {
        voltage: generator.voltage,
        frequency: generator.frequency,
        current: generator.current,
        activePower: generator.activePower,
      },
    })),
  ];
  return (
    <Panel
      title="Grandezas elétricas"
      subtitle="Leituras disponíveis por origem de energia"
      action={
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Activity size={14} /> Atualização em tempo real
        </span>
      }
    >
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Origem</th>
              <th>Tensão</th>
              <th>Frequência</th>
              <th>Corrente</th>
              <th>Potência ativa</th>
              <th>Qualidade</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ id, name, reading }) => (
              <tr key={id}>
                <th scope="row">
                  <span className="flex items-center gap-2">
                    <span className="table-icon">
                      <Zap size={14} />
                    </span>
                    {name}
                  </span>
                </th>
                <td>
                  <Value value={reading.voltage} unit="V" />
                </td>
                <td>
                  <Value value={reading.frequency} unit="Hz" />
                </td>
                <td>
                  <Value value={reading.current} unit="A" />
                </td>
                <td>
                  <Value value={reading.activePower} unit="kW" />
                </td>
                <td>
                  <Quality reading={reading} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="helper-text">
        Grandezas sem leitura validada aparecem como indisponíveis, nunca como
        zero. Corrente, potência e energia serão exibidas após a medição ser
        comprovada.
      </p>
    </Panel>
  );
}
