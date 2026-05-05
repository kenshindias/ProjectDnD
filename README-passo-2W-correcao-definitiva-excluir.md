# Etapa 2W — Correção definitiva do Excluir

Esta etapa corrige o bug em que o botão **Excluir** removia o nome/aba da ficha correta, mas acabava copiando o conteúdo da ficha excluída para a próxima ficha.

## Arquivo alterado

```text
js/storage.js
```

## Causa

Depois do `characters.splice(deleteIndex, 1)`, a função `deleteCurrentCharacter()` chamava:

```js
saveToLocalStorage()
```

Só que `saveToLocalStorage()` chama internamente:

```js
saveCurrentChar()
```

Isso é perigoso nesse ponto, porque a tela ainda podia conter dados da ficha que estava sendo excluída. Assim, esses dados eram coletados e salvos por cima da ficha que assumiu aquele índice depois do `splice()`.

Exemplo:

```text
Fichas: 1, 2, 3, 4, 5
Excluir a 2

Depois do splice:
1, 3, 4, 5

Mas saveCurrentChar() pegava os dados ainda visíveis da 2
e salvava por cima da posição onde agora estava a 3.
```

## Correção

Foi criada a função:

```js
persistCharactersOnly()
```

Ela salva o array `characters` diretamente no `localStorage`, sem chamar `saveCurrentChar()`.

Agora, depois de excluir, o app faz:

```js
applyData(characters[currentCharIndex]);
renderCharTabs();
persistCharactersOnly();
```

## Como instalar

Substitua apenas:

```text
js/storage.js
```

## Como testar

1. Crie 5 fichas chamadas 1, 2, 3, 4 e 5.
2. Coloque conteúdos diferentes em cada uma.
3. Selecione a ficha 2.
4. Clique em Excluir.
5. Confirme.
6. O resultado correto deve ser:
   - ficha 2 some;
   - ficha 3 continua com conteúdo da ficha 3;
   - ficha 4 continua com conteúdo da ficha 4;
   - ficha 5 continua com conteúdo da ficha 5.
7. Recarregue a página e confira novamente.
