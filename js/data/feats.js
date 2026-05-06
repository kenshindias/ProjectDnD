// ====================================================================
// FEAT DATABASE — ARCANUM CODEX
// ====================================================================
// Banco inicial com talentos básicos/compatíveis com 5E.
//
// Importante:
// - As descrições abaixo são resumos/paráfrases curtas em português.
// - Não são textos oficiais completos.
// - Ajuste nomes/categorias conforme a versão da sua mesa.
//
// Para uso público, revise licenças e atribuições aplicáveis ao conteúdo usado.

const FEAT_DATABASE = [
  {
    "id": "alert",
    "name": "Alert",
    "namePt": "Alerta",
    "category": "Origin",
    "prerequisite": "",
    "repeatable": false,
    "summary": "Melhora sua prontidão, ajudando em iniciativa e percepção de ameaças repentinas.",
    "tags": [
      "iniciativa",
      "defesa",
      "atenção"
    ]
  },
  {
    "id": "magic-initiate",
    "name": "Magic Initiate",
    "namePt": "Iniciado em Magia",
    "category": "Origin",
    "prerequisite": "",
    "repeatable": true,
    "summary": "Concede acesso básico a truques e uma magia simples de uma lista mágica escolhida.",
    "tags": [
      "magia",
      "truques",
      "versatilidade"
    ]
  },
  {
    "id": "skilled",
    "name": "Skilled",
    "namePt": "Habilidoso",
    "category": "Origin",
    "prerequisite": "",
    "repeatable": true,
    "summary": "Aumenta sua versatilidade ao conceder proficiências adicionais.",
    "tags": [
      "perícias",
      "proficiência",
      "utilidade"
    ]
  },
  {
    "id": "tough",
    "name": "Tough",
    "namePt": "Robusto",
    "category": "Origin",
    "prerequisite": "",
    "repeatable": false,
    "summary": "Aumenta sua durabilidade geral, melhorando seus pontos de vida ao longo dos níveis.",
    "tags": [
      "vida",
      "resistência",
      "sobrevivência"
    ]
  },
  {
    "id": "lucky",
    "name": "Lucky",
    "namePt": "Sortudo",
    "category": "Origin",
    "prerequisite": "",
    "repeatable": false,
    "summary": "Permite alterar momentos decisivos com uma dose extra de sorte durante testes e ataques.",
    "tags": [
      "sorte",
      "rerrolagem",
      "controle"
    ]
  },
  {
    "id": "athlete",
    "name": "Athlete",
    "namePt": "Atleta",
    "category": "General",
    "prerequisite": "Nível 4+",
    "repeatable": false,
    "summary": "Melhora mobilidade física, escalada, saltos e recuperação de posição.",
    "tags": [
      "força",
      "destreza",
      "movimento"
    ]
  },
  {
    "id": "charger",
    "name": "Charger",
    "namePt": "Investida",
    "category": "General",
    "prerequisite": "Nível 4+",
    "repeatable": false,
    "summary": "Favorece ataques feitos após deslocamento agressivo em direção ao inimigo.",
    "tags": [
      "combate",
      "movimento",
      "ataque"
    ]
  },
  {
    "id": "defensive-duelist",
    "name": "Defensive Duelist",
    "namePt": "Duelista Defensivo",
    "category": "General",
    "prerequisite": "Nível 4+, Destreza 13+",
    "repeatable": false,
    "summary": "Ajuda a se defender melhor usando arma leve ou precisa em combate corpo a corpo.",
    "tags": [
      "defesa",
      "destreza",
      "reação"
    ]
  },
  {
    "id": "dual-wielder",
    "name": "Dual Wielder",
    "namePt": "Combatente com Duas Armas",
    "category": "General",
    "prerequisite": "Nível 4+",
    "repeatable": false,
    "summary": "Melhora o uso de duas armas, favorecendo personagens focados em combate duplo.",
    "tags": [
      "combate",
      "duas armas",
      "ataque"
    ]
  },
  {
    "id": "great-weapon-master",
    "name": "Great Weapon Master",
    "namePt": "Mestre de Armas Grandes",
    "category": "General",
    "prerequisite": "Nível 4+, Força 13+",
    "repeatable": false,
    "summary": "Favorece personagens que usam armas pesadas para causar grande dano.",
    "tags": [
      "força",
      "dano",
      "armas pesadas"
    ]
  },
  {
    "id": "healer",
    "name": "Healer",
    "namePt": "Curandeiro",
    "category": "General",
    "prerequisite": "Nível 4+",
    "repeatable": false,
    "summary": "Melhora o uso de cuidados médicos e recursos de cura mundana.",
    "tags": [
      "cura",
      "suporte",
      "medicina"
    ]
  },
  {
    "id": "inspiring-leader",
    "name": "Inspiring Leader",
    "namePt": "Líder Inspirador",
    "category": "General",
    "prerequisite": "Nível 4+, Carisma 13+",
    "repeatable": false,
    "summary": "Permite inspirar aliados, fortalecendo o grupo antes de desafios.",
    "tags": [
      "carisma",
      "suporte",
      "grupo"
    ]
  },
  {
    "id": "mobile",
    "name": "Mobile",
    "namePt": "Móvel",
    "category": "General",
    "prerequisite": "Nível 4+",
    "repeatable": false,
    "summary": "Aumenta mobilidade e favorece personagens que entram e saem do combate com rapidez.",
    "tags": [
      "movimento",
      "velocidade",
      "combate"
    ]
  },
  {
    "id": "observant",
    "name": "Observant",
    "namePt": "Observador",
    "category": "General",
    "prerequisite": "Nível 4+, Inteligência ou Sabedoria 13+",
    "repeatable": false,
    "summary": "Melhora atenção a detalhes, leitura do ambiente e percepção passiva.",
    "tags": [
      "percepção",
      "investigação",
      "sabedoria"
    ]
  },
  {
    "id": "resilient",
    "name": "Resilient",
    "namePt": "Resiliente",
    "category": "General",
    "prerequisite": "Nível 4+",
    "repeatable": true,
    "summary": "Fortalece um atributo escolhido e melhora resistência em testes relacionados.",
    "tags": [
      "atributo",
      "resistência",
      "salvaguarda"
    ]
  },
  {
    "id": "sentinel",
    "name": "Sentinel",
    "namePt": "Sentinela",
    "category": "General",
    "prerequisite": "Nível 4+",
    "repeatable": false,
    "summary": "Ajuda a controlar inimigos próximos e proteger aliados no combate corpo a corpo.",
    "tags": [
      "controle",
      "reação",
      "tanque"
    ]
  },
  {
    "id": "sharpshooter",
    "name": "Sharpshooter",
    "namePt": "Atirador Aguçado",
    "category": "General",
    "prerequisite": "Nível 4+, Destreza 13+",
    "repeatable": false,
    "summary": "Favorece ataques à distância precisos e personagens especializados em arcos ou projéteis.",
    "tags": [
      "distância",
      "destreza",
      "dano"
    ]
  },
  {
    "id": "spell-sniper",
    "name": "Spell Sniper",
    "namePt": "Franco-atirador Mágico",
    "category": "General",
    "prerequisite": "Nível 4+, capacidade de conjurar magias",
    "repeatable": false,
    "summary": "Melhora ataques mágicos à distância e o alcance de certas magias ofensivas.",
    "tags": [
      "magia",
      "alcance",
      "ataque"
    ]
  },
  {
    "id": "war-caster",
    "name": "War Caster",
    "namePt": "Conjurador de Guerra",
    "category": "General",
    "prerequisite": "Nível 4+, capacidade de conjurar magias",
    "repeatable": false,
    "summary": "Ajuda conjuradores a manter concentração e conjurar em situações de combate.",
    "tags": [
      "magia",
      "concentração",
      "combate"
    ]
  },
  {
    "id": "grappler",
    "name": "Grappler",
    "namePt": "Agarrador",
    "category": "General",
    "prerequisite": "Nível 4+, Força ou Destreza 13+",
    "repeatable": false,
    "summary": "Melhora táticas de agarrar e controlar fisicamente inimigos.",
    "tags": [
      "controle",
      "corpo a corpo",
      "força"
    ]
  }
];

function getFeatDatabase() {
  return Array.isArray(FEAT_DATABASE) ? FEAT_DATABASE : [];
}

window.FEAT_DATABASE = FEAT_DATABASE;
window.getFeatDatabase = getFeatDatabase;
