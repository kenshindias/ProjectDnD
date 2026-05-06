# Etapa 3F — Arquivar / Reativar ficha

Esta etapa adiciona um botão rápido no topo:

```text
📦 Arquivar
```

Quando a ficha já estiver arquivada, o botão muda para:

```text
♻️ Reativar
```

## Arquivos alterados

```text
js/storage.js
js/ui.js
```

## O que muda

- Adiciona botão **Arquivar/Reativar** no topo.
- Se a ficha estiver com status `Ativo`, `Reserva`, `Morto` ou `NPC`, o botão muda para `Arquivado`.
- Se a ficha estiver com status `Arquivado`, o botão muda para `Ativo`.
- Atualiza o campo `Status` da ficha.
- Salva no `localStorage`.
- Atualiza as abas e filtros.

## Como instalar

Substitua:

```text
js/storage.js
js/ui.js
```

Não precisa editar HTML nem CSS manualmente.

## Como testar

1. Abra uma ficha com status Ativo.
2. Clique em **📦 Arquivar**.
3. Veja se o status vira Arquivado.
4. Veja se o botão muda para **♻️ Reativar**.
5. Clique em Reativar.
6. Veja se o status volta para Ativo.
7. Recarregue a página e confira se o status permanece salvo.
8. Teste com o filtro de Status.
