# ⚔️ Arcanum Codex — Ficha Interativa para D&D 5e 2024

**Arcanum Codex** é uma ficha interativa de personagem para **Dungeons & Dragons 5ª Edição / 2024**, feita em **HTML, CSS e JavaScript puro**.

O projeto nasceu como uma ficha digital em arquivo único e foi reorganizado em uma estrutura modular, com salvamento local, backup em JSON, múltiplos personagens, rolador de dados, controle de condições, magias, equipamentos, histórico de rolagens e visual inspirado em pergaminhos/fantasia medieval.

---

## ✨ Funcionalidades principais

- Criar múltiplas fichas de personagem;
- Alternar entre personagens salvos;
- Duplicar ficha atual;
- Excluir ficha atual com confirmação;
- Salvamento automático no navegador via `localStorage`;
- Exportação de backup em JSON;
- Importação flexível de JSON;
- Exportação de todos os personagens ou apenas do personagem atual;
- Sistema de classe, subclasse, espécie e linhagem/variante;
- Salvamento correto de subclasse e linhagem/variante;
- Atributos, modificadores, perícias e testes de resistência automáticos;
- Controle de Pontos de Vida;
- Inspiração;
- Testes de morte;
- Condições salvas por personagem;
- Magias e espaços de magia;
- Armas, equipamentos, itens e peso total;
- Habilidades, talentos e anotações;
- Retrato do personagem;
- Moedas e tesouro;
- Rolador de dados flutuante;
- Vantagem/desvantagem em qualquer dado;
- Histórico das últimas rolagens salvo por personagem;
- Botão para limpar histórico de rolagens;
- Interface visual temática estilo grimório/pergaminho.

---

## 🧰 Tecnologias utilizadas

```text
HTML5
CSS3
JavaScript Vanilla
localStorage
JSON
```

O projeto não usa frameworks, bibliotecas externas de JavaScript, bundlers ou backend.

As fontes são carregadas via Google Fonts.

---

## 📁 Estrutura do projeto

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

## ▶️ Como executar localmente

Como o projeto usa HTML, CSS e JavaScript puro, basta abrir o arquivo:

```text
index.html
```

no navegador.

### Opção recomendada com VS Code

1. Abra a pasta do projeto no VS Code;
2. Instale a extensão **Live Server**;
3. Clique com o botão direito em `index.html`;
4. Escolha **Open with Live Server**.

---

## 💾 Salvamento

O projeto salva os dados automaticamente no navegador usando:

```js
localStorage
```

Isso significa que os personagens ficam salvos no navegador/dispositivo em que foram criados.

### Importante

Se você limpar os dados do navegador, trocar de computador ou usar outro navegador, os dados não aparecem automaticamente.

Por isso, use a função:

```text
⬇️ Exportar
```

para gerar um backup `.json`.

---

## 📦 Backup JSON

O projeto permite:

```text
Exportar todos os personagens
Exportar apenas o personagem atual
Importar backup JSON
Adicionar personagens importados como cópias
Mesclar personagens
Escolher apenas um personagem do backup
Substituir todos os personagens atuais
```

O JSON exportado possui metadados, como:

```json
{
  "app": "Arcanum Codex",
  "schemaVersion": 2,
  "exportType": "all",
  "exportedAt": "2026-05-05T00:00:00.000Z",
  "characterCount": 1,
  "characters": []
}
```

---

## 🎲 Rolador de dados

O rolador de dados possui:

```text
d4
d6
d8
d10
d12
d20
d100
rolagem customizada
modo normal
vantagem
desvantagem
histórico salvo por personagem
botão para limpar histórico
```

A vantagem/desvantagem funciona para qualquer dado, não apenas para d20.

Exemplo:

```text
2d6+3 com vantagem

Rolagem A: 2 + 5 + 3 = 10
Rolagem B: 6 + 4 + 3 = 13

Resultado escolhido: 13
```

---

## 🧙 Sobre classes e espécies

O projeto inclui dados básicos para classes, subclasses, espécies e linhagens/variantes compatíveis com a proposta da ficha.

As informações são armazenadas em:

```text
js/data/classes.js
js/data/races.js
js/data/constants.js
```

---

## ⚠️ Observação sobre direitos autorais

Este projeto é uma ferramenta de ficha digital para uso pessoal/educacional.

Caso o projeto seja publicado, distribuído ou monetizado, recomenda-se revisar cuidadosamente qualquer texto de regras, descrições de classe, espécie, magia ou habilidade para evitar uso indevido de material protegido por direitos autorais.

---

## 🧪 Status atual

Versão atual de desenvolvimento:

```text
Etapa 2Y — Correção real do botão Excluir
```

### Funcionalidades estáveis até agora

- Salvamento local;
- Exportar/importar JSON;
- Duplicar personagem;
- Excluir personagem corretamente;
- Salvar subclasse;
- Salvar linhagem/variante;
- Salvar condições;
- Salvar histórico de rolagens;
- Rolador visualmente refinado;
- Vantagem/desvantagem funcionando em qualquer dado.

---

## 🛣️ Próximos passos possíveis

- Consolidar e limpar o CSS acumulado;
- Melhorar responsividade da ficha inteira;
- Criar campos de campanha;
- Agrupar personagens por campanha;
- Criar busca/filtro de personagens;
- Criar modo de impressão;
- Exportar ficha em HTML ou PDF;
- Melhorar sistema de magias;
- Melhorar editor de equipamentos;
- Criar tema claro/escuro;
- Separar a lógica de personagem em módulos menores;
- Remover gradualmente `onclick` inline e migrar para eventos JavaScript.

---

## 🧑‍💻 Desenvolvimento

O projeto foi refatorado progressivamente em etapas, priorizando:

```text
segurança dos dados
baixo risco de quebra
testes após cada alteração
organização gradual
manutenção simples
```

A arquitetura atual ainda usa funções globais porque o HTML chama muitas ações diretamente via `onclick`.

Uma refatoração futura pode migrar esses eventos para JavaScript, reduzindo dependência do escopo global.

---

## 📜 Licença

Defina aqui a licença desejada para o projeto.

Sugestão para projetos pessoais/open-source:

```text
MIT License
```

Caso ainda não tenha decidido, deixe o repositório sem licença até escolher.

---

## 👤 Autor

Projeto desenvolvido por **Kenshin / Ighor Dias**.

---

## 🐉 Nota final

O objetivo do **Arcanum Codex** é ser uma ficha digital bonita, prática e personalizável para campanhas de RPG, mantendo a simplicidade de um projeto web local e evoluindo passo a passo para uma ferramenta mais completa.
