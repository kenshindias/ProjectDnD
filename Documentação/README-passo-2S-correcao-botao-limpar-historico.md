# Etapa 2S — Correção do botão de limpar histórico

Na etapa anterior, o botão 🧹 podia não aparecer se apenas o cabeçalho não fosse substituído corretamente.

Esta versão é mais segura: substitua o bloco completo do rolador.

## Arquivos alterados

```text
js/dice.js
```

## Patches

```text
patch/full-dice-roller-with-clear-button.html
css/dice-clear-button-fix.css
```

## Passo 1 — Substituir o bloco completo do rolador

No `index.html`, procure:

```html
<!-- ===== DICE ROLLER ===== -->
```

Selecione desde esse comentário até antes de:

```html
<!-- ===== NEW CHARACTER MODAL ===== -->
```

Substitua tudo pelo conteúdo de:

```text
patch/full-dice-roller-with-clear-button.html
```

## Passo 2 — Colar CSS

Cole no final do `css/style.css` o conteúdo de:

```text
css/dice-clear-button-fix.css
```

## Passo 3 — Testar

1. Abra o rolador.
2. Veja se aparecem dois botões no canto superior direito:
   - 🧹 limpar histórico
   - ✕ fechar
3. Faça uma rolagem.
4. Clique no 🧹.
5. Confirme a limpeza.

## Se ainda não aparecer

Confirme se o HTML novo tem este trecho:

```html
<div class="dice-header-actions">
  <button class="dice-close-btn" onclick="clearRollHistory()" title="Limpar histórico">🧹</button>
  <button class="dice-close-btn" onclick="toggleDicePanel()" title="Fechar rolador">✕</button>
</div>
```
