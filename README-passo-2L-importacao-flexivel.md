# Passo 2L — Importação flexível de JSON

Esta etapa altera a importação de backups JSON para não substituir automaticamente todos os personagens.

## Arquivos alterados

- `js/storage.js`
- `js/ui.js`

## Novos modos de importação

Ao selecionar um arquivo JSON, o app agora pergunta qual modo usar:

1. **Substituir tudo**
   - Remove os personagens atuais e carrega os personagens do arquivo.

2. **Adicionar ao final como cópias novas**
   - Mantém os personagens atuais.
   - Adiciona os personagens do arquivo como cópias novas.
   - Esse é o modo padrão.

3. **Mesclar**
   - Atualiza personagens com mesmo ID ou mesmo nome.
   - Adiciona os demais como novos.

4. **Escolher apenas um personagem**
   - Mostra uma lista numerada.
   - Você escolhe um personagem do backup para adicionar à lista atual.

## Como testar

1. Abra o app.
2. Clique em **Exportar** para gerar um JSON.
3. Crie ou edite personagens no app.
4. Clique em **Importar**.
5. Escolha o JSON exportado.
6. Teste o modo 2 primeiro, que adiciona sem apagar os atuais.

## Observação

O botão Exportar continua exportando todos os personagens. A diferença está na importação: agora você escolhe como o arquivo será aplicado.
