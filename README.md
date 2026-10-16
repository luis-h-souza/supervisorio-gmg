# Supervisório de energia e geradores

Frontend em React + TypeScript + Vite, com Tailwind CSS. A interface inclui as áreas de visão geral, diagrama, energia, geradores, histórico e alarmes/comunicação. O seletor de demonstração permite visualizar operação normal, falta de rede, falha de um gerador, falta total de energia, manutenção programada com QTA isolado e geradores bloqueados, e perda de comunicação. Os dados são fictícios; a integração com equipamentos ainda não está implementada.

## Desenvolvimento

```bash
npm install
npm run dev
```

Para gerar os arquivos estáticos de produção: `npm run build`. O resultado fica em `dist/`.

## Publicação na Vercel

O projeto pode ser publicado como frontend demonstrativo. Importe o repositório na Vercel e use a raiz deste projeto. O preset Vite, o comando `npm run build` e a pasta de saída `dist` normalmente são detectados automaticamente. Se precisar preencher esses campos manualmente, use esses mesmos valores. Não é necessário `vercel.json` para a aplicação atual.

O build de produção foi validado com `npm run build`. Essa publicação contém somente o frontend e os dados simulados; não recebe telemetria real do ESP32.

## Organização

- `src/domain/types.ts`: contratos tipados dos dados de telemetria.
- `src/data/demoData.ts`: cenários locais usados na demonstração.
- `src/services/telemetryService.ts`: contrato e adaptadores de leitura da telemetria.
- `src/app/`: estado da aplicação e hook de carregamento.
- `src/components/`: componentes visuais independentes.
- `src/styles.css` e `tailwind.config.js`: tokens do tema, responsividade e utilitários Tailwind.

## Integração planejada

A interface deve consumir uma API HTTP autenticada do backend. O backend recebe e valida mensagens MQTT do ESP32, normaliza os dados, aplica limites de retenção e grava no banco. O navegador não deve receber credenciais do broker MQTT nem conectar diretamente ao banco. Portanto, a Vercel hospeda a interface, mas a coleta MQTT e o banco precisam de serviços de backend próprios.

Quando a API estiver pronta, implemente/ajuste `TelemetryService` para o contrato real e selecione `createHttpTelemetryService` em `src/app/useTelemetry.ts`. O endpoint de exemplo é `GET /sites/{siteId}/telemetry/current`; a estrutura da resposta deve seguir `TelemetrySnapshot`. Para dados ao vivo, o backend pode expor WebSocket ou SSE; mantenha a mesma separação de serviço para a tela não depender do protocolo de transporte.

Antes de publicar, defina autenticação e autorização por unidade, validação de payloads no servidor, TLS, controle de acesso ao broker e política de retenção/auditoria. Nunca coloque segredos de API, MQTT ou banco em variáveis `VITE_*`, pois elas são incorporadas aos arquivos públicos do frontend.
