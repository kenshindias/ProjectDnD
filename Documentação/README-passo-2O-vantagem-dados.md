# Etapa 2O — Vantagem e desvantagem para qualquer dado

## Arquivo alterado

- `js/dice.js`

## O que foi corrigido

Antes, a função `rollDie(sides)` só aplicava vantagem/desvantagem quando `sides === 20`. Por isso d4, d6, d8, d10, d12, d100 e dados customizados ignoravam o modo.

Agora, quando o modo está em vantagem ou desvantagem, o app rola a expressão inteira duas vezes e escolhe:

- vantagem: maior total;
- desvantagem: menor total.

Exemplo com `2d6+3`:

- primeira rolagem: `2+5+3 = 10`
- segunda rolagem: `6+4+3 = 13`
- vantagem: `13`
- desvantagem: `10`

Também foi ajustado:

- `rollCustom()` agora respeita vantagem/desvantagem;
- `rollSave()` agora respeita vantagem/desvantagem;
- a lógica de d20 foi isolada em `rollD20WithMode()`.

## Como testar

1. Ative vantagem.
2. Role d6, d8, d12 e d100.
3. Veja se aparecem duas rolagens comparadas.
4. Ative desvantagem.
5. Repita os testes.
6. Teste `Custom`.
7. Teste um teste de resistência.
