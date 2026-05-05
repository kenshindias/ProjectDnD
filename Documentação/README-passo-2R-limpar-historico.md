# Etapa 2R — Botão de limpar histórico + horário das rolagens

Esta etapa completa a etapa 2Q.

## Arquivos alterados

```text
js/dice.js
```

## Arquivos de patch

```text
patch/dice-panel-header-with-clear-button.html
css/dice-history-clear-button-patch.css
```

## O que muda

- O histórico salvo agora mostra o horário da rolagem.
- Foi preparado um cabeçalho do rolador com botão 🧹 para limpar o histórico.
- O botão chama a função `clearRollHistory()`, criada na etapa 2Q.

---

## Passo 1 — Substituir o cabeçalho do rolador

No `index.html`, procure dentro do bloco do rolador:

```html
<div class="dice-panel-header">
  ...
</div>
```

Substitua apenas esse trecho pelo conteúdo de:

```text
patch/dice-panel-header-with-clear-button.html
```

O novo cabeçalho tem dois botões:

```text
🧹 limpar histórico
✕ fechar rolador
```

---

## Passo 2 — Colar o CSS

Abra:

```text
css/style.css
```

Cole no final o conteúdo de:

```text
css/dice-history-clear-button-patch.css
```

---

## Passo 3 — Testar

1. Faça algumas rolagens.
2. Veja se aparece o horário à direita.
3. Recarregue a página.
4. Veja se o histórico continua.
5. Clique no botão 🧹.
6. Confirme a limpeza.
7. Recarregue e veja se o histórico permaneceu limpo.
