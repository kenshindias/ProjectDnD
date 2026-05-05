# Passo 2N — Duplicar personagem e corrigir clique nos atributos

Arquivos alterados:

- `js/storage.js`
- `js/ui.js`

## O que foi adicionado

Foi adicionado o botão **📄 Duplicar** no menu superior. Ele duplica o personagem atual, cria um novo `id`, muda o nome para `Nome (Cópia)`, abre a cópia e salva no `localStorage`.

## O que foi corrigido

Os inputs numéricos dos atributos estavam dentro de um bloco com `onclick="rollAbility(...)"`. Ao clicar nas setinhas de incremento/decremento do input, o clique subia para o bloco pai e disparava rolagem de dado.

Agora o `ui.js` impede a propagação do clique dentro dos inputs `.ability-score`, mantendo:

- clicar nas setinhas do atributo: altera o valor, sem rolar dado;
- clicar fora do input, no bloco do atributo: continua rolando dado.

Também foi corrigida a função `getMod(score)` para tratar campo vazio como 10.

## Teste recomendado

1. Abra o app.
2. Clique em **📄 Duplicar**.
3. Verifique se uma cópia do personagem atual aparece.
4. Edite a cópia e recarregue a página.
5. Use as setinhas dos atributos e confirme que não há rolagem automática.
6. Clique fora do input, dentro do bloco do atributo, e confirme que a rolagem ainda funciona.
