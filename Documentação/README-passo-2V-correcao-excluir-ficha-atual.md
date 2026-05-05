# Etapa 2V — Correção do botão Excluir

Esta etapa corrige o bug em que o botão **🗑️ Excluir** apagava a primeira ficha em vez da ficha atual.

## Arquivo alterado

```text
js/storage.js
```

## Causa provável

A ficha exibida na tela podia estar correta, mas `currentCharIndex` não estava sincronizado com a aba ativa no momento da exclusão.

## Correção

Foi criada a função:

```js
getCurrentCharacterIndexSafe()
```

Ela identifica a ficha atual nesta ordem:

```text
1. aba visualmente ativa em #char-tabs
2. ID da ficha atualmente carregada
3. currentCharIndex
4. fallback para índice 0
```

Assim, o botão Excluir passa a apagar a ficha que está realmente selecionada no topo.

## Como instalar

Substitua apenas:

```text
js/storage.js
```

## Como testar

1. Crie 3 fichas com nomes diferentes.
2. Selecione a segunda.
3. Clique em **🗑️ Excluir**.
4. Confira se a mensagem de confirmação mostra o nome da segunda ficha.
5. Confirme.
6. Veja se a segunda sumiu, não a primeira.
7. Recarregue a página e confira.
