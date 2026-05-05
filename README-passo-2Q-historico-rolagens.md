# Etapa 2Q — Histórico de rolagens salvo por personagem

Esta etapa salva o histórico de rolagens dentro dos dados de cada personagem.

## Arquivos alterados

```text
js/storage.js
js/dice.js
```

## O que muda

- As últimas 20 rolagens ficam salvas.
- O histórico é salvo junto com o personagem no `localStorage`.
- Ao trocar de personagem, cada ficha mostra seu próprio histórico.
- Ao exportar JSON, o histórico também vai junto.
- Ao importar JSON, o histórico volta junto.
- Foi criada a função `clearRollHistory()` para limpar o histórico do personagem atual.

## Como testar

1. Abra um personagem.
2. Faça algumas rolagens.
3. Recarregue a página.
4. Veja se o histórico continua.
5. Troque para outro personagem.
6. Faça rolagens diferentes.
7. Volte para o primeiro personagem e confira se o histórico dele permaneceu separado.

## Botão opcional para limpar histórico

O pacote inclui:

```text
patch/optional-clear-history-button.html
```

Você pode colocar esse botão dentro do cabeçalho do rolador, perto do botão de fechar.

Exemplo:

```html
<div class="dice-panel-header">
  <span>🎲 Rolador de Dados</span>
  <div>
    <button class="dice-close-btn" onclick="clearRollHistory()" title="Limpar histórico">🧹</button>
    <button class="dice-close-btn" onclick="toggleDicePanel()" title="Fechar rolador">✕</button>
  </div>
</div>
```

Isso é opcional. Mesmo sem o botão, o histórico já será salvo.
