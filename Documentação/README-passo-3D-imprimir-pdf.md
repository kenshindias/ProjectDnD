# Etapa 3D — Botão Imprimir / Salvar em PDF

Esta etapa adiciona um botão no topo:

```text
🖨️ Imprimir
```

## Arquivo alterado

```text
js/ui.js
```

## O que muda

- Adiciona o botão **Imprimir** no topo.
- Antes de imprimir, salva localmente a ficha atual.
- Injeta automaticamente um CSS de impressão via JavaScript.
- Oculta menus, filtros, botões, modal, rolador e navegação durante a impressão.
- Permite usar a opção do navegador **Salvar como PDF**.

## Como instalar

Substitua apenas:

```text
js/ui.js
```

Não precisa editar `index.html` nem `style.css`.

## Como testar

1. Abra uma ficha.
2. Clique em **🖨️ Imprimir**.
3. Na janela do navegador, escolha uma impressora ou **Salvar como PDF**.
4. Confira se menus, filtros e rolador não aparecem na impressão.
5. Confira se a ficha atual aparece.

## Observação

Esta é uma versão inicial do modo de impressão. Ela imprime a aba atualmente aberta. Se você estiver na aba Principal, imprime a aba Principal; se estiver em Combate, imprime Combate.
