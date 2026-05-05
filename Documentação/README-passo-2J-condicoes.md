# Etapa 2J — Salvar condições ativas

Esta etapa corrige o salvamento das condições marcadas na ficha.

## Arquivos alterados

- `js/storage.js`
- `js/render.js`

## O que mudou

Foi criado o estado global:

```js
let activeConditions = [];
```

Agora, ao clicar em uma condição, o nome dela entra ou sai desse array.

O `collectData()` salva:

```js
data.activeConditions
```

O `applyData()` restaura:

```js
activeConditions = data.activeConditions || []
```

E o `buildConditions()` aplica novamente a classe `.active` nas condições salvas.

## Teste

1. Abra o app.
2. Marque algumas condições, como Caído, Envenenado ou Invisível.
3. Altere qualquer campo para forçar salvamento, ou aguarde o autosave.
4. Recarregue a página.
5. As condições devem continuar marcadas.
