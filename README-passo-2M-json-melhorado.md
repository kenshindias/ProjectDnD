# Passo 2M — JSON melhorado

Esta etapa mantém o `localStorage` como armazenamento principal, mas melhora o backup em JSON.

## O que mudou

- O JSON exportado agora tem metadados:
  - `app`
  - `appVersion`
  - `schemaVersion`
  - `exportType`
  - `exportedAt`
  - `characterCount`
  - `characters`
  - `notes`

- O botão **Exportar JSON** agora pergunta:
  - `1` = exportar todos os personagens;
  - `2` = exportar apenas o personagem atual.

- O nome do arquivo ficou mais claro:
  - `arcanum-codex-backup-todos_DATA.json`
  - `arcanum-codex-personagem_NOME_DATA.json`

- A importação continua compatível com:
  - backups antigos que eram só um array;
  - backups anteriores com `{ characters: [...] }`;
  - novo formato com metadados;
  - arquivo com um personagem único.

## Arquivos alterados

- `js/storage.js`
- `js/ui.js`

## Ordem dos scripts

Mantenha no `index.html`:

```html
<script src="js/data/constants.js"></script>
<script src="js/data/classes.js"></script>
<script src="js/data/races.js"></script>

<script src="js/storage.js"></script>
<script src="js/dice.js"></script>
<script src="js/render.js"></script>
<script src="js/ui.js"></script>
<script src="js/app.js"></script>
```

## Como testar

1. Abra o app.
2. Clique em **Exportar JSON**.
3. Digite `1` para exportar todos.
4. Veja se o JSON possui metadados no início.
5. Clique novamente em **Exportar JSON**.
6. Digite `2` para exportar apenas o personagem atual.
7. Importe o JSON do personagem único e escolha o modo seguro.
