// ====================================================================
// NAVIGATION / UI CONTROLS
// ====================================================================
function showSection(section, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));

  const page = document.getElementById('page-' + section);
  if (page) page.classList.add('active');
  if (btn) btn.classList.add('active');

  if (section === 'combat' && typeof renderWeapons === 'function') renderWeapons();
  if (section === 'features' && typeof renderFeatures === 'function') renderFeatures();
}

// ====================================================================
// PORTRAIT
// ====================================================================
function uploadPortrait() {
  const input = document.getElementById('portrait-upload');
  if (input) input.click();
}

function handlePortraitUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = document.getElementById('portrait-img');
    const placeholder = document.getElementById('portrait-placeholder');

    if (img) {
      img.src = ev.target.result;
      img.style.display = 'block';
    }

    if (placeholder) placeholder.style.display = 'none';

    if (typeof markDirty === 'function') markDirty();
  };
  reader.readAsDataURL(file);
}

// ====================================================================
// WEALTH SUMMARY
// ====================================================================
function updateWealthTotal() {
  const cp = parseInt(document.getElementById('coin-cp')?.value) || 0;
  const sp = parseInt(document.getElementById('coin-sp')?.value) || 0;
  const ep = parseInt(document.getElementById('coin-ep')?.value) || 0;
  const gp = parseInt(document.getElementById('coin-gp')?.value) || 0;
  const pp = parseInt(document.getElementById('coin-pp')?.value) || 0;

  const totalGp = (cp / 100) + (sp / 10) + (ep / 2) + gp + (pp * 10);
  const el = document.getElementById('total-wealth');
  if (el) el.textContent = `Total: ${totalGp.toFixed(1)} PO equivalente`;
}

// ====================================================================
// TOP ACTION BUTTONS
// ====================================================================
function createTopActionButton({ id, icon, label, title, onClick }) {
  let btn = document.getElementById(id);

  if (!btn) {
    btn = document.createElement('button');
    btn.id = id;
    btn.type = 'button';
  }

  btn.className = 'drive-btn top-action-btn';
  btn.innerHTML = `<span>${icon}</span> ${label}`;
  btn.title = title;
  btn.onclick = onClick;

  return btn;
}

function setupBackupButtons() {
  const nav = document.getElementById('top-nav');
  if (!nav) return;

  const saveBtn = document.getElementById('save-btn') || createTopActionButton({
    id: 'save-btn',
    icon: '💾',
    label: 'Salvar Local',
    title: 'Salvar agora no navegador',
    onClick: () => {}
  });

  saveBtn.className = 'drive-btn top-action-btn primary-action';
  saveBtn.type = 'button';
  saveBtn.innerHTML = '<span>💾</span> Salvar Local';
  saveBtn.title = 'Salvar agora no navegador/localStorage';
  saveBtn.onclick = () => {
    if (typeof saveLocalNow === 'function') saveLocalNow();
    else if (typeof saveToLocalStorage === 'function') saveToLocalStorage();
  };

  const duplicateBtn = createTopActionButton({
    id: 'duplicate-char-btn',
    icon: '📄',
    label: 'Duplicar',
    title: 'Duplicar o personagem atual',
    onClick: () => {
      if (typeof duplicateCurrentCharacter === 'function') duplicateCurrentCharacter();
    }
  });

  const archiveBtn = createTopActionButton({
    id: 'archive-char-btn',
    icon: '📦',
    label: 'Arquivar',
    title: 'Arquivar ou reativar a ficha atual',
    onClick: () => {
      if (typeof toggleArchiveCurrentCharacter === 'function') toggleArchiveCurrentCharacter();
    }
  });

  const deleteBtn = createTopActionButton({
    id: 'delete-char-btn',
    icon: '🗑️',
    label: 'Excluir',
    title: 'Excluir o personagem atual',
    onClick: () => {
      if (typeof deleteCurrentCharacter === 'function') deleteCurrentCharacter();
    }
  });

  const exportBtn = createTopActionButton({
    id: 'export-json-btn',
    icon: '⬇️',
    label: 'Exportar',
    title: 'Exportar JSON: todos os personagens ou apenas o atual',
    onClick: () => {
      if (typeof exportCharactersToJSON === 'function') exportCharactersToJSON();
    }
  });

  const importBtn = createTopActionButton({
    id: 'import-json-btn',
    icon: '⬆️',
    label: 'Importar',
    title: 'Importar JSON: substituir, adicionar, mesclar ou escolher personagem',
    onClick: () => {
      if (typeof importCharactersFromJSON === 'function') importCharactersFromJSON();
    }
  });

  const printBtn = createTopActionButton({
    id: 'print-sheet-btn',
    icon: '🖨️',
    label: 'Imprimir',
    title: 'Imprimir ou salvar a ficha atual em PDF pelo navegador',
    onClick: () => {
      if (typeof printCurrentSheet === 'function') printCurrentSheet();
    }
  });

  const actionButtons = [saveBtn, duplicateBtn, archiveBtn, deleteBtn, exportBtn, importBtn, printBtn];

  actionButtons.forEach(btn => {
    if (btn.parentNode !== nav) nav.appendChild(btn);
  });

  const referenceNode = nav.querySelector('.nav-chars')?.nextSibling || null;
  actionButtons.forEach(btn => nav.insertBefore(btn, referenceNode));

  // Remove qualquer rótulo antigo/confuso de Drive caso tenha ficado no HTML.
  const legacyDriveText = Array.from(nav.querySelectorAll('button')).find(btn => {
    return btn.id !== 'save-btn' && btn.textContent.trim().toLowerCase() === 'drive';
  });
  if (legacyDriveText) legacyDriveText.remove();
}

// ====================================================================
// ARCHIVE / REACTIVATE
// ====================================================================
function setupArchiveButtonStyles() {
  if (document.getElementById('arcanum-archive-button-styles')) return;

  const style = document.createElement('style');
  style.id = 'arcanum-archive-button-styles';
  style.textContent = `
    #archive-char-btn {
      border-color: rgba(166, 132, 54, 0.65);
      color: var(--gold);
      background: rgba(201,162,39,0.08);
    }

    #archive-char-btn:hover {
      border-color: var(--gold);
      background: rgba(201,162,39,0.18);
    }

    #archive-char-btn.is-archived {
      border-color: rgba(93, 170, 93, 0.55);
      color: #7fcf7f;
      background: rgba(93, 170, 93, 0.10);
    }

    #archive-char-btn.is-archived:hover {
      background: rgba(93, 170, 93, 0.20);
    }
  `;

  document.head.appendChild(style);
}

function updateArchiveButtonLabel() {
  const btn = document.getElementById('archive-char-btn');
  if (!btn) return;

  const status = document.getElementById('char-status')?.value || '';
  const isArchived = status === 'Arquivado';

  btn.classList.toggle('is-archived', isArchived);
  btn.innerHTML = isArchived ? '<span>♻️</span> Reativar' : '<span>📦</span> Arquivar';
  btn.title = isArchived ? 'Reativar esta ficha' : 'Arquivar esta ficha';
}

// ====================================================================
// PRINT / PDF
// ====================================================================
function setupPrintStyles() {
  if (document.getElementById('arcanum-print-styles')) return;

  const style = document.createElement('style');
  style.id = 'arcanum-print-styles';
  style.textContent = `
    @media print {
      @page {
        size: A4;
        margin: 12mm;
      }

      html,
      body {
        background: #fff !important;
        color: #000 !important;
      }

      body::before,
      body::after,
      #title-screen,
      #top-nav,
      #section-tabs,
      #drive-status,
      #dice-roller-panel,
      #new-char-modal,
      #character-filter-bar,
      .modal-overlay,
      .top-action-btn,
      .char-tab,
      .drive-btn,
      .add-row-btn,
      .del-btn,
      .weapon-roll-btn,
      .spell-roll-btn,
      .btn-primary,
      .btn-secondary {
        display: none !important;
      }

      #app {
        display: block !important;
      }

      .page {
        padding: 0 !important;
        max-width: none !important;
        margin: 0 !important;
      }

      body.print-current .page {
        display: none !important;
      }

      body.print-current .page.active {
        display: block !important;
      }

      body.print-complete .page {
        display: block !important;
        break-after: page;
        page-break-after: always;
      }

      body.print-complete .page:last-child {
        break-after: auto;
        page-break-after: auto;
      }

      body.print-summary #app,
      body.print-summary .page,
      body.print-summary #section-tabs {
        display: none !important;
      }

      body.print-summary #print-summary-sheet {
        display: block !important;
      }

      #print-summary-sheet {
        display: none;
      }

      .print-summary-page {
        font-family: Georgia, 'Times New Roman', serif;
        color: #000;
      }

      .print-summary-header {
        border-bottom: 2px solid #000;
        padding-bottom: 8px;
        margin-bottom: 12px;
      }

      .print-summary-title {
        font-size: 24px;
        font-weight: 700;
        margin: 0;
      }

      .print-summary-subtitle {
        font-size: 12px;
        margin-top: 4px;
      }

      .print-summary-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }

      .print-summary-card {
        border: 1px solid #999;
        padding: 8px;
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .print-summary-card h2 {
        font-size: 13px;
        margin: 0 0 6px;
        text-transform: uppercase;
        border-bottom: 1px solid #ccc;
        padding-bottom: 3px;
      }

      .print-summary-row {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 11px;
        border-bottom: 1px dotted #ddd;
        padding: 2px 0;
      }

      .print-summary-row strong {
        font-weight: 700;
      }

      .print-summary-abilities {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 5px;
      }

      .print-ability-box {
        border: 1px solid #999;
        text-align: center;
        padding: 5px 2px;
      }

      .print-ability-box .label {
        font-size: 9px;
        font-weight: 700;
      }

      .print-ability-box .score {
        font-size: 16px;
        font-weight: 700;
      }

      .print-ability-box .mod {
        font-size: 12px;
      }

      .parchment,
      .panel {
        background: #fff !important;
        color: #000 !important;
        border: 1px solid #999 !important;
        box-shadow: none !important;
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .parchment::before {
        display: none !important;
      }

      .grid-3,
      .grid-2,
      .grid-4 {
        gap: 8px !important;
      }

      .panel {
        margin-bottom: 8px !important;
        padding: 10px !important;
      }

      .panel-title,
      .field-label,
      .combat-stat-label,
      .passive-label,
      .ability-label {
        color: #000 !important;
      }

      input,
      select,
      textarea,
      .field-input,
      .field-select,
      .field-textarea,
      .notes-area,
      .trait-text,
      .item-input {
        color: #000 !important;
        background: transparent !important;
        border-color: #777 !important;
      }

      .hp-bar-container,
      .hp-bar,
      .inspiration-gem,
      .condition-chip,
      .skill-prof,
      .save-prof,
      .save-dot,
      .spell-slot,
      .spell-prep {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }

      .portrait-area {
        max-height: 260px !important;
        break-inside: avoid;
      }

      a {
        color: #000 !important;
        text-decoration: none !important;
      }
    }
  `;

  document.head.appendChild(style);
}

function getPrintValue(id, fallback = '') {
  const el = document.getElementById(id);
  if (!el) return fallback;

  if ('value' in el) return el.value || fallback;

  return el.textContent?.trim() || fallback;
}

function getPrintModifier(attr) {
  const el = document.getElementById(`${attr}-mod`);
  return el?.textContent?.trim() || '+0';
}

function getSelectedText(id, fallback = '') {
  const el = document.getElementById(id);
  if (!el) return fallback;

  if (el.tagName === 'SELECT') {
    return el.options[el.selectedIndex]?.textContent || fallback;
  }

  return el.value || fallback;
}

function buildPrintSummarySheet() {
  let sheet = document.getElementById('print-summary-sheet');

  if (!sheet) {
    sheet = document.createElement('section');
    sheet.id = 'print-summary-sheet';
    document.body.appendChild(sheet);
  }

  const name = getPrintValue('char-name', 'Personagem sem nome');
  const cls = getSelectedText('char-class', '—');
  const subclass = getSelectedText('char-subclass', '');
  const race = getSelectedText('char-race', '—');
  const subrace = getSelectedText('char-subrace', '');
  const level = getPrintValue('char-level', '1');
  const campaign = getPrintValue('char-campaign', '—');
  const status = getSelectedText('char-status', '—');
  const dm = getPrintValue('char-dm', '—');
  const party = getPrintValue('char-party', '—');

  const hp = `${getPrintValue('hp-current', '0')} / ${getPrintValue('hp-max', '0')}`;
  const ac = getPrintValue('char-ac', '10');
  const initiative = document.getElementById('initiative-display')?.textContent?.trim() || '+0';
  const speed = getPrintValue('char-speed', '30');
  const pb = document.getElementById('prof-bonus-display')?.textContent?.trim() || '+2';
  const passive = document.getElementById('passive-perception')?.textContent?.trim() || '10';

  const abilities = [
    ['FOR', 'str'], ['DES', 'dex'], ['CON', 'con'],
    ['INT', 'int'], ['SAB', 'wis'], ['CAR', 'cha']
  ];

  const abilityHTML = abilities.map(([label, attr]) => `
    <div class="print-ability-box">
      <div class="label">${label}</div>
      <div class="score">${getPrintValue(`${attr}-score`, '10')}</div>
      <div class="mod">${getPrintModifier(attr)}</div>
    </div>
  `).join('');

  const activeConditions = Array.from(document.querySelectorAll('#conditions-area .condition-chip.active'))
    .map(chip => chip.textContent.trim())
    .join(', ') || 'Nenhuma';

  const weaponRows = Array.isArray(window.weapons || weapons)
    ? (window.weapons || weapons).slice(0, 6).map(w => `
      <div class="print-summary-row">
        <span>${w.name || 'Arma'}</span>
        <strong>${w.atkBonus || '—'} / ${w.damage || '—'} ${w.dmgType || ''}</strong>
      </div>
    `).join('')
    : '';

  const notes = getPrintValue('combat-notes', '') || getPrintValue('misc-notes', '') || '—';

  sheet.innerHTML = `
    <div class="print-summary-page">
      <div class="print-summary-header">
        <h1 class="print-summary-title">${name}</h1>
        <div class="print-summary-subtitle">
          ${cls}${subclass ? ` — ${subclass}` : ''} • ${race}${subrace ? ` — ${subrace}` : ''} • Nível ${level}
        </div>
      </div>

      <div class="print-summary-grid">
        <div class="print-summary-card">
          <h2>Identidade</h2>
          <div class="print-summary-row"><span>Campanha</span><strong>${campaign}</strong></div>
          <div class="print-summary-row"><span>Status</span><strong>${status}</strong></div>
          <div class="print-summary-row"><span>Mestre</span><strong>${dm}</strong></div>
          <div class="print-summary-row"><span>Grupo</span><strong>${party}</strong></div>
        </div>

        <div class="print-summary-card">
          <h2>Combate</h2>
          <div class="print-summary-row"><span>PV</span><strong>${hp}</strong></div>
          <div class="print-summary-row"><span>CA</span><strong>${ac}</strong></div>
          <div class="print-summary-row"><span>Iniciativa</span><strong>${initiative}</strong></div>
          <div class="print-summary-row"><span>Deslocamento</span><strong>${speed}</strong></div>
          <div class="print-summary-row"><span>Proficiência</span><strong>${pb}</strong></div>
          <div class="print-summary-row"><span>Percepção Passiva</span><strong>${passive}</strong></div>
        </div>

        <div class="print-summary-card" style="grid-column: span 2;">
          <h2>Atributos</h2>
          <div class="print-summary-abilities">${abilityHTML}</div>
        </div>

        <div class="print-summary-card">
          <h2>Condições</h2>
          <div class="print-summary-row"><span>Ativas</span><strong>${activeConditions}</strong></div>
        </div>

        <div class="print-summary-card">
          <h2>Armas principais</h2>
          ${weaponRows || '<div class="print-summary-row"><span>Nenhuma arma registrada</span><strong>—</strong></div>'}
        </div>

        <div class="print-summary-card" style="grid-column: span 2;">
          <h2>Notas rápidas</h2>
          <div style="font-size:11px;white-space:pre-wrap;">${notes}</div>
        </div>
      </div>
    </div>
  `;
}

function clearPrintMode() {
  document.body.classList.remove('print-current', 'print-summary', 'print-complete');
}

function printCurrentSheet() {
  if (typeof saveLocalNow === 'function') saveLocalNow();
  else if (typeof saveToLocalStorage === 'function') saveToLocalStorage();

  setupPrintStyles();

  const answer = prompt(
    'O que você quer imprimir?\\n\\n' +
    '1 = Aba atual\\n' +
    '2 = Ficha resumida\\n' +
    '3 = Ficha completa\\n\\n' +
    'Digite 1, 2 ou 3:',
    '1'
  );

  if (answer === null) return;

  const selected = String(answer).trim();

  clearPrintMode();

  if (selected === '1') {
    document.body.classList.add('print-current');
  } else if (selected === '2') {
    buildPrintSummarySheet();
    document.body.classList.add('print-summary');
  } else if (selected === '3') {
    document.body.classList.add('print-complete');
  } else {
    alert('Opção de impressão inválida.');
    return;
  }

  const currentName = document.getElementById('char-name')?.value || 'Ficha';
  document.title = `Arcanum Codex — ${currentName}`;

  const cleanup = () => {
    clearPrintMode();
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);

  setTimeout(() => {
    window.print();
  }, 50);
}


// ====================================================================
// CHARACTER FILTERS
// ====================================================================
window.characterFilters = window.characterFilters || {
  search: '',
  campaign: '',
  status: '',
  sort: 'manual'
};

function setupCharacterFilterSortStyles() {
  if (document.getElementById('arcanum-character-sort-styles')) return;

  const style = document.createElement('style');
  style.id = 'arcanum-character-sort-styles';
  style.textContent = `
    #character-filter-bar {
      grid-template-columns: minmax(160px, 1.4fr) minmax(140px, 1fr) minmax(120px, 0.8fr) minmax(145px, 0.9fr) auto;
    }

    @media (max-width: 1080px) {
      #character-filter-bar {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      #clear-character-filters-btn {
        grid-column: span 2;
      }
    }

    @media (max-width: 560px) {
      #character-filter-bar {
        grid-template-columns: 1fr;
      }

      #clear-character-filters-btn {
        grid-column: auto;
      }
    }
  `;

  document.head.appendChild(style);
}

function setupCharacterFilters() {
  const topNav = document.getElementById('top-nav');
  if (!topNav) return;

  let bar = document.getElementById('character-filter-bar');

  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'character-filter-bar';
    bar.innerHTML = `
      <div class="filter-group filter-search-group">
        <label>Buscar</label>
        <input id="filter-character-search" type="search" placeholder="Nome da ficha...">
      </div>

      <div class="filter-group">
        <label>Campanha</label>
        <input id="filter-character-campaign" type="search" placeholder="Todas">
      </div>

      <div class="filter-group">
        <label>Status</label>
        <select id="filter-character-status">
          <option value="">Todos</option>
          <option value="Ativo">Ativo</option>
          <option value="Reserva">Reserva</option>
          <option value="Arquivado">Arquivado</option>
          <option value="Morto">Morto</option>
          <option value="NPC">NPC</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Ordenar</label>
        <select id="filter-character-sort">
          <option value="manual">Manual</option>
          <option value="name-asc">Nome A-Z</option>
          <option value="name-desc">Nome Z-A</option>
          <option value="campaign">Campanha</option>
          <option value="status">Status</option>
          <option value="level-desc">Nível maior</option>
          <option value="level-asc">Nível menor</option>
          <option value="class">Classe</option>
        </select>
      </div>

      <button id="clear-character-filters-btn" type="button" title="Limpar filtros">Limpar</button>
    `;

    topNav.insertAdjacentElement('afterend', bar);
  }

  const searchInput = document.getElementById('filter-character-search');
  const campaignInput = document.getElementById('filter-character-campaign');
  const statusSelect = document.getElementById('filter-character-status');
  const sortSelect = document.getElementById('filter-character-sort');
  const clearBtn = document.getElementById('clear-character-filters-btn');

  const applyFilters = () => {
    window.characterFilters = {
      search: searchInput?.value || '',
      campaign: campaignInput?.value || '',
      status: statusSelect?.value || '',
      sort: sortSelect?.value || 'manual'
    };

    if (typeof renderCharTabs === 'function') renderCharTabs();
  };

  searchInput?.addEventListener('input', applyFilters);
  campaignInput?.addEventListener('input', applyFilters);
  statusSelect?.addEventListener('change', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);

  clearBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (campaignInput) campaignInput.value = '';
    if (statusSelect) statusSelect.value = '';
    if (sortSelect) sortSelect.value = 'manual';

    window.characterFilters = {
      search: '',
      campaign: '',
      status: '',
      sort: 'manual'
    };

    if (typeof renderCharTabs === 'function') renderCharTabs();
  });
}

function setupAbilityScoreClickFix() {
  document.querySelectorAll('.ability-score').forEach(input => {
    if(input.dataset.stopRollBound === '1') return;
    input.dataset.stopRollBound = '1';

    input.addEventListener('click', event => event.stopPropagation());
    input.addEventListener('mousedown', event => event.stopPropagation());
    input.addEventListener('mouseup', event => event.stopPropagation());
    input.addEventListener('pointerdown', event => event.stopPropagation());
  });
}

function initUI() {
  ['coin-cp', 'coin-sp', 'coin-ep', 'coin-gp', 'coin-pp'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.removeEventListener('input', updateWealthTotal);
    el.removeEventListener('change', updateWealthTotal);

    el.addEventListener('input', () => {
      updateWealthTotal();
      if (typeof markDirty === 'function') markDirty();
    });

    el.addEventListener('change', () => {
      updateWealthTotal();
      if (typeof markDirty === 'function') markDirty();
    });
  });

  const statusEl = document.getElementById('char-status');
  if (statusEl && statusEl.dataset.archiveLabelBound !== '1') {
    statusEl.dataset.archiveLabelBound = '1';
    statusEl.addEventListener('change', () => {
      updateArchiveButtonLabel();
      if (typeof renderCharTabs === 'function') renderCharTabs();
    });
  }

  updateWealthTotal();
  setupBackupButtons();
  setupArchiveButtonStyles();
  updateArchiveButtonLabel();
  setupCharacterFilterSortStyles();
  setupCharacterFilters();
  setupPrintStyles();
  setupAbilityScoreClickFix();
}

// ====================================================================
// KEYBOARD SHORTCUTS
// ====================================================================
if (!window.__ARCANUM_UI_SHORTCUTS_BOUND__) {
  window.__ARCANUM_UI_SHORTCUTS_BOUND__ = true;

  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      if (typeof saveLocalNow === 'function') saveLocalNow();
      else if (typeof saveToLocalStorage === 'function') saveToLocalStorage();
    }

    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      if (typeof exportCharactersToJSON === 'function') exportCharactersToJSON();
    }

    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      if (typeof importCharactersFromJSON === 'function') importCharactersFromJSON();
    }

    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });
}

// Expor explicitamente para os onclick="..." do HTML.
window.showSection = showSection;
window.uploadPortrait = uploadPortrait;
window.handlePortraitUpload = handlePortraitUpload;
window.updateWealthTotal = updateWealthTotal;
window.initUI = initUI;
window.setupBackupButtons = setupBackupButtons;
window.setupCharacterFilters = setupCharacterFilters;
window.setupCharacterFilterSortStyles = setupCharacterFilterSortStyles;
window.setupArchiveButtonStyles = setupArchiveButtonStyles;
window.updateArchiveButtonLabel = updateArchiveButtonLabel;
window.setupPrintStyles = setupPrintStyles;
window.printCurrentSheet = printCurrentSheet;
window.createTopActionButton = createTopActionButton;
window.setupAbilityScoreClickFix = setupAbilityScoreClickFix;
