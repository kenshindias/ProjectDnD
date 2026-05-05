# Etapa 2P — Refinamento visual do rolador de dados

Esta etapa não muda a lógica das rolagens. Ela melhora apenas a organização visual do painel do rolador.

## O que muda

- O painel fica mais responsivo.
- A área de quantidade/modificador fica mais clara.
- O botão de fechar deixa de usar CSS inline.
- A área de resultados ganha mais respiro.
- Os botões de vantagem/normal/desvantagem ficam mais confortáveis.
- O layout fica melhor em telas menores.

## Arquivos do pacote

```text
patch/index-dice-roller-snippet.html
css/dice-roller-patch.css
```

## Passo 1 — Substituir o bloco do rolador no index.html

No seu `index.html`, procure o bloco que começa com:

```html
<!-- ===== DICE ROLLER ===== -->
<div id="dice-roller-panel">
```

e termina antes de:

```html
<!-- ===== NEW CHARACTER MODAL ===== -->
```

Substitua esse bloco inteiro pelo conteúdo de:

```text
patch/index-dice-roller-snippet.html
```

## Passo 2 — Colar o patch CSS

Abra:

```text
css/style.css
```

Cole todo o conteúdo de:

```text
css/dice-roller-patch.css
```

no FINAL do arquivo.

Colar no final é importante porque esse patch sobrescreve os estilos antigos do rolador.

## Passo 3 — Testar

Teste:

1. abrir e fechar o rolador;
2. ativar vantagem, normal e desvantagem;
3. alterar quantidade de dados;
4. alterar modificador;
5. rolar d4, d6, d8, d10, d12, d20, d100 e custom;
6. conferir se o painel não estoura a tela;
7. conferir se o histórico de rolagens continua aparecendo.

## Observação

Essa etapa mantém os mesmos IDs usados pelo JavaScript:

```text
dice-roller-panel
dice-fab
dice-panel
adv-btn
normal-btn
dis-btn
dice-count
dice-modifier
dice-results
```

Então o `dice.js` continua funcionando normalmente.
