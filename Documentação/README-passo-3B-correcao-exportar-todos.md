# Etapa 3B — Correção da exportação de todos os personagens

Esta etapa corrige a opção:

```text
1 = Todos os personagens
```

na exportação JSON.

## Arquivo alterado

```text
js/storage.js
```

## Problema encontrado

A função principal de exportação chamava:

```js
exportAllCharactersToJSON()
```

mas essa função não estava presente no `storage.js` atual.

Por isso, exportar apenas o personagem atual funcionava, mas exportar todos não.

## Correção

Foi adicionada novamente a função:

```js
function exportAllCharactersToJSON() {
  saveCurrentChar();

  if (!Array.isArray(characters) || characters.length === 0) {
    showDriveStatus('error', 'Nenhum personagem para exportar');
    return;
  }

  const payload = createJSONBackupPayload(characters, 'all');
  downloadJSONPayload(payload, getBackupFileName('all'));

  showDriveStatus('saved', 'Todos os personagens exportados ✓');
}
```

## Como instalar

Substitua apenas:

```text
js/storage.js
```

## Como testar

1. Crie pelo menos 2 personagens.
2. Clique em **Exportar**.
3. Digite `1`.
4. Deve baixar um JSON com todos os personagens.
5. Abra o JSON e confira se `exportType` está como `all` e se `characterCount` bate com a quantidade de fichas.
