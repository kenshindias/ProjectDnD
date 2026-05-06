# Etapa 3C — Filtros de personagens

Esta etapa adiciona uma barra de filtros abaixo do topo do app.

## Arquivos alterados

```text
js/storage.js
js/ui.js
```

## Patch CSS

```text
css/character-filters-patch.css
```

## Filtros adicionados

```text
Buscar por nome
Filtrar por campanha
Filtrar por status
Limpar filtros
```

## Como funciona

A barra de personagens passa a mostrar apenas fichas que combinam com os filtros.

O filtro usa os campos adicionados na etapa anterior:

```text
char-campaign
char-status
```

## Como instalar

1. Substitua:

```text
js/storage.js
js/ui.js
```

2. Cole no final do `css/style.css` o conteúdo de:

```text
css/character-filters-patch.css
```

## Como testar

1. Crie algumas fichas com nomes diferentes.
2. Coloque campanhas diferentes em cada ficha.
3. Coloque status diferentes, como Ativo, Reserva ou NPC.
4. Use o campo Buscar.
5. Use o campo Campanha.
6. Use o campo Status.
7. Clique em Limpar.
8. Verifique se a troca de fichas continua funcionando.

## Observação

Esta etapa não altera o salvamento dos personagens. Ela apenas filtra a visualização das abas.
