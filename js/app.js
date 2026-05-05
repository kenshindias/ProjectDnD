// ====================================================================
// INIT
// ====================================================================
function enterApp() {
  document.getElementById('title-screen').style.opacity='0';
  setTimeout(()=>{
    document.getElementById('title-screen').style.display='none';
    document.getElementById('app').classList.add('visible');
    initApp();
  },800);
}

function initApp() {
  buildSkillsList();
  buildSavingThrows();
  buildDeathSaves();
  buildConditions();
  buildSpellSlots();
  buildSpellsByLevel();
  addWeapon();
  addItem();
  updateAll();
  loadFromLocalStorage();
  renderCharTabs();
  updateHpBar();
  initUI();
}
// ====================================================================
// UPDATE ALL
// ====================================================================
function updateAll() {
  const attrs = ['str','dex','con','int','wis','cha'];
  attrs.forEach(a => {
    const score = getAbilityScore(a);
    const mod = Math.floor((score-10)/2);
    document.getElementById(`${a}-mod`).textContent = (mod>=0?'+':'')+mod;
  });
  buildSkillsList();
  buildSavingThrows();
  updateInitiative();
  updatePassivePerception();
  updateProfBonus();
  updateNextLevelXP();
  updateHpBar();
  updateSpellStats();
  updateCarryCapacity();
  updateTotalWeight();
  markDirty();
}

function updateInitiative() {
  const mod = getAbilityMod('dex');
  document.getElementById('initiative-display').textContent = (mod>=0?'+':'')+mod;
}

function updatePassivePerception() {
  const wisMod = getAbilityMod('wis');
  const percProf = skillProfs['perception']||0;
  const pb = getPB();
  const bonus = percProf===1?pb:percProf===2?pb*2:0;
  const pp = 10 + wisMod + bonus;
  document.getElementById('passive-perception').textContent = pp;
}

function updateProfBonus() {
  const pb = getPB();
  document.getElementById('prof-bonus-display').textContent = '+'+ pb;
}

function updateNextLevelXP() {
  const lvl = getLevel();
  if(lvl >= 20) { document.getElementById('next-level-xp').textContent = 'Nível Máximo!'; return; }
  document.getElementById('next-level-xp').textContent = XP_TABLE[lvl].toLocaleString('pt-BR') + ' XP';
}

function updateSpellStats() {
  const ability = document.getElementById('spell-ability')?.value;
  const panels = ['spell-stats-panel'];
  if(ability) {
    const mod = getAbilityMod(ability);
    const pb = getPB();
    const dc = 8 + pb + mod;
    const atk = (pb+mod>=0?'+':'')+(pb+mod);
    const abilityNames = {int:'INT',wis:'SAB',cha:'CAR'};
    ['spell-dc-display','spell-dc-big'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=dc; });
    ['spell-atk-display','spell-atk-big'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=atk; });
    ['spell-ability-display'].forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=abilityNames[ability]||'—'; });
    panels.forEach(id=>{ const el=document.getElementById(id); if(el) el.style.display=''; });
  }
}

function updateHpBar() {
  const cur = parseInt(document.getElementById('hp-current')?.value)||0;
  const max = parseInt(document.getElementById('hp-max')?.value)||1;
  const pct = Math.max(0,Math.min(100,(cur/max)*100));
  const bar = document.getElementById('hp-bar');
  if(bar) {
    bar.style.width = pct+'%';
    bar.style.background = pct > 50 ? 'linear-gradient(90deg,var(--blood-dark),var(--blood))' :
                           pct > 25 ? 'linear-gradient(90deg,#7a3300,#cc5500)' :
                           'linear-gradient(90deg,#3a0000,#880000)';
  }
}

function adjustHP(delta) {
  const el = document.getElementById('hp-current');
  const max = parseInt(document.getElementById('hp-max').value)||0;
  let val = (parseInt(el.value)||0)+delta;
  val = Math.min(max, val);
  el.value = val;
  updateHpBar();
  markDirty();
}

function applyHpDelta() {
  const delta = parseInt(document.getElementById('hp-delta').value)||0;
  adjustHP(delta);
  document.getElementById('hp-delta').value = '';
}

function toggleInspiration() {
  const gem = document.getElementById('inspiration-gem');
  gem.classList.toggle('inspired');
  markDirty();
}
// ====================================================================
// CLASS CHANGE
// ====================================================================
function onClassChange(options = {}) {
  const { preserveSubClass = false, shouldMarkDirty = true } = options;
  const cls = document.getElementById('char-class').value;
  const subEl = document.getElementById('char-subclass');
  const previousSubClass = subEl.value;

  subEl.innerHTML = '<option value="">— Escolha —</option>';
  if(cls && SUBCLASSES[cls]) {
    SUBCLASSES[cls].forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      subEl.appendChild(opt);
    });
  }

  if(preserveSubClass && previousSubClass) {
    subEl.value = previousSubClass;
  }

  updateClassBadges();
  updateClassResource();
  updateHitDice();
  autoSetSpellAbility();
  buildSpellSlots();
  if(shouldMarkDirty) markDirty();
}

function onRaceChange(options = {}) {
  const { preserveSubRace = false, shouldMarkDirty = true } = options;
  const race = document.getElementById('char-race').value;
  const subEl = document.getElementById('char-subrace');
  const previousSubRace = subEl.value;

  subEl.innerHTML = '<option value="">— Escolha —</option>';
  if(race && SUBRACES[race]) {
    SUBRACES[race].forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      subEl.appendChild(opt);
    });
  }

  if(preserveSubRace && previousSubRace) {
    subEl.value = previousSubRace;
  }

  updateClassBadges();
  updateRaceTraits();
  if(shouldMarkDirty) markDirty();
}

function updateClassBadges() {
  const cls = document.getElementById('char-class').value;
  const race = document.getElementById('char-race').value;
  const sub = document.getElementById('char-subclass').value;
  const el = document.getElementById('class-race-badges');
  el.innerHTML = '';
  if(cls) {
    const b = document.createElement('div');
    b.className = 'class-badge';
    b.innerHTML = `⚔ ${CLASS_NAMES_PT[cls]||cls}`;
    // Apply class theme to body
    document.body.className = `class-${cls} race-${race}`;
    if(sub) b.title = sub;
    el.appendChild(b);
  }
  if(race) {
    const b = document.createElement('div');
    b.className = 'race-badge';
    b.style.background = 'rgba(139,94,60,0.1)';
    b.style.border = '1px solid rgba(139,94,60,0.3)';
    b.style.color = 'var(--leather)';
    b.innerHTML = `✦ ${RACE_NAMES_PT[race]||race}`;
    el.appendChild(b);
  }
}

function updateClassResource() {
  const cls = document.getElementById('char-class').value;
  const lvl = getLevel();
  const panel = document.getElementById('class-resource-content');
  const title = document.getElementById('class-resource-title');
  if(cls && CLASS_RESOURCES[cls]) {
    title.textContent = `Recursos — ${CLASS_NAMES_PT[cls]}`;
    panel.innerHTML = CLASS_RESOURCES[cls](lvl);
  } else if(cls) {
    title.textContent = `Recursos — ${CLASS_NAMES_PT[cls]||cls}`;
    panel.innerHTML = `<div style="padding:0.5rem;"><p style="font-size:0.9rem;color:var(--ink-faded);font-style:italic;">Esta classe não tem recursos especiais rastreados aqui.<br>Use as notas de combate.</p></div>`;
  } else {
    title.textContent = 'Recursos da Classe';
    panel.innerHTML = '<div style="text-align:center;color:var(--ink-faded);font-style:italic;font-size:0.9rem;padding:1rem;">Escolha uma classe para ver seus recursos</div>';
  }
}

function updateRaceTraits() {
  const race = document.getElementById('char-race').value;
  const panel = document.getElementById('race-traits-content');
  const title = document.getElementById('race-traits-title');
  if(race && RACE_TRAITS[race]) {
    title.textContent = `Traços — ${RACE_NAMES_PT[race]}`;
    panel.innerHTML = RACE_TRAITS[race];
  } else {
    title.textContent = 'Traços Raciais';
    panel.innerHTML = '<div style="text-align:center;color:var(--ink-faded);font-style:italic;font-size:0.9rem;padding:1rem;">Escolha uma espécie para ver seus traços</div>';
  }
}

function updateHitDice() {
  const cls = document.getElementById('char-class').value;
  const lvl = getLevel();
  if(cls && CLASS_HIT_DICE[cls]) {
    document.getElementById('hit-dice-total').value = lvl;
    document.getElementById('hit-dice-type').value = CLASS_HIT_DICE[cls];
  }
}

function autoSetSpellAbility() {
  const cls = document.getElementById('char-class').value;
  if(SPELL_CASTERS[cls]) {
    document.getElementById('spell-ability').value = SPELL_CASTERS[cls].ability;
    document.getElementById('spell-class-name').value = CLASS_NAMES_PT[cls]||cls;
    document.getElementById('spell-stats-panel').style.display='';
    updateSpellStats();
  }
}

function onLevelChange() {
  updateAll();
  updateClassResource();
  updateHitDice();
  buildSpellSlots();
}

// ====================================================================
// UI FALLBACK EXPORTS
// Mantém o app funcionando mesmo se ui.js não tiver sido carregado na ordem correta.
// ====================================================================
if (typeof window.showSection !== 'function') {
  window.showSection = function(section, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
    const page = document.getElementById('page-' + section);
    if (page) page.classList.add('active');
    if (btn) btn.classList.add('active');
    if (section === 'combat' && typeof renderWeapons === 'function') renderWeapons();
    if (section === 'features' && typeof renderFeatures === 'function') renderFeatures();
  };
}

if (typeof window.uploadPortrait !== 'function') {
  window.uploadPortrait = function() {
    const input = document.getElementById('portrait-upload');
    if (input) input.click();
  };
}

if (typeof window.handlePortraitUpload !== 'function') {
  window.handlePortraitUpload = function(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = document.getElementById('portrait-img');
      const placeholder = document.getElementById('portrait-placeholder');
      if (img) { img.src = ev.target.result; img.style.display = 'block'; }
      if (placeholder) placeholder.style.display = 'none';
      if (typeof markDirty === 'function') markDirty();
    };
    reader.readAsDataURL(file);
  };
}

if (typeof window.updateWealthTotal !== 'function') {
  window.updateWealthTotal = function() {
    const cp = parseInt(document.getElementById('coin-cp')?.value) || 0;
    const sp = parseInt(document.getElementById('coin-sp')?.value) || 0;
    const ep = parseInt(document.getElementById('coin-ep')?.value) || 0;
    const gp = parseInt(document.getElementById('coin-gp')?.value) || 0;
    const pp = parseInt(document.getElementById('coin-pp')?.value) || 0;
    const totalGp = (cp / 100) + (sp / 10) + (ep / 2) + gp + (pp * 10);
    const el = document.getElementById('total-wealth');
    if (el) el.textContent = `Total: ${totalGp.toFixed(1)} PO equivalente`;
  };
}

if (typeof window.initUI !== 'function') {
  window.initUI = function() {
    ['coin-cp', 'coin-sp', 'coin-ep', 'coin-gp', 'coin-pp'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => { window.updateWealthTotal(); if (typeof markDirty === 'function') markDirty(); });
      el.addEventListener('change', () => { window.updateWealthTotal(); if (typeof markDirty === 'function') markDirty(); });
    });
    window.updateWealthTotal();
  };
}
