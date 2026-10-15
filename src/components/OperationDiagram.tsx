import { Panel } from "./Panel";
import type { TelemetrySnapshot } from "../domain/types";

export function OperationDiagram({
  snapshot,
}: {
  snapshot: TelemetrySnapshot;
}) {
  const { source, generators } = snapshot;
  const unknown = source.health === "unknown";
  const diagramDescription =
    source.storeEnergized === true
      ? `${source.label} alimenta a loja`
      : source.storeEnergized === false
        ? `${source.label}; loja sem energia`
        : "Estado da alimentação da loja desconhecido";
  const color = unknown
    ? "#8390a0"
    : source.health === "bad"
      ? "#cf4d47"
      : source.health === "info"
        ? "#3768d8"
        : source.generatorsFeeding
          ? "#b97516"
          : "#168464";
  const active = "#168464";
  const genActive = (id: string) =>
    !unknown &&
    generators.find((generator) => generator.id === id)?.status === "Em carga";
  const genColor = (id: string) =>
    generators.find((generator) => generator.id === id)?.health === "bad"
      ? "#cf4d47"
      : genActive(id)
        ? color
        : "var(--diagram-line)";
  const node = (
    x: number,
    y: number,
    title: string,
    subtitle: string,
    stroke: string,
  ) => (
    <g key={title}>
      <rect
        x={x}
        y={y}
        width="140"
        height="58"
        rx="12"
        fill="var(--panel-bg)"
        stroke={stroke}
        strokeWidth="2"
      />
      <text x={x + 70} y={y + 25} textAnchor="middle" className="diagram-title">
        {title}
      </text>
      <text
        x={x + 70}
        y={y + 44}
        textAnchor="middle"
        className="diagram-subtitle"
      >
        {subtitle}
      </text>
    </g>
  );
  const wire = (d: string, on: boolean, key: string) => (
    <path
      key={key}
      d={d}
      fill="none"
      stroke={on ? color : "var(--diagram-line)"}
      strokeWidth="4"
      strokeDasharray={on ? undefined : "7 7"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
  return (
    <Panel
      title="Diagrama de operação"
      subtitle="Caminho de alimentação da unidade"
    >
      <div className="diagram-wrap">
        <svg
          viewBox="0 0 620 250"
          role="img"
          aria-label={`Diagrama de operação: ${diagramDescription}`}
          className="operation-svg"
        >
          {wire(
            "M160 62H240",
            !unknown && source.gridAvailable === true,
            "grid-qta",
          )}
          {wire("M380 62H460", source.storeEnergized === true, "qta-store")}
          {wire("M190 175V135H310V120", genActive("gmg-01"), "g1-qta")}
          {wire("M430 175V135H310", genActive("gmg-02"), "g2-qta")}
          {node(
            20,
            33,
            "Rede",
            unknown
              ? "Sem dados"
              : source.gridAvailable
                ? "Presente"
                : "Ausente",
            !unknown && source.gridAvailable ? color : "var(--diagram-line)",
          )}
          {node(
            240,
            33,
            "QTA",
            unknown
              ? "Posição desconhecida"
              : source.transferSwitch === "isolated"
                ? "Isolado para manutenção"
                : source.transferSwitch === "generators"
                  ? "Posição: geradores"
                  : source.transferSwitch === "grid"
                    ? "Posição: rede"
                    : "Posição desconhecida",
            color,
          )}
          {node(
            460,
            33,
            "Carga da loja",
            source.storeEnergized === null
              ? "Sem dados"
              : source.storeEnergized
                ? "Energizada"
                : "Sem energia",
            source.storeEnergized === true
              ? active
              : source.storeEnergized === false
                ? "var(--diagram-line)"
                : color,
          )}
          {node(
            120,
            175,
            "GMG-01",
            generators[0]?.status ?? "Sem dados",
            genColor("gmg-01"),
          )}
          {node(
            360,
            175,
            "GMG-02",
            generators[1]?.status ?? "Sem dados",
            genColor("gmg-02"),
          )}
        </svg>
      </div>
      <div className="diagram-legend">
        <span>
          <i className="legend-line legend-on" />
          Caminho ativo
        </span>
        <span>
          <i className="legend-line legend-off" />
          Sem condução confirmada
        </span>
      </div>
      <p className="helper-text">
        A posição do QTA e a transferência de carga são demonstrativas até a
        aquisição real ser comprovada.
      </p>
    </Panel>
  );
}
