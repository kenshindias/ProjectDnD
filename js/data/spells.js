// ====================================================================
// SPELL DATABASE — ARCANUM CODEX
// ====================================================================
// Banco inicial com magias básicas compatíveis com 5E/SRD.
//
// Importante:
// - As descrições abaixo são resumos/paráfrases curtas em português.
// - Não são textos oficiais completos.
// - Para uso público, mantenha atribuição apropriada ao SRD quando aplicável.
//
// Atribuição sugerida se você publicar conteúdo derivado do SRD:
// This work includes material taken from the System Reference Document 5.1
// (“SRD 5.1”) by Wizards of the Coast LLC and available at
// https://dnd.wizards.com/resources/systems-reference-document.
// The SRD 5.1 is licensed under the Creative Commons Attribution 4.0
// International License available at https://creativecommons.org/licenses/by/4.0/legalcode.

const SPELL_DATABASE = [
  {
    "id": "fire-bolt",
    "name": "Fire Bolt",
    "namePt": "Raio de Fogo",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 ft",
    "duration": "Instantaneous",
    "components": "V, S",
    "damage": "1d10 Fire",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "summary": "Ataque mágico à distância que causa dano de fogo em uma criatura ou objeto."
  },
  {
    "id": "light",
    "name": "Light",
    "namePt": "Luz",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 Hour",
    "components": "V, M",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "wizard"
    ],
    "summary": "Faz um objeto tocado emitir luz por um período prolongado."
  },
  {
    "id": "mage-hand",
    "name": "Mage Hand",
    "namePt": "Mão Mágica",
    "level": 0,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "30 ft",
    "duration": "1 Minute",
    "components": "V, S",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "summary": "Cria uma mão espectral simples capaz de manipular objetos leves à distância."
  },
  {
    "id": "minor-illusion",
    "name": "Minor Illusion",
    "namePt": "Ilusão Menor",
    "level": 0,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "30 ft",
    "duration": "1 Minute",
    "components": "S, M",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "summary": "Cria uma pequena imagem ou som ilusório dentro do alcance."
  },
  {
    "id": "prestidigitation",
    "name": "Prestidigitation",
    "namePt": "Prestidigitação",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "10 ft",
    "duration": "Up to 1 Hour",
    "components": "V, S",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "summary": "Produz pequenos truques mágicos inofensivos, como limpar, aquecer, esfriar ou criar efeitos sensoriais."
  },
  {
    "id": "sacred-flame",
    "name": "Sacred Flame",
    "namePt": "Chama Sagrada",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "60 ft",
    "duration": "Instantaneous",
    "components": "V, S",
    "damage": "1d8 Radiant",
    "conc": false,
    "ritual": false,
    "classes": [
      "cleric"
    ],
    "summary": "Chama radiante atinge uma criatura que falhe em teste de Destreza."
  },
  {
    "id": "vicious-mockery",
    "name": "Vicious Mockery",
    "namePt": "Zombaria Viciosa",
    "level": 0,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 ft",
    "duration": "Instantaneous",
    "components": "V",
    "damage": "1d4 Psychic",
    "conc": false,
    "ritual": false,
    "classes": [
      "bard"
    ],
    "summary": "Insulto mágico que causa dano psíquico e atrapalha o próximo ataque do alvo."
  },
  {
    "id": "eldritch-blast",
    "name": "Eldritch Blast",
    "namePt": "Rajada Mística",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 ft",
    "duration": "Instantaneous",
    "components": "V, S",
    "damage": "1d10 Force",
    "conc": false,
    "ritual": false,
    "classes": [
      "warlock"
    ],
    "summary": "Ataque mágico à distância que dispara energia mística contra uma criatura."
  },
  {
    "id": "cure-wounds",
    "name": "Cure Wounds",
    "namePt": "Curar Ferimentos",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S",
    "damage": "1d8",
    "conc": false,
    "ritual": false,
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ],
    "summary": "Restaura pontos de vida de uma criatura tocada."
  },
  {
    "id": "healing-word",
    "name": "Healing Word",
    "namePt": "Palavra Curativa",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "60 ft",
    "duration": "Instantaneous",
    "components": "V",
    "damage": "1d4",
    "conc": false,
    "ritual": false,
    "classes": [
      "bard",
      "cleric",
      "druid"
    ],
    "summary": "Cura uma criatura à distância com uma palavra mágica rápida."
  },
  {
    "id": "detect-magic",
    "name": "Detect Magic",
    "namePt": "Detectar Magia",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "10 Minutes",
    "components": "V, S",
    "damage": "",
    "conc": true,
    "ritual": true,
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "summary": "Permite perceber presença de magia e identificar sua escola aproximada."
  },
  {
    "id": "mage-armor",
    "name": "Mage Armor",
    "namePt": "Armadura Arcana",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "8 Hours",
    "components": "V, S, M",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "summary": "Protege uma criatura sem armadura com defesa mágica."
  },
  {
    "id": "magic-missile",
    "name": "Magic Missile",
    "namePt": "Mísseis Mágicos",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 ft",
    "duration": "Instantaneous",
    "components": "V, S",
    "damage": "3d4+3 Force",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "summary": "Cria dardos de força mágica que atingem automaticamente alvos escolhidos."
  },
  {
    "id": "shield",
    "name": "Shield",
    "namePt": "Escudo Arcano",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Reaction",
    "range": "Self",
    "duration": "1 Round",
    "components": "V, S",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "summary": "Reação defensiva que aumenta temporariamente a CA contra ataques."
  },
  {
    "id": "sleep",
    "name": "Sleep",
    "namePt": "Sono",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "90 ft",
    "duration": "1 Minute",
    "components": "V, S, M",
    "damage": "5d8",
    "conc": false,
    "ritual": false,
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "summary": "Afeta criaturas em uma área com sono mágico, conforme pontos de vida."
  },
  {
    "id": "burning-hands",
    "name": "Burning Hands",
    "namePt": "Mãos Flamejantes",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "V, S",
    "damage": "3d6 Fire",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "summary": "Cone curto de fogo que atinge criaturas na área."
  },
  {
    "id": "find-familiar",
    "name": "Find Familiar",
    "namePt": "Encontrar Familiar",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Hour",
    "range": "10 ft",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "damage": "",
    "conc": false,
    "ritual": true,
    "classes": [
      "wizard"
    ],
    "summary": "Invoca um espírito familiar em forma animal para ajudar o conjurador."
  },
  {
    "id": "invisibility",
    "name": "Invisibility",
    "namePt": "Invisibilidade",
    "level": 2,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 Hour",
    "components": "V, S, M",
    "damage": "",
    "conc": true,
    "ritual": false,
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "summary": "Torna uma criatura invisível até a magia terminar ou ela atacar/conjurar."
  },
  {
    "id": "misty-step",
    "name": "Misty Step",
    "namePt": "Passo Nebuloso",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "V",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "summary": "Teleporte curto para um espaço visível próximo."
  },
  {
    "id": "spiritual-weapon",
    "name": "Spiritual Weapon",
    "namePt": "Arma Espiritual",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "60 ft",
    "duration": "1 Minute",
    "components": "V, S",
    "damage": "1d8 Force",
    "conc": false,
    "ritual": false,
    "classes": [
      "cleric"
    ],
    "summary": "Cria uma arma mágica que pode atacar criaturas próximas."
  },
  {
    "id": "fireball",
    "name": "Fireball",
    "namePt": "Bola de Fogo",
    "level": 3,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "150 ft",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "damage": "8d6 Fire",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "summary": "Explosão de fogo em área que causa grande dano a criaturas no raio."
  },
  {
    "id": "counterspell",
    "name": "Counterspell",
    "namePt": "Contramágica",
    "level": 3,
    "school": "Abjuration",
    "castTime": "1 Reaction",
    "range": "60 ft",
    "duration": "Instantaneous",
    "components": "S",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "summary": "Tenta interromper uma magia sendo conjurada por outra criatura."
  },
  {
    "id": "revivify",
    "name": "Revivify",
    "namePt": "Revivificar",
    "level": 3,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "damage": "",
    "conc": false,
    "ritual": false,
    "classes": [
      "cleric",
      "paladin"
    ],
    "summary": "Traz de volta à vida uma criatura recém-morta, se as condições forem atendidas."
  },
  {
    "id": "fly",
    "name": "Fly",
    "namePt": "Voo",
    "level": 3,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "10 Minutes",
    "components": "V, S, M",
    "damage": "",
    "conc": true,
    "ritual": false,
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "summary": "Concede deslocamento de voo a uma criatura tocada."
  },
  {
    "id": "lightning-bolt",
    "name": "Lightning Bolt",
    "namePt": "Relâmpago",
    "level": 3,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "damage": "8d6 Lightning",
    "conc": false,
    "ritual": false,
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "summary": "Linha de energia elétrica que atravessa criaturas na trajetória."
  }
];

function getSpellDatabase() {
  return Array.isArray(SPELL_DATABASE) ? SPELL_DATABASE : [];
}

window.SPELL_DATABASE = SPELL_DATABASE;
window.getSpellDatabase = getSpellDatabase;
