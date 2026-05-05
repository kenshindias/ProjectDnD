# Etapa 2K — Exportar e importar JSON

Esta etapa adiciona backup manual das fichas em arquivo `.json`.

## Arquivos alterados

- `js/storage.js`
- `js/ui.js`

## O que foi adicionado

- Botão **Exportar** no menu superior.
- Botão **Importar** no menu superior.
- Exportação de todos os personagens em um arquivo JSON com data no nome.
- Importação de backup JSON, substituindo os personagens atuais após confirmação.
- Atalhos opcionais:
  - `Ctrl + Shift + E` para exportar.
  - `Ctrl + Shift + I` para importar.

## Como testar

1. Abra o app.
2. Crie ou edite um personagem.
3. Clique em **Exportar**.
4. Confira se o arquivo `.json` foi baixado.
5. Clique em **Importar** e selecione o JSON exportado.
6. Confirme a importação.
7. Recarregue a página e veja se os personagens continuam salvos.

## Observação

O botão antigo **Drive** continua existindo, mas o backup JSON é a opção mais segura nesta fase. Você pode salvar o arquivo exportado manualmente no Google Drive.
