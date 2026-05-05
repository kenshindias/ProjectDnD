# Etapa 2U — Botão para excluir ficha

Esta etapa adiciona o botão:

```text
🗑️ Excluir
```

no topo do app.

## Arquivos alterados

```text
js/storage.js
js/ui.js
```

## Patch CSS

```text
css/delete-character-button-patch.css
```

## O que muda

- Adiciona o botão **🗑️ Excluir** no topo.
- Exibe confirmação antes de apagar.
- Se for a última ficha, o app cria uma ficha em branco automaticamente.
- Salva a alteração no `localStorage`.
- Atualiza a barra de personagens depois da exclusão.

## Como instalar

1. Substitua:

```text
js/storage.js
js/ui.js
```

2. Cole no final de `css/style.css` o conteúdo de:

```text
css/delete-character-button-patch.css
```

## Como testar

1. Crie ou duplique uma ficha de teste.
2. Clique em **🗑️ Excluir**.
3. Cancele e veja se nada muda.
4. Clique novamente e confirme.
5. Veja se a ficha sumiu da barra.
6. Recarregue a página.
7. Confirme que a ficha continua excluída.

## Observação

Antes de excluir uma ficha importante, use **⬇️ Exportar** para guardar um backup JSON.
