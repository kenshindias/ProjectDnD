# Etapa 3E — Ordenação de personagens

Esta etapa adiciona ordenação à barra de filtros de personagens.

## Arquivos alterados

```text
js/storage.js
js/ui.js
```

## O que muda

A barra de filtros agora tem o campo:

```text
Ordenar
```

Com as opções:

```text
Manual
Nome A-Z
Nome Z-A
Campanha
Status
Nível maior
Nível menor
Classe
```

## Importante

A ordenação muda apenas a visualização das abas. Ela não altera a ordem real salva no JSON/localStorage.

## Como instalar

Substitua:

```text
js/storage.js
js/ui.js
```

Não precisa editar HTML nem CSS manualmente.

## Como testar

1. Crie várias fichas.
2. Preencha nomes, campanhas, status, classe e nível.
3. Use o campo Ordenar.
4. Teste Nome A-Z, Nome Z-A, Nível maior e Classe.
5. Confirme que clicar nas fichas ainda abre o personagem correto.
6. Recarregue a página e veja se tudo continua funcionando.
