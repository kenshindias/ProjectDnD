# Etapa 2Z — CSS consolidado do topo e do rolador

Esta etapa é uma limpeza visual segura. Ela não altera JavaScript, salvamento, importação, exportação ou dados.

## Arquivo novo

```text
css/consolidated-top-and-dice.css
```

## O que este CSS consolida

Ele reúne, em um bloco único, os patches visuais que foram criados ao longo das etapas anteriores:

```text
botões do topo
botão Salvar Local
botão Excluir
rolador de dados
botão limpar histórico
botão fechar rolador
layout de vantagem/normal/desvantagem
área de quantidade/modificador
grade de dados
histórico de rolagens
responsividade do topo
responsividade do rolador
```

## Como aplicar

Abra o arquivo:

```text
css/style.css
```

Cole o conteúdo de:

```text
css/consolidated-top-and-dice.css
```

no FINAL do arquivo.

## Importante

Como este CSS foi feito para sobrescrever estilos antigos, ele precisa ficar no final do `style.css`.

## Por que não removemos automaticamente os blocos antigos?

Porque isso exigiria editar diretamente o `style.css` completo e poderia apagar alguma regra ainda usada. Esta etapa é segura: ela consolida o comportamento final por sobrescrita.

Depois, em uma etapa futura, podemos fazer uma limpeza mais agressiva removendo duplicações antigas.

## Como testar

1. Abra o app.
2. Confira o topo:
   - Salvar Local
   - Duplicar
   - Excluir
   - Exportar
   - Importar
3. Abra o rolador.
4. Verifique se aparecem:
   - vantagem
   - normal
   - desvantagem
   - quantidade
   - modificador
   - dados
   - histórico
   - botão limpar histórico
   - botão fechar
5. Teste em janela menor.
6. Confira se nenhuma funcionalidade foi alterada.

## Observação

Esta etapa deve ser aplicada sobre a versão estável:

```text
Etapa 2Y — Correção real do botão Excluir
```
