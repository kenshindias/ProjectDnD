// ====================================================================
// RENDER / UI BUILDERS
// ====================================================================
// Funções extraídas de app.js na Etapa 2D.
// Mantidas no escopo global para funcionar com <script src="..."> normal.

// ====================================================================
// SKILLS & SAVES
// ====================================================================
function buildSkillsList() {
  const el = document.getElementById('skills-list');
  el.innerHTML = '';
  SKILLS_DATA.forEach(s => {
    const prof = skillProfs[s.key] || 0; // 0=none, 1=prof, 2=expertise
    const mod = getAbilityMod(s.attr) + (prof===1?getPB():prof===2?getPB()*2:0);
    const div = document.createElement('div');
    div.className = 'skill-row';
    div.innerHTML = `
      <div class="skill-prof ${prof===1?'proficient':prof===2?'expertise':''}" id="skprof-${s.key}" onclick="cycleSkillProf('${s.key}')"></div>
      <div class="skill-bonus" id="skbonus-${s.key}">${mod>=0?'+':''}${mod}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-attr">${s.attr.toUpperCase()}</div>
    `;
    el.appendChild(div);
  });
}

function cycleSkillProf(key) {
  skillProfs[key] = ((skillProfs[key]||0)+1)%3;
  buildSkillsList();
  updatePassivePerception();
  markDirty();
}

function buildSavingThrows() {
  const el = document.getElementById('saving-throws-list');
  const attrs = [{k:'str',n:'Força'},{k:'dex',n:'Destreza'},{k:'con',n:'Constituição'},{k:'int',n:'Inteligência'},{k:'wis',n:'Sabedoria'},{k:'cha',n:'Carisma'}];
  el.innerHTML = '';
  attrs.forEach(a => {
    const prof = saveProfs[a.k] || false;
    const mod = getAbilityMod(a.k) + (prof?getPB():0);
    const div = document.createElement('div');
    div.className = 'save-row';
    div.innerHTML = `
      <div class="save-prof ${prof?'proficient':''}" id="sav-${a.k}" onclick="toggleSaveProf('${a.k}')"></div>
      <div class="save-val" id="savval-${a.k}">${mod>=0?'+':''}${mod}</div>
      <div class="save-name">${a.n}</div>
      <button onclick="rollSave('${a.k}','${a.n}')" style="background:transparent;border:1px solid var(--parchment-darker);border-radius:3px;color:var(--ink-faded);font-size:0.65rem;padding:1px 5px;cursor:pointer;font-family:'Cinzel',serif;" title="Rolar">🎲</button>
    `;
    el.appendChild(div);
  });
}

function toggleSaveProf(attr) {
  saveProfs[attr] = !saveProfs[attr];
  buildSavingThrows();
  markDirty();
}

function buildDeathSaves() {
  ['success','failure'].forEach(type => {
    const el = document.getElementById(`death-${type}`);
    el.innerHTML = '';
    for(let i=0;i<3;i++) {
      const d = document.createElement('div');
      d.className = `save-dot ${type}`;
      const arr = type==='success'?deathSuccesses:deathFailures;
      if(arr[i]) d.classList.add('filled');
      d.onclick = () => { arr[i]=!arr[i]; buildDeathSaves(); markDirty(); };
      el.appendChild(d);
    }
  });
}

function resetDeathSaves() {
  deathSuccesses=[false,false,false];
  deathFailures=[false,false,false];
  buildDeathSaves();
}

function buildConditions() {
  const el = document.getElementById('conditions-area');
  if(!el) return;
  el.innerHTML = '';

  // Garante compatibilidade caso activeConditions ainda não exista
  // por causa de cache do navegador ou arquivos antigos.
  if(typeof activeConditions === 'undefined') {
    activeConditions = [];
  }

  CONDITIONS.forEach(c => {
    const chip = document.createElement('div');
    chip.className = 'condition-chip';
    chip.style.borderColor = c.color;
    chip.style.color = c.color;
    chip.textContent = c.name;
    chip.title = 'Clique para ativar/desativar';

    if(activeConditions.includes(c.name)) {
      chip.classList.add('active');
    }

    chip.onclick = () => {
      chip.classList.toggle('active');

      if(chip.classList.contains('active')) {
        if(!activeConditions.includes(c.name)) {
          activeConditions.push(c.name);
        }
      } else {
        activeConditions = activeConditions.filter(name => name !== c.name);
      }

      markDirty();
    };

    el.appendChild(chip);
  });
}

// ====================================================================
// SPELL SLOTS
// ====================================================================
function buildSpellSlots() {
  const el = document.getElementById('spell-slots-grid');
  el.innerHTML = '';
  const cls = document.getElementById('char-class').value;
  const lvl = getLevel();
  const casterData = SPELL_CASTERS[cls];
  if(!casterData) {
    el.innerHTML = '<div style="color:var(--ink-faded);font-style:italic;font-size:0.85rem;grid-column:span 9;">Esta classe não usa espaços de magia padrão.</div>';
    return;
  }
  const slots = casterData.slots[lvl-1] || [0,0,0,0,0,0,0,0,0];
  for(let i=0;i<9;i++) {
    const max = slots[i];
    if(!spellSlots[i+1]) spellSlots[i+1] = {max, used:0};
    else spellSlots[i+1].max = max;
    const col = document.createElement('div');
    col.style.display='flex';col.style.flexDirection='column';col.style.alignItems='center';col.style.gap='4px';
    col.innerHTML = `<div style="font-family:'Cinzel',serif;font-size:0.65rem;color:var(--blood);font-weight:700;">N${i+1}</div>`;
    const pips = document.createElement('div');
    pips.style.display='flex';pips.style.flexWrap='wrap';pips.style.gap='3px';pips.style.justifyContent='center';
    for(let j=0;j<max;j++) {
      const pip = document.createElement('div');
      pip.className = 'spell-slot';
      pip.classList.add(j < spellSlots[i+1].used ? 'used' : 'available');
      pip.onclick = () => {
        const slot = spellSlots[i+1];
        if(pip.classList.contains('available')) { slot.used++; pip.classList.replace('available','used'); }
        else { slot.used = Math.max(0,slot.used-1); pip.classList.replace('used','available'); }
        markDirty();
      };
      pips.appendChild(pip);
    }
    if(max===0) { const dash=document.createElement('div');dash.textContent='—';dash.style.color='var(--ink-faded)';dash.style.fontSize='0.8rem';pips.appendChild(dash); }
    col.appendChild(pips);
    el.appendChild(col);
  }
}

// ====================================================================
// SPELL DATABASE LOADER / MODAL
// ====================================================================
function loadSpellDatabaseIfNeeded(callback) {
  if (Array.isArray(window.SPELL_DATABASE)) {
    callback();
    return;
  }

  const existing = document.querySelector('script[data-arcanum-spell-db="1"]');
  if (existing) {
    existing.addEventListener('load', callback, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.src = 'js/data/spells.js';
  script.dataset.arcanumSpellDb = '1';
  script.onload = callback;
  script.onerror = () => alert('Não foi possível carregar js/data/spells.js');
  document.head.appendChild(script);
}

function normalizeSpellDatabaseEntry(entry) {
  return {
    name: entry.namePt || entry.name || 'Magia sem nome',
    originalName: entry.name || '',
    school: entry.school || '',
    castTime: entry.castTime || '1 Ação',
    range: entry.range || '30 ft',
    duration: entry.duration || 'Instantaneous',
    damage: entry.damage || '',
    components: entry.components || '',
    conc: !!entry.conc,
    ritual: !!entry.ritual,
    description: entry.summary || '',
    prepared: false,
    databaseId: entry.id || '',
    source: 'Spell Database'
  };
}

function addSpellFromDatabaseById(id) {
  loadSpellDatabaseIfNeeded(() => {
    const db = window.SPELL_DATABASE || [];
    const entry = db.find(sp => sp.id === id);

    if (!entry) {
      alert('Magia não encontrada no banco.');
      return;
    }

    const level = Number.isInteger(entry.level) ? entry.level : parseInt(entry.level || 0) || 0;

    if (!spells[level]) spells[level] = [];
    spells[level].push(normalizeSpellDatabaseEntry(entry));

    closeModal('new-char-modal');
    buildSpellsByLevel();
    markDirty();

    if (typeof showDriveStatus === 'function') {
      showDriveStatus('saved', 'Magia adicionada do banco ✓');
    }
  });
}

function showSpellDatabaseModal() {
  loadSpellDatabaseIfNeeded(() => {
    const modal = document.getElementById('new-char-modal');
    if (!modal) return;

    const db = window.SPELL_DATABASE || [];

    modal.querySelector('.modal-box').innerHTML = `
      <div class="modal-title">✦ Banco de Magias</div>

      <div class="spell-db-controls">
        <input class="field-input" id="spell-db-search" placeholder="Buscar por nome, classe, escola...">

        <select class="field-select" id="spell-db-level">
          <option value="all">Todos os níveis</option>
          <option value="0">Truques</option>
          <option value="1">Nível 1</option>
          <option value="2">Nível 2</option>
          <option value="3">Nível 3</option>
        </select>

        <select class="field-select" id="spell-db-class">
          <option value="all">Todas as classes</option>
          <option value="bard">Bardo</option>
          <option value="cleric">Clérigo</option>
          <option value="druid">Druida</option>
          <option value="paladin">Paladino</option>
          <option value="ranger">Patrulheiro</option>
          <option value="sorcerer">Feiticeiro</option>
          <option value="warlock">Bruxo</option>
          <option value="wizard">Mago</option>
        </select>
      </div>

      <div id="spell-db-results" class="spell-db-results"></div>

      <div style="display:flex;gap:0.8rem;margin-top:1rem;">
        <button class="btn-secondary" onclick="closeModal('new-char-modal')">Fechar</button>
      </div>
    `;

    const renderResults = () => {
      const search = (document.getElementById('spell-db-search')?.value || '').trim().toLowerCase();
      const level = document.getElementById('spell-db-level')?.value || 'all';
      const cls = document.getElementById('spell-db-class')?.value || 'all';
      const results = document.getElementById('spell-db-results');

      const filtered = db.filter(sp => {
        if (level !== 'all' && String(sp.level) !== level) return false;
        if (cls !== 'all' && !(sp.classes || []).includes(cls)) return false;

        if (search) {
          const haystack = [sp.name, sp.namePt, sp.school, sp.summary, sp.damage, ...(sp.classes || [])]
            .map(v => String(v || '').toLowerCase())
            .join(' ');

          if (!haystack.includes(search)) return false;
        }

        return true;
      });

      if (!results) return;

      if (filtered.length === 0) {
        results.innerHTML = '<div style="text-align:center;color:var(--ink-faded);font-style:italic;padding:1rem;">Nenhuma magia encontrada.</div>';
        return;
      }

      results.innerHTML = filtered.map(sp => `
        <div class="spell-db-card">
          <div>
            <div class="spell-db-name">${escapeSpellText(sp.namePt || sp.name)}</div>
            <div class="spell-db-meta">
              ${sp.level === 0 ? 'Truque' : 'Nível ' + sp.level} • ${escapeSpellText(sp.school || '')}
              ${sp.conc ? ' • Concentração' : ''}
              ${sp.ritual ? ' • Ritual' : ''}
            </div>
            <div class="spell-db-summary">${escapeSpellText(sp.summary || '')}</div>
            <div class="spell-db-meta">${escapeSpellText((sp.classes || []).join(', '))}</div>
          </div>

          <button class="btn-primary spell-db-add-btn" onclick="addSpellFromDatabaseById('${escapeSpellText(sp.id)}')">Adicionar</button>
        </div>
      `).join('');
    };

    document.getElementById('spell-db-search')?.addEventListener('input', renderResults);
    document.getElementById('spell-db-level')?.addEventListener('change', renderResults);
    document.getElementById('spell-db-class')?.addEventListener('change', renderResults);

    renderResults();
    modal.classList.add('open');
  });
}

// ====================================================================
// SPELL FILTERS
// ====================================================================
window.spellFilters = window.spellFilters || {
  search: '',
  level: 'all',
  prepared: 'all',
  concentration: false,
  ritual: false
};

function setupSpellFiltersStyles() {
  if (document.getElementById('arcanum-spell-filters-styles')) return;

  const style = document.createElement('style');
  style.id = 'arcanum-spell-filters-styles';
  style.textContent = `
    .spell-filters-bar {
      background: rgba(255,255,255,0.28);
      border: 1px solid var(--parchment-darker);
      border-radius: 6px;
      padding: 0.75rem;
      margin-bottom: 1rem;
      display: grid;
      grid-template-columns: minmax(160px, 1.4fr) minmax(105px, 0.7fr) minmax(130px, 0.8fr) auto auto auto auto;
      gap: 0.55rem;
      align-items: end;
    }

    .spell-filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .spell-filter-group label,
    .spell-filter-check label {
      font-family: 'Cinzel', serif;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--blood);
    }

    .spell-filter-group input,
    .spell-filter-group select {
      min-height: 32px;
      background: rgba(255,255,255,0.35);
      border: 1px solid var(--parchment-darker);
      border-radius: 4px;
      color: var(--ink);
      font-family: 'Crimson Text', serif;
      font-size: 0.95rem;
      padding: 0.3rem 0.5rem;
      outline: none;
    }

    .spell-filter-group input:focus,
    .spell-filter-group select:focus {
      border-color: var(--gold-dark);
      box-shadow: 0 0 0 2px rgba(201,162,39,0.12);
    }

    .spell-filter-check {
      min-height: 32px;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      padding-bottom: 0.25rem;
      white-space: nowrap;
    }

    .spell-filter-check input {
      cursor: pointer;
    }

    .spell-filter-clear {
      min-height: 32px;
      background: transparent;
      border: 1px dashed var(--parchment-darker);
      color: var(--ink-faded);
      font-family: 'Cinzel', serif;
      font-size: 0.68rem;
      font-weight: 700;
      border-radius: 4px;
      padding: 0.35rem 0.7rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .spell-filter-clear:hover {
      border-color: var(--gold-dark);
      color: var(--gold-dark);
      background: rgba(255,255,255,0.25);
    }

    .spell-db-controls {
      display: grid;
      grid-template-columns: 1fr 140px 160px;
      gap: 0.55rem;
      margin-bottom: 0.85rem;
    }

    .spell-db-results {
      max-height: 55vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
      padding-right: 0.25rem;
    }

    .spell-db-card {
      background: rgba(255,255,255,0.35);
      border: 1px solid var(--parchment-darker);
      border-radius: 6px;
      padding: 0.7rem;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.75rem;
      align-items: center;
    }

    .spell-db-name {
      font-family: 'Cinzel', serif;
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ink);
    }

    .spell-db-meta {
      font-size: 0.72rem;
      color: var(--blood);
      font-family: 'Cinzel', serif;
      margin-top: 0.15rem;
    }

    .spell-db-summary {
      font-size: 0.88rem;
      color: var(--ink-light);
      line-height: 1.35;
      margin-top: 0.35rem;
    }

    .spell-db-add-btn {
      white-space: nowrap;
    }

    @media (max-width: 700px) {
      .spell-db-controls {
        grid-template-columns: 1fr;
      }

      .spell-db-card {
        grid-template-columns: 1fr;
      }
    }

    .spell-filter-results {
      grid-column: 1 / -1;
      font-size: 0.8rem;
      color: var(--ink-faded);
      font-style: italic;
    }

    @media (max-width: 960px) {
      .spell-filters-bar {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .spell-filter-results {
        grid-column: span 2;
      }
    }

    @media (max-width: 560px) {
      .spell-filters-bar {
        grid-template-columns: 1fr;
      }

      .spell-filter-results {
        grid-column: auto;
      }
    }
  `;

  document.head.appendChild(style);
}

function setupSpellFilters() {
  setupSpellFiltersStyles();

  const spellList = document.getElementById('spells-by-level');
  if (!spellList) return;

  let bar = document.getElementById('spell-filters-bar');

  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'spell-filters-bar';
    bar.className = 'spell-filters-bar';
    bar.innerHTML = `
      <div class="spell-filter-group">
        <label>Buscar</label>
        <input id="spell-filter-search" type="search" placeholder="Nome, escola, dano, descrição...">
      </div>

      <div class="spell-filter-group">
        <label>Nível</label>
        <select id="spell-filter-level">
          <option value="all">Todos</option>
          <option value="0">Truques</option>
          <option value="1">Nível 1</option>
          <option value="2">Nível 2</option>
          <option value="3">Nível 3</option>
          <option value="4">Nível 4</option>
          <option value="5">Nível 5</option>
          <option value="6">Nível 6</option>
          <option value="7">Nível 7</option>
          <option value="8">Nível 8</option>
          <option value="9">Nível 9</option>
        </select>
      </div>

      <div class="spell-filter-group">
        <label>Preparação</label>
        <select id="spell-filter-prepared">
          <option value="all">Todas</option>
          <option value="prepared">Preparadas</option>
          <option value="unprepared">Não preparadas</option>
        </select>
      </div>

      <div class="spell-filter-check">
        <input id="spell-filter-concentration" type="checkbox">
        <label for="spell-filter-concentration">Concentração</label>
      </div>

      <div class="spell-filter-check">
        <input id="spell-filter-ritual" type="checkbox">
        <label for="spell-filter-ritual">Ritual</label>
      </div>

      <button class="spell-filter-clear" id="spell-filter-clear" type="button">Limpar</button>
      <button class="spell-filter-clear" id="spell-db-open" type="button">Banco</button>

      <div class="spell-filter-results" id="spell-filter-results"></div>
    `;

    spellList.parentNode.insertBefore(bar, spellList);
  }

  const search = document.getElementById('spell-filter-search');
  const level = document.getElementById('spell-filter-level');
  const prepared = document.getElementById('spell-filter-prepared');
  const concentration = document.getElementById('spell-filter-concentration');
  const ritual = document.getElementById('spell-filter-ritual');
  const clear = document.getElementById('spell-filter-clear');
  const openDb = document.getElementById('spell-db-open');

  const syncFromState = () => {
    if (search) search.value = window.spellFilters.search || '';
    if (level) level.value = window.spellFilters.level || 'all';
    if (prepared) prepared.value = window.spellFilters.prepared || 'all';
    if (concentration) concentration.checked = !!window.spellFilters.concentration;
    if (ritual) ritual.checked = !!window.spellFilters.ritual;
  };

  const apply = () => {
    window.spellFilters = {
      search: search?.value || '',
      level: level?.value || 'all',
      prepared: prepared?.value || 'all',
      concentration: !!concentration?.checked,
      ritual: !!ritual?.checked
    };

    buildSpellsByLevel();
  };

  if (bar.dataset.bound !== '1') {
    bar.dataset.bound = '1';

    search?.addEventListener('input', apply);
    level?.addEventListener('change', apply);
    prepared?.addEventListener('change', apply);
    concentration?.addEventListener('change', apply);
    ritual?.addEventListener('change', apply);

    openDb?.addEventListener('click', () => {
      showSpellDatabaseModal();
    });

    clear?.addEventListener('click', () => {
      window.spellFilters = {
        search: '',
        level: 'all',
        prepared: 'all',
        concentration: false,
        ritual: false
      };

      syncFromState();
      buildSpellsByLevel();
    });
  }

  syncFromState();
}

function getSpellFilterState() {
  return window.spellFilters || {
    search: '',
    level: 'all',
    prepared: 'all',
    concentration: false,
    ritual: false
  };
}

function spellMatchesFilters(spell, level) {
  const filters = getSpellFilterState();

  if (filters.level !== 'all' && String(level) !== String(filters.level)) return false;

  if (filters.prepared === 'prepared' && !spell.prepared) return false;
  if (filters.prepared === 'unprepared' && spell.prepared) return false;

  if (filters.concentration && !spell.conc) return false;
  if (filters.ritual && !spell.ritual) return false;

  const search = String(filters.search || '').trim().toLowerCase();
  if (search) {
    const searchable = [
      spell.name,
      spell.school,
      spell.castTime,
      spell.range,
      spell.duration,
      spell.damage,
      spell.components,
      spell.description
    ].map(v => String(v || '').toLowerCase()).join(' ');

    if (!searchable.includes(search)) return false;
  }

  return true;
}

function updateSpellFilterResults(total, visible) {
  const el = document.getElementById('spell-filter-results');
  if (!el) return;

  if (total === 0) {
    el.textContent = 'Nenhuma magia cadastrada.';
    return;
  }

  if (visible === total) {
    el.textContent = `${total} magia${total === 1 ? '' : 's'} cadastrada${total === 1 ? '' : 's'}.`;
    return;
  }

  el.textContent = `Mostrando ${visible} de ${total} magia${total === 1 ? '' : 's'}.`;
}

function setupSpellCardEditStyles() {
  if (document.getElementById('arcanum-spell-card-edit-styles')) return;

  const style = document.createElement('style');
  style.id = 'arcanum-spell-card-edit-styles';
  style.textContent = `
    .spell-card-editable {
      cursor: pointer;
    }

    .spell-card-editable:hover {
      background: rgba(255,255,255,0.42);
    }

    .spell-click-area {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .spell-card-editable .spell-click-area:hover {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 2px;
    }
  `;

  document.head.appendChild(style);
}

function escapeSpellText(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildSpellsByLevel() {
  setupSpellCardEditStyles();

  const el = document.getElementById('spells-by-level');
  if(!el) return;

  setupSpellFilters();

  el.innerHTML = '';

  let hasAnySpell = false;
  let totalSpellCount = 0;
  let visibleSpellCount = 0;

  for(let lvl=0;lvl<=9;lvl++) {
    const originalSpellList = spells[lvl]||[];
    totalSpellCount += originalSpellList.length;

    const spellList = originalSpellList
      .map((spell, originalIndex) => ({ spell, originalIndex }))
      .filter(({ spell }) => spellMatchesFilters(spell, lvl));

    if(originalSpellList.length > 0) hasAnySpell = true;
    if(spellList.length===0) continue;

    visibleSpellCount += spellList.length;

    const section = document.createElement('div');
    section.className = 'spell-level-section';
    section.innerHTML = `<div class="spell-level-header">
      <div class="spell-level-badge">${lvl===0?'Truques':'Nível '+lvl}</div>
    </div>
    <div class="spell-list-header" style="display:grid;grid-template-columns:30px 1fr 80px 70px 60px 60px 40px;gap:4px;padding:2px 6px;font-family:'Cinzel',serif;font-size:0.6rem;color:var(--blood);letter-spacing:0.08em;border-bottom:1px solid var(--parchment-darker);">
      <div>Prep</div><div>Nome</div><div>Tempo</div><div>Alcance</div><div>Duração</div><div>Rolar</div><div></div>
    </div>`;

    spellList.forEach(({ spell: sp, originalIndex: idx }) => {
      const row = document.createElement('div');
      row.className = 'spell-card spell-card-editable';
      row.style.gridTemplateColumns = '30px 1fr 80px 70px 60px 60px 40px';
      row.title = 'Clique no card para editar esta magia';
      row.innerHTML = `
        <div class="spell-prep ${sp.prepared?'prepared':''}" onclick="event.stopPropagation(); toggleSpellPrep(${lvl},${idx})" title="Preparada"></div>
        <div class="spell-click-area" onclick="showSpellEditor(${lvl},${idx})">
          <div style="font-size:0.88rem;font-weight:600;color:var(--ink);">${escapeSpellText(sp.name||'Magia sem nome')}</div>
          <div style="font-size:0.7rem;color:var(--ink-faded);">${sp.conc?'<span class="spell-conc">C</span>':''} ${sp.ritual?'<span class="spell-ritual">R</span>':''} ${escapeSpellText(sp.school||'')}</div>
        </div>
        <div class="spell-click-area" onclick="showSpellEditor(${lvl},${idx})" style="font-size:0.78rem;color:var(--ink-faded);">${escapeSpellText(sp.castTime||'1 Ação')}</div>
        <div class="spell-click-area" onclick="showSpellEditor(${lvl},${idx})" style="font-size:0.78rem;color:var(--ink-faded);">${escapeSpellText(sp.range||'30ft')}</div>
        <div class="spell-click-area" onclick="showSpellEditor(${lvl},${idx})" style="font-size:0.78rem;color:var(--ink-faded);">${escapeSpellText(sp.duration||'Instantâneo')}</div>
        <button class="spell-roll-btn" onclick="event.stopPropagation(); rollSpell(${lvl},${idx})">🎲 ${escapeSpellText(sp.damage||'')}</button>
        <button class="del-btn" onclick="event.stopPropagation(); deleteSpell(${lvl},${idx})">✕</button>
      `;

      row.addEventListener('dblclick', () => showSpellEditor(lvl, idx));
      section.appendChild(row);
    });

    el.appendChild(section);
  }

  updateSpellFilterResults(totalSpellCount, visibleSpellCount);

  if(!hasAnySpell) {
    el.innerHTML = `
      <div style="text-align:center;color:var(--ink-faded);font-style:italic;font-size:0.9rem;padding:1rem;">
        Nenhuma magia adicionada ainda. Use os botões de adicionar magia para começar.
      </div>
    `;
    updateSpellFilterResults(0, 0);
    return;
  }

  if(visibleSpellCount === 0) {
    el.innerHTML = `
      <div style="text-align:center;color:var(--ink-faded);font-style:italic;font-size:0.9rem;padding:1rem;">
        Nenhuma magia encontrada com os filtros atuais.
      </div>
    `;
  }
}


function addSpell(level) {
  if(!spells[level]) spells[level]=[];
  spells[level].push({name:'',school:'',castTime:'1 Ação',range:'30ft',duration:'Instantâneo',damage:'',prepared:false,conc:false,ritual:false});
  showSpellEditor(level, spells[level].length-1);
}

function showSpellEditor(level, idx) {
  if(!spells[level] || !spells[level][idx]) return;

  const sp = spells[level][idx];
  const modal = document.getElementById('new-char-modal');
  if(!modal) return;

  modal.querySelector('.modal-box').innerHTML = `
    <div class="modal-title">✦ ${level===0?'Truque':'Magia Nível '+level}</div>

    <div class="field-group">
      <label class="field-label">Nome</label>
      <input class="field-input" id="se-name" value="${escapeSpellText(sp.name||'')}" placeholder="Nome da magia...">
    </div>

    <div class="grid-2" style="gap:0.6rem;">
      <div class="field-group">
        <label class="field-label">Escola</label>
        <select class="field-select" id="se-school">
          <option>Abjuração</option>
          <option>Adivinhação</option>
          <option>Conjuração</option>
          <option>Encantamento</option>
          <option>Evocação</option>
          <option>Ilusão</option>
          <option>Necromancia</option>
          <option>Transmutação</option>
        </select>
      </div>

      <div class="field-group">
        <label class="field-label">Tempo de Conjuração</label>
        <input class="field-input" id="se-cast" value="${escapeSpellText(sp.castTime||'1 Ação')}">
      </div>

      <div class="field-group">
        <label class="field-label">Alcance</label>
        <input class="field-input" id="se-range" value="${escapeSpellText(sp.range||'30ft')}">
      </div>

      <div class="field-group">
        <label class="field-label">Duração</label>
        <input class="field-input" id="se-duration" value="${escapeSpellText(sp.duration||'Instantâneo')}">
      </div>
    </div>

    <div class="field-group">
      <label class="field-label">Dano/Efeito (ex: 2d6+3 Fogo)</label>
      <input class="field-input" id="se-damage" value="${escapeSpellText(sp.damage||'')}" placeholder="ex: 8d6 Relâmpago">
    </div>

    <div class="field-group">
      <label class="field-label">Componentes</label>
      <input class="field-input" id="se-components" value="${escapeSpellText(sp.components||'')}" placeholder="V, S, M (...)">
    </div>

    <div style="display:flex;gap:1rem;margin:0.5rem 0;">
      <label style="display:flex;align-items:center;gap:4px;font-family:'Cinzel',serif;font-size:0.75rem;cursor:pointer;">
        <input type="checkbox" id="se-conc" ${sp.conc?'checked':''}> Concentração
      </label>
      <label style="display:flex;align-items:center;gap:4px;font-family:'Cinzel',serif;font-size:0.75rem;cursor:pointer;">
        <input type="checkbox" id="se-ritual" ${sp.ritual?'checked':''}> Ritual
      </label>
    </div>

    <div class="field-group">
      <label class="field-label">Descrição</label>
      <textarea class="notes-area" id="se-desc" rows="4" placeholder="Efeito da magia...">${escapeSpellText(sp.description||'')}</textarea>
    </div>

    <div style="display:flex;gap:0.8rem;margin-top:1rem;">
      <button class="btn-primary" onclick="saveSpellEdit(${level},${idx})">Salvar Magia</button>
      <button class="btn-secondary" onclick="closeModal('new-char-modal')">Cancelar</button>
    </div>
  `;

  const schoolEl = document.getElementById('se-school');
  if(schoolEl && sp.school) schoolEl.value = sp.school;

  modal.classList.add('open');
}


function saveSpellEdit(level, idx) {
  spells[level][idx] = {
    name: document.getElementById('se-name').value,
    school: document.getElementById('se-school').value,
    castTime: document.getElementById('se-cast').value,
    range: document.getElementById('se-range').value,
    duration: document.getElementById('se-duration').value,
    damage: document.getElementById('se-damage').value,
    components: document.getElementById('se-components').value,
    conc: document.getElementById('se-conc').checked,
    ritual: document.getElementById('se-ritual').checked,
    description: document.getElementById('se-desc').value,
    prepared: spells[level][idx]?.prepared||false,
  };
  closeModal('new-char-modal');
  buildSpellsByLevel();
  markDirty();
}

function toggleSpellPrep(level, idx) {
  if(spells[level]&&spells[level][idx]) { spells[level][idx].prepared=!spells[level][idx].prepared; buildSpellsByLevel(); markDirty(); }
}
function deleteSpell(level, idx) {
  spells[level].splice(idx,1); buildSpellsByLevel(); markDirty();
}
function rollSpell(level, idx) {
  const sp = spells[level][idx];
  if(!sp||!sp.damage) { addRollResult('🎲 ' + (sp?.name||'Magia'),'Sem dano definido.'); return; }
  const match = sp.damage.match(/(\d+)d(\d+)([+-]\d+)?/);
  if(match) {
    const [,count,sides,mod] = match;
    const rolls = [];
    let total = 0;
    for(let i=0;i<parseInt(count);i++) { const r=Math.ceil(Math.random()*parseInt(sides)); rolls.push(r); total+=r; }
    if(mod) total += parseInt(mod);
    addRollResult(`✨ ${sp.name}`, `${rolls.join('+')}${mod||''} = <span class="big-number">${total}</span> <span style="color:var(--ink-faded);font-size:0.8rem;">${sp.damage}</span>`);
  } else { addRollResult(`✨ ${sp.name}`, sp.damage); }
  openDicePanel();
}

// ====================================================================
// WEAPONS
// ====================================================================
function addWeapon() {
  weapons.push({name:'',atkBonus:'',damage:'1d6',dmgType:'Cortante'});
  renderWeapons();
}

function renderWeapons() {
  const el = document.getElementById('weapons-list');
  el.innerHTML = '';
  weapons.forEach((w,i) => {
    const row = document.createElement('div');
    row.className = 'weapon-row';
    row.innerHTML = `
      <input class="item-input" value="${w.name||''}" placeholder="Nome da arma..." onchange="weapons[${i}].name=this.value;markDirty();">
      <input class="item-input" value="${w.atkBonus||''}" placeholder="+5" onchange="weapons[${i}].atkBonus=this.value;markDirty();" style="text-align:center;">
      <input class="item-input" value="${w.damage||''}" placeholder="1d8+3" onchange="weapons[${i}].damage=this.value;markDirty();" style="text-align:center;">
      <input class="item-input" value="${w.dmgType||''}" placeholder="Cortante" onchange="weapons[${i}].dmgType=this.value;markDirty();" style="font-size:0.8rem;">
      <button class="weapon-roll-btn" onclick="rollWeapon(${i})">🎲 Atacar</button>
      <button class="del-btn" onclick="deleteWeapon(${i})">✕</button>
    `;
    el.appendChild(row);
  });
}

function rollWeapon(i) {
  const w = weapons[i];
  const atkBonus = parseInt(w.atkBonus)||0;
  let d20 = Math.ceil(Math.random()*20);
  let d20b = rollMode!=='normal'?Math.ceil(Math.random()*20):null;
  let finalD20 = rollMode==='advantage'?Math.max(d20,d20b):rollMode==='disadvantage'?Math.min(d20,d20b):d20;
  const atkTotal = finalD20 + atkBonus;
  const isCrit = finalD20===20;
  const isFail = finalD20===1;
  // Damage
  let dmgResult='';
  const dmgMatch = w.damage.match(/(\d+)d(\d+)([+-]\d+)?/);
  if(dmgMatch) {
    const [,cnt,sides,mod] = dmgMatch;
    const rolls=[]; let total=0;
    const diceCount = isCrit?parseInt(cnt)*2:parseInt(cnt);
    for(let j=0;j<diceCount;j++) { const r=Math.ceil(Math.random()*parseInt(sides)); rolls.push(r); total+=r; }
    if(mod) total+=parseInt(mod);
    dmgResult = `Dano: ${rolls.join('+')}${mod||''} = <span style="color:var(--gold);font-weight:700;">${total}</span> ${w.dmgType||''}`;
    if(isCrit) dmgResult += ' <span style="color:#ff6600;font-weight:700;">💥 CRÍTICO!</span>';
  }
  const rollStr = rollMode==='advantage'?`${d20},<b>${d20b}</b>`:rollMode==='disadvantage'?`<b>${d20}</b>,${d20b}`:`${finalD20}`;
  addRollResult(`⚔ ${w.name||'Arma'}`,
    `Ataque: [${rollStr}]+${atkBonus} = <span class="big-number" style="color:${isCrit?'#ff6600':isFail?'var(--blood)':'var(--parchment)'}">${isFail?'FALHA!':atkTotal}</span><br>${dmgResult}`);
  openDicePanel();
}

function deleteWeapon(i) { weapons.splice(i,1); renderWeapons(); markDirty(); }

// ====================================================================
// ITEMS
// ====================================================================
function addItem() {
  items.push({name:'',qty:1,weight:0});
  renderItems();
}

function renderItems() {
  const el = document.getElementById('items-list');
  el.innerHTML = '';
  items.forEach((it,i) => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <input class="item-input" value="${it.name||''}" placeholder="Nome do item..." onchange="items[${i}].name=this.value;updateTotalWeight();markDirty();">
      <input class="item-input" value="${it.qty||1}" type="number" min="1" onchange="items[${i}].qty=parseInt(this.value);updateTotalWeight();markDirty();" style="text-align:center;">
      <input class="item-input" value="${it.weight||0}" type="number" step="0.5" onchange="items[${i}].weight=parseFloat(this.value);updateTotalWeight();markDirty();" style="text-align:center;">
      <button class="del-btn" onclick="deleteItem(${i})">✕</button>
    `;
    el.appendChild(row);
  });
  updateTotalWeight();
}

function deleteItem(i) { items.splice(i,1); renderItems(); markDirty(); }

function updateTotalWeight() {
  let total = 0;
  items.forEach(it => { total += (parseFloat(it.weight)||0)*(parseInt(it.qty)||1); });
  const el = document.getElementById('total-weight');
  if(el) el.textContent = total.toFixed(1) + ' lb';
  updateCarryCapacity();
}

function updateCarryCapacity() {
  const strScore = getAbilityScore('str');
  const cap = strScore * 15;
  const el = document.getElementById('carry-capacity');
  if(el) el.textContent = cap + ' lb';
}

// ====================================================================
// FEATURES
// ====================================================================
// ====================================================================
// FEAT DATABASE LOADER / MODAL
// ====================================================================
function loadFeatDatabaseIfNeeded(callback) {
  if (Array.isArray(window.FEAT_DATABASE)) {
    callback();
    return;
  }

  const existing = document.querySelector('script[data-arcanum-feat-db="1"]');
  if (existing) {
    existing.addEventListener('load', callback, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.src = 'js/data/feats.js';
  script.dataset.arcanumFeatDb = '1';
  script.onload = callback;
  script.onerror = () => alert('Não foi possível carregar js/data/feats.js');
  document.head.appendChild(script);
}

function normalizeStoredLineBreaks(value) {
  return String(value || '').replace(/\\n/g, '\n');
}

function normalizeFeatDatabaseEntry(entry) {
  const details = [
    entry.category ? `Categoria: ${entry.category}` : '',
    entry.prerequisite ? `Pré-requisito: ${entry.prerequisite}` : '',
    entry.repeatable ? 'Repetível: sim' : 'Repetível: não',
    entry.tags?.length ? `Tags: ${entry.tags.join(', ')}` : ''
  ].filter(Boolean).join('\n');

  return {
    name: entry.namePt || entry.name || 'Talento sem nome',
    description: `${entry.summary || ''}${details ? '\n\n' + details : ''}`,
    databaseId: entry.id || '',
    source: 'Feat Database'
  };
}

function addFeatFromDatabaseById(id) {
  loadFeatDatabaseIfNeeded(() => {
    const db = window.FEAT_DATABASE || [];
    const entry = db.find(feat => feat.id === id);

    if (!entry) {
      alert('Talento não encontrado no banco.');
      return;
    }

    feats.push(normalizeFeatDatabaseEntry(entry));

    closeModal('new-char-modal');
    renderFeatures();
    markDirty();

    if (typeof showDriveStatus === 'function') {
      showDriveStatus('saved', 'Talento adicionado do banco ✓');
    }
  });
}

function showFeatDatabaseModal() {
  loadFeatDatabaseIfNeeded(() => {
    const modal = document.getElementById('new-char-modal');
    if (!modal) return;

    const db = window.FEAT_DATABASE || [];

    modal.querySelector('.modal-box').innerHTML = `
      <div class="modal-title">✦ Banco de Talentos</div>

      <div class="feat-db-controls">
        <input class="field-input" id="feat-db-search" placeholder="Buscar por nome, categoria, tag...">

        <select class="field-select" id="feat-db-category">
          <option value="all">Todas as categorias</option>
          <option value="Origin">Origin</option>
          <option value="General">General</option>
          <option value="Fighting Style">Fighting Style</option>
          <option value="Epic Boon">Epic Boon</option>
        </select>
      </div>

      <div id="feat-db-results" class="feat-db-results"></div>

      <div style="display:flex;gap:0.8rem;margin-top:1rem;">
        <button class="btn-secondary" onclick="closeModal('new-char-modal')">Fechar</button>
      </div>
    `;

    const renderResults = () => {
      const search = (document.getElementById('feat-db-search')?.value || '').trim().toLowerCase();
      const category = document.getElementById('feat-db-category')?.value || 'all';
      const results = document.getElementById('feat-db-results');

      const filtered = db.filter(feat => {
        if (category !== 'all' && feat.category !== category) return false;

        if (search) {
          const haystack = [
            feat.name,
            feat.namePt,
            feat.category,
            feat.prerequisite,
            feat.summary,
            ...(feat.tags || [])
          ].map(v => String(v || '').toLowerCase()).join(' ');

          if (!haystack.includes(search)) return false;
        }

        return true;
      });

      if (!results) return;

      if (filtered.length === 0) {
        results.innerHTML = '<div style="text-align:center;color:var(--ink-faded);font-style:italic;padding:1rem;">Nenhum talento encontrado.</div>';
        return;
      }

      results.innerHTML = filtered.map(feat => `
        <div class="feat-db-card">
          <div>
            <div class="feat-db-name">${escapeSpellText(feat.namePt || feat.name)}</div>
            <div class="feat-db-meta">
              ${escapeSpellText(feat.category || '')}
              ${feat.prerequisite ? ' • ' + escapeSpellText(feat.prerequisite) : ''}
              ${feat.repeatable ? ' • Repetível' : ''}
            </div>
            <div class="feat-db-summary">${escapeSpellText(feat.summary || '')}</div>
            <div class="feat-db-meta">${escapeSpellText((feat.tags || []).join(', '))}</div>
          </div>

          <button class="btn-primary feat-db-add-btn" onclick="addFeatFromDatabaseById('${escapeSpellText(feat.id)}')">Adicionar</button>
        </div>
      `).join('');
    };

    document.getElementById('feat-db-search')?.addEventListener('input', renderResults);
    document.getElementById('feat-db-category')?.addEventListener('change', renderResults);

    renderResults();
    modal.classList.add('open');
  });
}

function setupFeatDatabaseStyles() {
  if (document.getElementById('arcanum-feat-db-styles')) return;

  const style = document.createElement('style');
  style.id = 'arcanum-feat-db-styles';
  style.textContent = `
    .feat-db-controls {
      display: grid;
      grid-template-columns: 1fr 180px;
      gap: 0.55rem;
      margin-bottom: 0.85rem;
    }

    .feat-db-results {
      max-height: 55vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
      padding-right: 0.25rem;
    }

    .feat-db-card {
      background: rgba(255,255,255,0.35);
      border: 1px solid var(--parchment-darker);
      border-radius: 6px;
      padding: 0.7rem;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.75rem;
      align-items: center;
    }

    .feat-db-name {
      font-family: 'Cinzel', serif;
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--ink);
    }

    .feat-db-meta {
      font-size: 0.72rem;
      color: var(--blood);
      font-family: 'Cinzel', serif;
      margin-top: 0.15rem;
    }

    .feat-db-summary {
      font-size: 0.88rem;
      color: var(--ink-light);
      line-height: 1.35;
      margin-top: 0.35rem;
    }

    .feat-db-add-btn {
      white-space: nowrap;
    }

    .feat-bank-btn {
      margin-left: 0.5rem;
    }

    @media (max-width: 700px) {
      .feat-db-controls,
      .feat-db-card {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(style);
}

function addFeature(type) {
  const arr = type==='class'?classFeatures:type==='race'?raceFeatures:otherFeatures;
  arr.push({name:'Nova Habilidade',source:'',description:''});
  renderFeatures();
  markDirty();
}

function addFeat() {
  feats.push({name:'Novo Talento',description:''});
  renderFeatures();
  markDirty();
}

function renderFeatures() {
  setupFeatDatabaseStyles();

  renderFeatureList('class-features-list', classFeatures, 'class');
  renderFeatureList('race-features-list', raceFeatures, 'race');
  renderFeatureList('other-features-list', otherFeatures, 'other');
  renderFeatsList();
  setupFeatDatabaseButton();
}

function setupFeatDatabaseButton() {
  const featsList = document.getElementById('feats-list');
  if (!featsList) return;

  const panel = featsList.closest('.panel') || featsList.parentElement;
  if (!panel || panel.querySelector('#feat-db-open')) return;

  const title = panel.querySelector('.panel-title') || panel.firstElementChild;
  const btn = document.createElement('button');
  btn.id = 'feat-db-open';
  btn.type = 'button';
  btn.className = 'btn-secondary feat-bank-btn';
  btn.textContent = 'Banco de Talentos';
  btn.onclick = showFeatDatabaseModal;

  if (title) {
    title.appendChild(btn);
  } else {
    panel.insertBefore(btn, featsList);
  }
}

function renderFeatureList(elId, arr, type) {
  const el = document.getElementById(elId);
  if(!el) return;
  el.innerHTML = '';
  arr.forEach((f,i) => {
    const div = document.createElement('div');
    div.className = 'feature-item';
    div.innerHTML = `
      <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:3px;">
        <input value="${f.name||''}" onchange="${type}Features[${i}].name=this.value;markDirty();" style="flex:1;background:transparent;border:none;border-bottom:1px solid var(--parchment-darker);font-family:'Cinzel',serif;font-size:0.88rem;font-weight:600;color:var(--ink);outline:none;">
        <input value="${f.source||''}" onchange="${type}Features[${i}].source=this.value;markDirty();" placeholder="Fonte..." style="width:100px;background:transparent;border:none;border-bottom:1px dashed var(--parchment-darker);font-family:'Crimson Text',serif;font-size:0.75rem;color:var(--blood);outline:none;font-style:italic;">
        <button class="del-btn" onclick="${type}Features.splice(${i},1);renderFeatures();">✕</button>
      </div>
      <textarea onchange="${type}Features[${i}].description=normalizeStoredLineBreaks(this.value);this.value=${type}Features[${i}].description;markDirty();" style="width:100%;background:transparent;border:none;font-family:'Crimson Text',serif;font-size:0.88rem;color:var(--ink-light);outline:none;resize:vertical;min-height:48px;line-height:1.5;" placeholder="Descrição da habilidade...">${normalizeStoredLineBreaks(f.description)}</textarea>
    `;
    el.appendChild(div);
  });
}

function renderFeatsList() {
  const el = document.getElementById('feats-list');
  if(!el) return;
  el.innerHTML = '';
  feats.forEach((f,i) => {
    const div = document.createElement('div');
    div.className = 'feature-item';
    div.innerHTML = `
      <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:3px;">
        <input value="${f.name||''}" onchange="feats[${i}].name=this.value;markDirty();" style="flex:1;background:transparent;border:none;border-bottom:1px solid var(--parchment-darker);font-family:'Cinzel',serif;font-size:0.88rem;font-weight:600;color:var(--ink);outline:none;">
        <button class="del-btn" onclick="feats.splice(${i},1);renderFeatures();">✕</button>
      </div>
      <textarea onchange="feats[${i}].description=normalizeStoredLineBreaks(this.value);this.value=feats[${i}].description;markDirty();" style="width:100%;background:transparent;border:none;font-family:'Crimson Text',serif;font-size:0.88rem;color:var(--ink-light);outline:none;resize:vertical;min-height:72px;line-height:1.5;" placeholder="Efeito do talento...">${normalizeStoredLineBreaks(f.description)}</textarea>
    `;
    el.appendChild(div);
  });
}


// Exposição explícita para chamadas inline e futuras integrações.
window.showSpellEditor = showSpellEditor;
window.saveSpellEdit = saveSpellEdit;
window.buildSpellsByLevel = buildSpellsByLevel;
window.setupSpellCardEditStyles = setupSpellCardEditStyles;

window.setupSpellFilters = setupSpellFilters;
window.getSpellFilterState = getSpellFilterState;
window.spellMatchesFilters = spellMatchesFilters;
window.updateSpellFilterResults = updateSpellFilterResults;

window.loadSpellDatabaseIfNeeded = loadSpellDatabaseIfNeeded;
window.showSpellDatabaseModal = showSpellDatabaseModal;
window.addSpellFromDatabaseById = addSpellFromDatabaseById;
window.normalizeSpellDatabaseEntry = normalizeSpellDatabaseEntry;

window.loadFeatDatabaseIfNeeded = loadFeatDatabaseIfNeeded;
window.showFeatDatabaseModal = showFeatDatabaseModal;
window.addFeatFromDatabaseById = addFeatFromDatabaseById;
window.normalizeFeatDatabaseEntry = normalizeFeatDatabaseEntry;
window.setupFeatDatabaseButton = setupFeatDatabaseButton;
window.setupFeatDatabaseStyles = setupFeatDatabaseStyles;

window.normalizeStoredLineBreaks = normalizeStoredLineBreaks;
