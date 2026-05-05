# Etapa 2X — Correção do Excluir com bloqueio de autosave

Esta etapa corrige o caso em que a ficha correta era removida, mas o conteúdo dela ainda era salvo por cima da próxima ficha.

## Arquivo alterado

```text
js/storage.js
```

## Causa adicional

Além do `saveToLocalStorage()` chamar `saveCurrentChar()`, também podia existir um autosave pendente criado por:

```js
markDirty()
```

Esse autosave roda com atraso por `setTimeout`. Então, mesmo após a exclusão correta, um salvamento atrasado ainda podia coletar os dados antigos da tela e sobrescrever a ficha seguinte.

## Correção

Foram feitas quatro mudanças:

1. `markDirty()` agora ignora chamadas enquanto o app está aplicando dados ou excluindo ficha.
2. Antes de excluir, qualquer `saveTimeout` pendente é cancelado.
3. Durante a exclusão, `isDeletingCharacter` e `isApplyingData` ficam ativados.
4. O array `characters` é filtrado e salvo diretamente com `persistCharactersOnly()`, sem coletar nada da tela.

## Como instalar

Substitua apenas:

```text
js/storage.js
```

## Como testar

1. Crie 5 fichas: 1, 2, 3, 4 e 5.
2. Em cada ficha, coloque conteúdo diferente no nome e em outro campo, por exemplo HP ou notas.
3. Clique na ficha 2.
4. Aguarde 2 segundos.
5. Exclua a ficha 2.
6. O resultado deve ser:
   - ficha 2 some;
   - ficha 3 continua com conteúdo da ficha 3;
   - nenhuma ficha recebe conteúdo da 2.
7. Recarregue e confirme.
