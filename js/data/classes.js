// ====================================================================
// CLASSES.JS - extraído de app.js
// ====================================================================

const SUBCLASSES = {
  barbarian: ['Caminho do Berserker','Coração Selvagem','Árvore do Mundo','Zealota'],
  bard: ['Colégio da Dança','Colégio do Glamour','Colégio do Lore','Colégio do Valor'],
  cleric: ['Domínio da Vida','Domínio da Luz','Domínio da Trapaça','Domínio da Guerra'],
  druid: ['Círculo da Terra','Círculo da Lua','Círculo do Mar','Círculo das Estrelas'],
  fighter: ['Mestre de Batalha','Campeão','Cavaleiro Élfico','Guerreiro Psi'],
  monk: ['Guerreiro da Misericórdia','Guerreiro da Sombra','Guerreiro dos Elementos','Guerreiro da Mão Aberta'],
  paladin: ['Juramento de Devoção','Juramento de Glória','Juramento dos Antigos','Juramento de Vingança'],
  ranger: ['Mestre das Feras','Viajante Feérico','Caçador das Sombras','Caçador'],
  rogue: ['Trapaceiro Arcano','Assassino','Lâmina da Alma','Ladrão'],
  sorcerer: ['Magia Aberrante','Magia Mecânica','Magia Dracônica','Magia Selvagem'],
  warlock: ['Patrono Arquifada','Patrono Celestial','Patrono do Demônio','Patrono do Grande Ancião'],
  wizard: ['Abjurador','Adivinho','Evocador','Ilusionista']
};

const SPELL_CASTERS = {
  bard: {ability:'cha', slots: [[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]]},
  cleric: {ability:'wis', slots: [[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]]},
  druid: {ability:'wis', slots: [[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]]},
  paladin: {ability:'cha', slots: [[0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,0,0,0,0]]},
  ranger: {ability:'wis', slots: [[0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,0,0,0,0]]},
  sorcerer: {ability:'cha', slots: [[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]]},
  warlock: {ability:'cha', slots: [[1,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,0,2,0,0,0,0,0,0],[0,0,2,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0],[0,0,0,2,0,0,0,0,0],[0,0,0,0,2,0,0,0,0],[0,0,0,0,2,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0]]},
  wizard: {ability:'int', slots: [[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]]},
  fighter: {ability:'int', slots: [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,0,0,0,0]]},
  rogue: {ability:'int', slots: [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,0,0,0,0]]}
};

const CLASS_RESOURCES = {
  barbarian: (lvl) => `<div class="class-resource"><div class="resource-name" style="color:var(--fire-red);">⚔ Fúria</div><div class="resource-pips" style="color:var(--fire-red);" id="rage-pips"></div><div style="font-size:0.75rem;color:var(--ink-faded);margin-top:4px;">${[0,2,2,3,3,3,4,4,4,4,4,4,5,5,5,5,6,6,6,7][lvl-1]} por Descanso Longo</div></div><script>(() => {const max=${[0,2,2,3,3,3,4,4,4,4,4,4,5,5,5,5,6,6,6,7][lvl-1]};const el=document.getElementById('rage-pips');if(!el)return;el.innerHTML='';for(let i=0;i<max;i++){const p=document.createElement('div');p.className='pip';p.style.borderColor='var(--fire-red)';p.style.color='var(--fire-red)';p.onclick=()=>p.classList.toggle('filled');el.appendChild(p)}})()</scr`+'ipt>',
  monk: (lvl) => `<div class="class-resource"><div class="resource-name" style="color:#1a6a8a;">☯ Pontos de Foco</div><div class="resource-pips" style="color:#1a6a8a;" id="focus-pips"></div><div style="font-size:0.75rem;color:var(--ink-faded);margin-top:4px;">${lvl} pontos por Descanso Curto</div></div><script>(() => {const el=document.getElementById('focus-pips');if(!el)return;el.innerHTML='';for(let i=0;i<${lvl};i++){const p=document.createElement('div');p.className='pip';p.style.borderColor='#1a6a8a';p.style.color='#1a6a8a';p.onclick=()=>p.classList.toggle('filled');el.appendChild(p)}})()</scr`+'ipt>',
  warlock: (lvl) => `<div class="class-resource"><div class="resource-name" style="color:var(--magic-purple);">◈ Espaços Élfico</div><div style="display:flex;justify-content:center;gap:6px;margin-top:6px;" id="warlock-slots"></div></div><script>(() => {const slots=${[1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4][lvl-1]};const el=document.getElementById('warlock-slots');if(!el)return;for(let i=0;i<slots;i++){const s=document.createElement('div');s.style.cssText='width:22px;height:22px;border:2px solid var(--magic-purple);border-radius:50%;cursor:pointer;transition:all .2s;';s.onclick=()=>s.style.background=s.style.background?'':'var(--magic-purple)';el.appendChild(s)}})()</scr`+'ipt>',
  paladin: (lvl) => `<div class="class-resource"><div class="resource-name" style="color:var(--gold-dark);">☀ Canal Divino</div><div style="display:flex;justify-content:center;gap:6px;margin-top:6px;" id="divine-slots"></div></div><script>(() => {const uses=${lvl>=9?3:lvl>=5?2:1};const el=document.getElementById('divine-slots');if(!el)return;for(let i=0;i<uses;i++){const s=document.createElement('div');s.style.cssText='width:22px;height:22px;border:2px solid var(--gold-dark);border-radius:50%;cursor:pointer;transition:all .2s;';s.onclick=()=>s.style.background=s.style.background?'':'var(--gold-dark)';el.appendChild(s)}})()</scr`+'ipt>',
};

const CLASS_HIT_DICE = { barbarian:12,bard:8,cleric:8,druid:8,fighter:10,monk:8,paladin:10,ranger:10,rogue:8,sorcerer:6,warlock:8,wizard:6 };

const PROF_SAVES = {
  barbarian:['str','con'], bard:['dex','cha'], cleric:['wis','cha'], druid:['int','wis'],
  fighter:['str','con'], monk:['str','dex'], paladin:['wis','cha'], ranger:['str','dex'],
  rogue:['dex','int'], sorcerer:['con','cha'], warlock:['wis','cha'], wizard:['int','wis']
};

const PROF_SKILLS = {
  barbarian:['athletics','intimidation','nature','perception','survival','animalHandling'],
  bard:['any1','any2','any3'],
  cleric:['history','insight','medicine','persuasion','religion'],
  druid:['arcana','animalHandling','insight','medicine','nature','perception','religion','survival'],
  fighter:['acrobatics','animalHandling','athletics','history','insight','intimidation','perception','survival'],
  monk:['acrobatics','athletics','history','insight','religion','stealth'],
  paladin:['athletics','insight','intimidation','medicine','persuasion','religion'],
  ranger:['animalHandling','athletics','insight','investigation','nature','perception','stealth','survival'],
  rogue:['acrobatics','athletics','deception','insight','intimidation','investigation','perception','performance','persuasion','sleightOfHand','stealth'],
  sorcerer:['arcana','deception','insight','intimidation','persuasion','religion'],
  warlock:['arcana','deception','history','intimidation','investigation','nature','religion'],
  wizard:['arcana','history','insight','investigation','medicine','religion']
};

const CLASS_NAMES_PT = {barbarian:'Bárbaro',bard:'Bardo',cleric:'Clérigo',druid:'Druida',fighter:'Guerreiro',monk:'Monge',paladin:'Paladino',ranger:'Patrulheiro',rogue:'Ladino',sorcerer:'Feiticeiro',warlock:'Bruxo',wizard:'Mago'};
