# Etapa 2Y — Correção real do Excluir: limpar tela antes de carregar a próxima ficha

Esta etapa corrige o bug em que, ao excluir a ficha 2, o conteúdo dela aparecia/salvava por cima da ficha 3.

## Arquivo alterado

```text
js/storage.js
```

## Causa encontrada

O botão Excluir removia a ficha certa do array, mas depois chamava:

```js
applyData(characters[currentCharIndex]);
```

O problema é que `applyData()` **não limpa a ficha antes**. Ele só aplica os campos recebidos por cima da tela atual.

Quem faz a limpeza correta é:

```js
loadChar(char)
```

porque ela chama:

```js
clearSheet();
applyData(char.data);
```

Ou seja, ao excluir a ficha 2, alguns campos da ficha 2 podiam continuar na tela, e depois eram salvos por cima da ficha 3.

## Correções feitas

1. O delete agora usa:

```js
loadChar(characters[currentCharIndex]);
```

em vez de `applyData()` direto.

2. `saveCurrentChar()` agora sincroniza o nome da aba com `char-name`.

3. `markDirty()` ignora autosaves enquanto o app está aplicando dados ou excluindo ficha.

4. Foi adicionada uma função segura `createBlankCharacter()` caso a última ficha seja excluída.

## Como instalar

Substitua apenas:

```text
js/storage.js
```

## Teste recomendado

1. Crie 5 fichas chamadas 1, 2, 3, 4 e 5.
2. Em cada uma, altere também HP, classe ou notas para ficar fácil diferenciar.
3. Selecione a ficha 2.
4. Aguarde 2 segundos.
5. Clique em Excluir e confirme.
6. Resultado esperado:
   - a ficha 2 some;
   - a ficha 3 continua com conteúdo próprio da ficha 3;
   - a ficha 4 continua com conteúdo próprio;
   - nada recebe conteúdo da ficha 2.
7. Recarregue a página e confira novamente.
