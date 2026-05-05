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

  const actionButtons = [saveBtn, duplicateBtn, deleteBtn, exportBtn, importBtn];

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

  updateWealthTotal();
  setupBackupButtons();
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
window.createTopActionButton = createTopActionButton;
window.setupAbilityScoreClickFix = setupAbilityScoreClickFix;
