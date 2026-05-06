# Etapa 3H — Edição rápida de magias pelo card

Esta etapa melhora o uso da lista de magias.

## Arquivo alterado

```text
js/render.js
```

## O que muda

Agora você pode editar uma magia clicando no próprio card/linha da magia.

Também foram ajustados:

```text
clique em Preparada não abre editor
clique em Rolar não abre editor
clique em Excluir não abre editor
duplo clique no card também abre editor
valores do editor são escapados com segurança
escola da magia passa a ser restaurada corretamente no select
estado visual de hover no card de magia
```

## Como instalar

Substitua apenas:

```text
js/render.js
```

Não precisa editar HTML nem CSS manualmente.

## Como testar

1. Abra a aba Magias.
2. Adicione uma magia.
3. Clique no nome/card da magia.
4. Veja se o editor abre.
5. Altere nome, escola, alcance ou dano.
6. Salve.
7. Clique em Preparada e veja se só marca/prepara.
8. Clique em Rolar e veja se só rola.
9. Clique em Excluir e veja se só exclui.
