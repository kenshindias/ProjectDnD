# Etapa 3G — Opções de impressão

Esta etapa melhora o botão **🖨️ Imprimir**.

## Arquivo alterado

```text
js/ui.js
```

## Novas opções

Ao clicar em **Imprimir**, o app pergunta:

```text
1 = Aba atual
2 = Ficha resumida
3 = Ficha completa
```

## O que cada opção faz

### 1. Aba atual

Imprime apenas a aba aberta no momento.

### 2. Ficha resumida

Gera uma página resumida com:

```text
Nome
Classe/Subclasse
Espécie/Linhagem
Nível
Campanha
Status
Mestre
Grupo
PV
CA
Iniciativa
Deslocamento
Proficiência
Percepção passiva
Atributos
Condições ativas
Armas principais
Notas rápidas
```

### 3. Ficha completa

Imprime todas as abas da ficha, uma após a outra.

## Como instalar

Substitua apenas:

```text
js/ui.js
```

Não precisa editar HTML nem CSS manualmente.

## Como testar

1. Abra uma ficha.
2. Clique em **🖨️ Imprimir**.
3. Teste a opção `1`.
4. Teste a opção `2`.
5. Teste a opção `3`.
6. Em cada uma, escolha **Salvar como PDF** no navegador.
