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
// JSON BACKUP BUTTONS
// ====================================================================
function setupBackupButtons() {
  const nav = document.getElementById('top-nav');
  if(!nav || document.getElementById('export-json-btn')) return;

  const duplicateBtn = document.createElement('button');
  duplicateBtn.className = 'drive-btn';
  duplicateBtn.id = 'duplicate-char-btn';
  duplicateBtn.type = 'button';
  duplicateBtn.innerHTML = '<span>📄</span> Duplicar';
  duplicateBtn.title = 'Duplicar o personagem atual';
  duplicateBtn.onclick = () => {
    if(typeof duplicateCurrentCharacter === 'function') duplicateCurrentCharacter();
  };

  const exportBtn = document.createElement('button');
  exportBtn.className = 'drive-btn';
  exportBtn.id = 'export-json-btn';
  exportBtn.type = 'button';
  exportBtn.innerHTML = '<span>⬇️</span> Exportar JSON';
  exportBtn.title = 'Exportar JSON: todos os personagens ou apenas o atual';
  exportBtn.onclick = () => {
    if(typeof exportCharactersToJSON === 'function') exportCharactersToJSON();
  };

  const importBtn = document.createElement('button');
  importBtn.className = 'drive-btn';
  importBtn.id = 'import-json-btn';
  importBtn.type = 'button';
  importBtn.innerHTML = '<span>⬆️</span> Importar JSON';
  importBtn.title = 'Importar JSON: substituir, adicionar, mesclar ou escolher personagem';
  importBtn.onclick = () => {
    if(typeof importCharactersFromJSON === 'function') importCharactersFromJSON();
  };

  const saveBtn = document.getElementById('save-btn');
  if(saveBtn && saveBtn.parentNode) {
    saveBtn.parentNode.insertBefore(duplicateBtn, saveBtn);
    saveBtn.parentNode.insertBefore(exportBtn, saveBtn);
    saveBtn.parentNode.insertBefore(importBtn, saveBtn);
  } else {
    nav.appendChild(duplicateBtn);
    nav.appendChild(exportBtn);
    nav.appendChild(importBtn);
  }
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
      if (typeof saveAllToDrive === 'function') saveAllToDrive();
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
window.setupAbilityScoreClickFix = setupAbilityScoreClickFix;
