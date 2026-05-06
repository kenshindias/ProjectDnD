# Etapa 3I — Busca e filtros de magias

Esta etapa adiciona uma barra de filtros na aba **Magias**.

## Arquivo alterado

```text
js/render.js
```

## Filtros adicionados

```text
Buscar por texto
Nível
Preparadas / Não preparadas
Concentração
Ritual
Limpar filtros
```

## O que o campo Buscar considera

A busca procura em:

```text
nome da magia
escola
tempo de conjuração
alcance
duração
dano/efeito
componentes
descrição
```

## Como instalar

Substitua apenas:

```text
js/render.js
```

Não precisa editar HTML nem CSS manualmente.

## Como testar

1. Abra a aba Magias.
2. Adicione várias magias em níveis diferentes.
3. Busque pelo nome de uma magia.
4. Filtre por nível.
5. Marque Concentração.
6. Marque Ritual.
7. Filtre por Preparadas.
8. Clique em Limpar.
9. Confira se editar, rolar, preparar e excluir continuam funcionando.
