# Rollback da Etapa 2I

A Etapa 2I separou funções sensíveis em `character.js` e quebrou dependências com `storage.js`, `render.js` e `app.js`.

Este pacote volta para a última versão estável: **Etapa 2H — hotfix-ui**, onde:

- personagens salvos carregam corretamente;
- atributos e modificadores funcionam;
- nível atualiza bônus/XP/slots conforme a lógica existente;
- subclasse e variante/linhagem permanecem salvas;
- abas, retrato e moedas funcionam.

## O que fazer

1. Substitua a pasta `js/` do projeto pelos arquivos deste pacote.
2. Remova a linha abaixo do `index.html`, se ela tiver sido adicionada:

```html
<script src="js/character.js"></script>
```

3. Deixe a ordem dos scripts assim:

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

## Próximo passo recomendado

Não separar novamente tudo de uma vez para `character.js`. O próximo passo deve ser menor, por exemplo apenas separar funções utilitárias puras (`getMod`, `getPB`, `getLevel`, etc.) ou apenas corrigir bugs específicos.
