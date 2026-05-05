# Arcanum Codex — Histórico técnico do desenvolvimento

## 1. Contexto inicial

O projeto começou como um único arquivo HTML grande chamado:

```text
dnd5e-2024-sheet.html
```

Esse arquivo continha tudo junto:

```text
HTML
CSS
JavaScript
dados de classes
dados de espécies
salvamento local
rolador de dados
renderização da ficha
interface geral
```

A proposta do projeto é criar uma ficha interativa de personagem para **D&D 5ª Edição 2024**, com visual temático medieval/fantasia, suporte a múltiplos personagens, rolagem de dados, magias, equipamentos, habilidades, histórico e salvamento.

---

## 2. Diagnóstico inicial

A primeira análise indicou que o projeto já estava visualmente avançado e funcional, mas com alguns problemas estruturais:

- todo o código estava concentrado em um único arquivo;
- o CSS estava dentro do HTML;
- o JavaScript misturava dados, estado, renderização, rolagens e salvamento;
- a tentativa de salvar no Google Drive não era confiável;
- subclasse e variante/linhagem da espécie não permaneciam salvas;
- condições não eram salvas;
- o rolador aplicava vantagem/desvantagem apenas em d20;
- os inputs numéricos dos atributos disparavam rolagens acidentalmente;
- não havia backup JSON flexível;
- não havia duplicação de personagem;
- o histórico de rolagens desaparecia ao recarregar.

---

## 3. Decisão de arquitetura

Foi decidido manter o projeto como uma aplicação web simples, baseada em:

```text
HTML
CSS
JavaScript tradicional
localStorage
importação/exportação JSON
```

Não foi adotado framework, bundler ou módulo ES6 neste momento, para manter o projeto simples e fácil de abrir diretamente no navegador.

A ordem geral dos scripts ficou baseada em arquivos globais:

```html
<script src="js/data/constants.js"></script>
<script src="js/data/classes.js"></script>
<script src="js/data/races.js"></script>

<script src="js/storage.js"></script>
<script src="js/dice.js"></script>
<script src="js/render.js"></script>
<script src="js/ui.js"></script>
<script src="js/app.js"></script>
```

---

# 4. Etapas realizadas

## Etapa 1 — Separação básica do projeto

O arquivo HTML gigante foi dividido em:

```text
index.html
css/style.css
js/app.js
```

### Objetivo

Separar a estrutura visual, estilo e lógica:

- `index.html`: estrutura da página;
- `css/style.css`: estilos visuais;
- `js/app.js`: JavaScript inicial.

### Resultado

O projeto passou a ter uma base mínima organizada, ainda com o JavaScript concentrado em `app.js`.

---

## Etapa 2A — Separação dos dados fixos

Foram criados os arquivos:

```text
js/data/constants.js
js/data/classes.js
js/data/races.js
```

### Movido para `constants.js`

```text
SKILLS_DATA
CONDITIONS
XP_TABLE
```

### Movido para `classes.js`

```text
SUBCLASSES
SPELL_CASTERS
CLASS_RESOURCES
CLASS_HIT_DICE
PROF_SAVES
PROF_SKILLS
CLASS_NAMES_PT
```

### Movido para `races.js`

```text
SUBRACES
RACE_TRAITS
RACE_NAMES_PT
```

### Resultado

O `app.js` ficou menor e os dados passaram a ficar separados da lógica.

---

## Etapa 2B — Separação de estado e salvamento

Foi criado/organizado o arquivo:

```text
js/storage.js
```

### Movido para `storage.js`

Estados globais:

```text
characters
currentCharIndex
rollMode
diceOpen
saveTimeout
skillProfs
saveProfs
spells
weapons
items
classFeatures
raceFeatures
otherFeatures
feats
spellSlots
deathSuccesses
deathFailures
```

Funções de personagem e salvamento:

```text
newCharacter()
createNewCharacter()
renderCharTabs()
switchCharacter()
markDirty()
saveCurrentChar()
collectData()
applyData()
loadFromLocalStorage()
saveAllToDrive()
loadFromDrive()
```

### Resultado

A persistência com `localStorage` ficou isolada.

---

## Etapa 2C — Separação do rolador de dados

Foi criado/organizado o arquivo:

```text
js/dice.js
```

### Movido para `dice.js`

```text
toggleDicePanel()
openDicePanel()
setRollMode()
rollDie()
rollCustom()
rollAbility()
rollSave()
addRollResult()
```

### Resultado

A lógica de dados ficou separada da ficha.

---

## Etapa 2D — Separação da renderização

Foi criado/organizado o arquivo:

```text
js/render.js
```

### Movido para `render.js`

Renderização e ações relacionadas a:

```text
perícias
testes de resistência
testes de morte
condições
espaços de magia
lista de magias
armas
itens
habilidades
talentos
peso total
capacidade de carga
```

Funções principais movidas:

```text
buildSkillsList()
cycleSkillProf()
buildSavingThrows()
toggleSaveProf()
buildDeathSaves()
resetDeathSaves()
buildConditions()
buildSpellSlots()
buildSpellsByLevel()
addSpell()
showSpellEditor()
saveSpellEdit()
toggleSpellPrep()
deleteSpell()
rollSpell()
addWeapon()
renderWeapons()
rollWeapon()
deleteWeapon()
addItem()
renderItems()
deleteItem()
updateTotalWeight()
updateCarryCapacity()
addFeature()
addFeat()
renderFeatures()
renderFeatureList()
renderFeatsList()
```

---

## Etapa 2E/2F — Correção definitiva de subclasse e linhagem/variante

Foi corrigido o bug em que:

```text
subclasse
variante/linhagem da espécie
```

não permaneciam salvas.

### Causa

O app tentava aplicar o valor salvo antes de recriar as opções dos selects.

Exemplo do problema:

```text
1. aplicava char-subclass;
2. onClassChange() recriava o select;
3. o valor salvo era apagado.
```

### Correção

Foi criada uma lógica para:

```text
1. guardar temporariamente o valor salvo;
2. aplicar classe/espécie;
3. recriar as opções;
4. reaplicar subclasse/subraça depois.
```

Também foi criada uma trava:

```text
isApplyingData
```

para impedir salvamento automático durante o carregamento incompleto da ficha.

### Resultado

Subclasse e variante/linhagem passaram a ser salvas corretamente.

---

## Etapa 2G/2H — Separação da interface geral e hotfix

Foi criado/organizado o arquivo:

```text
js/ui.js
```

### Movido para `ui.js`

```text
showSection()
uploadPortrait()
handlePortraitUpload()
updateWealthTotal()
initUI()
atalhos de teclado
```

### Problema encontrado

Depois da separação inicial, algumas funções chamadas diretamente no HTML por `onclick` deixaram de funcionar:

```text
trocar abas
adicionar retrato
alterar moedas
```

### Correção

As funções foram explicitamente expostas no escopo global:

```js
window.showSection = showSection;
window.uploadPortrait = uploadPortrait;
window.handlePortraitUpload = handlePortraitUpload;
window.updateWealthTotal = updateWealthTotal;
window.initUI = initUI;
```

### Resultado

As abas, retrato e moedas voltaram a funcionar.

---

## Etapa 2I — Tentativa de separar lógica da ficha em `character.js`

Foi tentada uma separação maior criando:

```text
js/character.js
```

A ideia era mover:

```text
atributos
HP
nível
classe
espécie
proficiência
XP
estatísticas derivadas
```

### Problema

Essa etapa quebrou:

```text
personagens salvos
atributos
modificadores
nível
subclasse
variante
salvamento
```

### Decisão

Foi feito rollback para a versão estável anterior, a etapa 2H.

### Resultado

O projeto voltou a funcionar.

### Lição técnica

Separar grandes blocos interdependentes de uma vez é arriscado. A separação futura de `character.js` deve ser feita em partes menores.

---

## Etapa 2J — Salvamento de condições

Foi corrigido o problema em que as condições visuais não eram salvas.

### Adicionado

```js
activeConditions
```

### Funcionamento

As condições ativas passaram a ser:

```text
armazenadas em array
salvas em collectData()
restauradas em applyData()
reaplicadas em buildConditions()
```

### Resultado

Condições como:

```text
Caído
Envenenado
Invisível
Paralisado
```

passaram a permanecer salvas ao recarregar a página.

---

## Etapa 2K — Exportar e importar JSON

Foi criada a primeira versão de backup JSON.

### Adicionado

```text
botão Exportar
botão Importar
exportação de todos os personagens
importação de backup
```

### Resultado

O usuário passou a poder salvar backups manuais fora do navegador.

---

## Etapa 2L — Importação flexível

A importação inicial substituía todos os personagens salvos. Isso foi melhorado.

### Modos adicionados

```text
1 = Substituir todos os personagens atuais
2 = Adicionar ao final como cópias novas
3 = Mesclar: atualizar personagens com mesmo ID/nome e adicionar novos
4 = Escolher apenas um personagem para adicionar
```

### Resultado

A importação deixou de ser perigosa e passou a permitir recuperação parcial de backups.

---

## Etapa 2M — JSON melhorado

O formato do JSON exportado foi melhorado.

### Novo formato

```json
{
  "app": "Arcanum Codex",
  "appVersion": "2M",
  "schemaVersion": 2,
  "exportType": "all",
  "exportedAt": "2026-05-04T...",
  "characterCount": 3,
  "characters": [],
  "notes": "Backup gerado pelo Arcanum Codex. Pode ser importado pelo próprio app."
}
```

### Adicionado

```text
exportar todos os personagens
exportar apenas o personagem atual
nome de arquivo mais claro
compatibilidade com backups antigos
```

### Resultado

O backup ficou mais organizado, legível e confiável.

---

## Etapa 2N — Duplicar personagem e corrigir atributos

Foi adicionado o botão:

```text
📄 Duplicar
```

### Funcionamento

O personagem atual é copiado, recebe novo ID e novo nome:

```text
Nome do Personagem (Cópia)
```

A cópia é aberta automaticamente para edição.

### Correção dos atributos

Foi corrigido o problema em que clicar nas setinhas dos campos numéricos dos atributos disparava rolagens.

### Causa

O input de atributo ficava dentro de um bloco com:

```html
onclick="rollAbility(...)"
```

O clique no input “subia” para o elemento pai.

### Correção

Foi bloqueada a propagação do clique dentro dos inputs `.ability-score`.

Também foi corrigida a função:

```js
function getMod(score) {
  return Math.floor(((parseInt(score) || 10) - 10) / 2);
}
```

---

## Etapa 2O — Vantagem/desvantagem para qualquer dado

Foi corrigido o rolador de dados.

### Problema anterior

Vantagem e desvantagem funcionavam apenas para:

```text
d20
```

### Correção

Agora vantagem/desvantagem funcionam para:

```text
d4
d6
d8
d10
d12
d20
d100
custom
testes de resistência
```

### Regra usada

Para rolagens com vários dados, o app compara o total da expressão inteira.

Exemplo:

```text
2d6+3 com vantagem

Rolagem A: 2+5+3 = 10
Rolagem B: 6+4+3 = 13
Resultado escolhido: 13
```

---

## Etapa 2P — Refinamento visual do rolador

Foi melhorado o visual do painel do rolador.

### Melhorias

```text
painel mais responsivo
área de quantidade/modificador mais clara
botão de fechar sem CSS inline
botões de vantagem/normal/desvantagem com mais respiro
área de resultado mais organizada
ajuste para telas menores
```

### Alterações

Foi substituído o bloco HTML do rolador e adicionado um patch CSS ao final do `style.css`.

---

## Etapa 2Q — Histórico de rolagens salvo por personagem

Foi adicionado histórico persistente de rolagens.

### Adicionado

```js
rollHistory
```

### Funcionamento

Cada personagem salva suas últimas 20 rolagens.

O histórico passou a ser:

```text
salvo no localStorage
restaurado ao recarregar
separado por personagem
incluído no backup JSON
restaurado ao importar JSON
```

### Função adicionada

```js
clearRollHistory()
```

---

## Etapa 2R/2S — Botão de limpar histórico

Foi adicionado o botão:

```text
🧹
```

no cabeçalho do rolador.

### Função

Limpar o histórico de rolagens do personagem atual.

### Problema na primeira tentativa

O botão não apareceu porque a alteração foi enviada como patch apenas do cabeçalho, e o trecho pode não ter sido substituído corretamente.

### Correção

Foi criada uma versão mais segura substituindo o bloco completo do rolador.

### Resultado

O cabeçalho do rolador passou a ter:

```text
🧹 limpar histórico
✕ fechar rolador
```

---

# 5. Estado atual do projeto

## Estrutura atual

```text
arcanum-codex/
│
├── index.html
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    ├── storage.js
    ├── dice.js
    ├── render.js
    ├── ui.js
    └── data/
        ├── constants.js
        ├── classes.js
        └── races.js
```

---

## Funcionalidades funcionando

```text
múltiplos personagens
criar personagem
trocar personagem
duplicar personagem
salvar automaticamente no localStorage
exportar JSON de todos os personagens
exportar JSON do personagem atual
importar JSON com modos diferentes
classe salva
subclasse salva
espécie salva
variante/linhagem salva
atributos salvos
HP salvo
condições salvas
magias salvas
armas salvas
itens salvos
habilidades salvas
talentos salvos
retrato salvo
moedas salvas
rolador de dados funcional
vantagem/desvantagem em qualquer dado
histórico de rolagens salvo por personagem
botão para limpar histórico
```

---

## Decisões importantes

### Google Drive

Foi decidido não implementar salvamento direto no Google Drive por enquanto.

Motivos:

```text
maior complexidade
necessidade de OAuth
configuração no Google Cloud
riscos de segurança
necessidade de domínio/HTTPS para uma experiência melhor
```

A solução escolhida foi:

```text
localStorage + exportar/importar JSON
```

Essa abordagem é mais simples, segura e suficiente para a fase atual.

---

# 6. Pontos de atenção

## 1. O arquivo `app.js` ainda concentra lógica sensível

A tentativa de criar `character.js` quebrou o projeto. Então, por enquanto, parte da lógica de personagem continua em `app.js`.

Separar isso no futuro é possível, mas deve ser feito aos poucos.

---

## 2. Ainda há CSS acumulado

Como foram adicionados patches no final do `style.css`, o arquivo pode ter estilos antigos e novos convivendo.

No futuro, vale consolidar:

```text
estilos originais do rolador
patches posteriores
responsividade
```

em um único bloco limpo.

---

## 3. Ainda há atributos e funções globais

O projeto usa chamadas diretas no HTML, como:

```html
onclick="..."
```

Por isso muitas funções precisam estar disponíveis no escopo global.

Isso é aceitável para o estágio atual, mas no futuro pode ser melhor migrar para eventos registrados via JavaScript.

---

## 4. Conteúdo de D&D

Se o projeto for usado apenas pessoalmente, não há grande preocupação.

Se for publicado, distribuído ou monetizado, será importante revisar o conteúdo textual de classes, espécies, magias e regras para evitar uso indevido de material protegido.

---

# 7. Próximos passos recomendados

## Próximo passo seguro

Consolidar visualmente os botões do topo:

```text
Salvar Local
Exportar
Importar
Duplicar
```

Hoje esses botões foram sendo adicionados por etapas e podem ficar visualmente inconsistentes.

---

## Outras melhorias possíveis

```text
1. Exportar personagem em HTML ou PDF
2. Criar campo de campanha
3. Agrupar personagens por campanha
4. Criar busca/filtro de personagens
5. Salvar notas por sessão
6. Melhorar responsividade da ficha inteira
7. Consolidar CSS do rolador
8. Adicionar tema claro/escuro
9. Adicionar confirmação antes de excluir personagem
10. Separar `character.js` aos poucos
```

---

# 8. Versão atual recomendada como base

A base funcional mais recente é:

```text
Etapa 2S — correção do botão de limpar histórico
```

Essa é a versão que deve ser considerada o ponto atual de continuidade.

---

# 9. Resumo curto

Até agora, o Arcanum Codex foi transformado de um HTML único e difícil de manter em um projeto organizado com:

```text
arquivos separados
salvamento estável
backup JSON
importação segura
duplicação de personagens
rolador funcional e refinado
histórico de rolagens persistente
correções importantes de salvamento
```

A prioridade agora deve ser continuar evoluindo em etapas pequenas, sempre testando após cada mudança.
