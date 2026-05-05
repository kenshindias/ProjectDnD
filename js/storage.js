// ====================================================================
// STATE
// ====================================================================
let characters = [];
let currentCharIndex = 0;
let rollMode = 'normal';
let diceOpen = false;
let saveTimeout = null;
let skillProfs = {};
let saveProfs = {};
let spells = {}; // {0:[], 1:[], ...}
let weapons = [];
let items = [];
let classFeatures = [];
let raceFeatures = [];
let otherFeatures = [];
let feats = [];
let spellSlots = {}; // {1: {max:2, used:0}, ...}
let deathSuccesses = [false,false,false];
let deathFailures = [false,false,false];
let activeConditions = [];
let rollHistory = [];
let isApplyingData = false;
let isDeletingCharacter = false;

function getMod(score) { return Math.floor(((parseInt(score) || 10) - 10) / 2); }
function getModStr(score) { const m=getMod(score); return (m>=0?'+':'')+m; }
function getProfBonus(level) { return Math.ceil(level/4)+1; }

function getAbilityScore(attr) {
  const map = {str:'str-score',dex:'dex-score',con:'con-score',int:'int-score',wis:'wis-score',cha:'cha-score'};
  return parseInt(document.getElementById(map[attr])?.value)||10;
}
function getAbilityMod(attr) { return Math.floor((getAbilityScore(attr)-10)/2); }
function getLevel() { return parseInt(document.getElementById('char-level')?.value)||1; }
function getPB() { return getProfBonus(getLevel()); }

// ====================================================================
// CHARACTER MANAGEMENT
// ====================================================================
function newCharacter() { document.getElementById('new-char-modal').classList.add('open'); setTimeout(()=>document.getElementById('new-char-name').focus(),300); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function confirmNewChar() {
  const name=document.getElementById('new-char-name').value.trim()||'Novo Herói';
  characters.push({id:Date.now(),name,data:{}});
  currentCharIndex=characters.length-1;
  closeModal('new-char-modal');
  clearSheet();
  document.getElementById('char-name').value=name;
  renderCharTabs();
  saveToLocalStorage();
}

function renderCharTabs() {
  const el=document.getElementById('char-tabs');
  el.innerHTML='';
  characters.forEach((c,i)=>{
    const btn=document.createElement('button');
    btn.className='char-tab'+(i===currentCharIndex?' active':'');
    btn.textContent=c.name||`Personagem ${i+1}`;
    btn.onclick=()=>switchChar(i);
    el.appendChild(btn);
  });
}

function switchChar(idx) {
  saveCurrentChar();
  currentCharIndex=idx;
  loadChar(characters[idx]);
  renderCharTabs();
}

function duplicateCurrentCharacter() {
  saveCurrentChar();

  const current = characters[currentCharIndex];
  if(!current) {
    showDriveStatus('error', 'Nenhum personagem para duplicar');
    return;
  }

  const copy = JSON.parse(JSON.stringify(current));
  const originalName = getCharacterDisplayName(current, currentCharIndex);
  const copyName = `${originalName} (Cópia)`;

  copy.id = Date.now() + Math.floor(Math.random() * 1000);
  copy.name = copyName;
  if(!copy.data) copy.data = {};
  copy.data['char-name'] = copyName;

  characters.push(copy);
  currentCharIndex = characters.length - 1;
  loadChar(copy);
  renderCharTabs();
  saveToLocalStorage();
  showDriveStatus('saved', 'Personagem duplicado ✓');
}

function clearSheet() {
  // Reset all inputs to default
  ['char-name','char-xp','senses-notes','profs-notes','armor-name','resistances-notes','combat-notes','magic-items-notes','treasure-notes','spell-class-name','spell-notes','personality-traits','ideals','bonds','flaws','char-backstory','adventure-log','connections-notes','goals-notes','misc-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  ['char-class','char-subclass','char-race','char-subrace','char-alignment','char-background','shield-equip'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  ['str-score','dex-score','con-score','int-score','wis-score','cha-score'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=10;});
  document.getElementById('char-level').value=1;
  document.getElementById('hp-current').value=10;
  document.getElementById('hp-max').value=10;
  document.getElementById('hp-temp').value='';
  document.getElementById('char-ac').value=10;
  document.getElementById('char-speed').value=30;
  skillProfs={}; saveProfs={}; spells={}; weapons=[{name:'',atkBonus:'',damage:'1d6',dmgType:'Cortante'}]; items=[{name:'',qty:1,weight:0}];
  classFeatures=[]; raceFeatures=[]; otherFeatures=[]; feats=[]; spellSlots={}; deathSuccesses=[false,false,false]; deathFailures=[false,false,false]; activeConditions=[]; rollHistory=[];
  buildSkillsList(); buildSavingThrows(); buildDeathSaves(); buildConditions();
  if(typeof renderRollHistory === 'function') renderRollHistory();
  renderWeapons(); renderItems(); renderFeatures(); buildSpellsByLevel(); buildSpellSlots(); updateAll();
}

// ====================================================================
// SAVE / LOAD
// ====================================================================
function collectData() {
  const data={};
  ['char-name','char-class','char-subclass','char-race','char-subrace','char-level','char-alignment','char-background','char-xp','str-score','dex-score','con-score','int-score','wis-score','cha-score','hp-current','hp-max','hp-temp','char-ac','char-speed','hit-dice-total','hit-dice-type','hit-dice-used','spell-ability','spell-class-name','armor-name','shield-equip','senses-notes','profs-notes','resistances-notes','combat-notes','magic-items-notes','treasure-notes','spell-notes','spell-notes','personality-traits','ideals','bonds','flaws','char-backstory','adventure-log','connections-notes','goals-notes','misc-notes','char-age','char-height','char-weight','char-eyes','char-hair','char-skin','char-marks','allies-notes','faith-notes','char-deity','attune-1','attune-2','attune-3','coin-cp','coin-sp','coin-ep','coin-gp','coin-pp','spells-prepared-current','spells-prepared-max'].forEach(id=>{const el=document.getElementById(id);if(el)data[id]=el.value;});
  data.skillProfs=skillProfs; data.saveProfs=saveProfs; data.spells=spells; data.weapons=weapons; data.items=items;
  data.classFeatures=classFeatures; data.raceFeatures=raceFeatures; data.otherFeatures=otherFeatures; data.feats=feats;
  data.spellSlots=spellSlots; data.deathSuccesses=deathSuccesses; data.deathFailures=deathFailures;
  data.activeConditions = Array.from(document.querySelectorAll('#conditions-area .condition-chip.active')).map(chip => chip.textContent.trim());
  data.rollHistory = Array.isArray(rollHistory) ? rollHistory.slice(0, 20) : [];
  data.inspiration=document.getElementById('inspiration-gem')?.classList.contains('inspired')||false;
  // portrait
  const img=document.getElementById('portrait-img');
  if(img&&img.style.display!=='none') data.portrait=img.src;
  return data;
}

function applyData(data) {
  if(!data) return;

  isApplyingData = true;

  try {
    const savedSubClass = data['char-subclass'] || '';
    const savedSubRace = data['char-subrace'] || '';

    // Primeiro aplica campos independentes.
    // Subclasse e variante/linhagem são aplicadas depois, porque seus selects
    // dependem de classe e espécie já estarem populadas.
    Object.keys(data).forEach(id=>{
      if(id === 'char-subclass' || id === 'char-subrace') return;
      if(typeof data[id]==='string') {
        const el=document.getElementById(id);
        if(el) el.value=data[id];
      }
    });

    // Agora que classe e espécie já foram aplicadas, recria as opções dependentes.
    onClassChange({ shouldMarkDirty: false });
    onRaceChange({ shouldMarkDirty: false });

    // Só depois de recriar as opções é que os valores salvos conseguem permanecer.
    const subClassEl = document.getElementById('char-subclass');
    if(subClassEl && savedSubClass) subClassEl.value = savedSubClass;

    const subRaceEl = document.getElementById('char-subrace');
    if(subRaceEl && savedSubRace) subRaceEl.value = savedSubRace;

    skillProfs=data.skillProfs||{};
    saveProfs=data.saveProfs||{};
    spells=data.spells||{};
    weapons=data.weapons||[];
    items=data.items||[];
    classFeatures=data.classFeatures||[];
    raceFeatures=data.raceFeatures||[];
    otherFeatures=data.otherFeatures||[];
    feats=data.feats||[];
    spellSlots=data.spellSlots||{};
    deathSuccesses=data.deathSuccesses||[false,false,false];
    deathFailures=data.deathFailures||[false,false,false];
    activeConditions = Array.isArray(data.activeConditions) ? data.activeConditions : [];
    rollHistory = Array.isArray(data.rollHistory) ? data.rollHistory.slice(0, 20) : [];

    if(document.getElementById('inspiration-gem')) {
      document.getElementById('inspiration-gem').classList.toggle('inspired', !!data.inspiration);
    }

    if(data.portrait) {
      document.getElementById('portrait-img').src=data.portrait;
      document.getElementById('portrait-img').style.display='block';
      document.getElementById('portrait-placeholder').style.display='none';
    }

    buildSkillsList();
    buildSavingThrows();
    buildDeathSaves();
    buildConditions();
    if(typeof renderRollHistory === 'function') renderRollHistory();
    renderWeapons();
    renderItems();
    renderFeatures();
    buildSpellsByLevel();
    buildSpellSlots();
    updateAll();
    updateClassBadges();
    updateRaceTraits();
    updateClassResource();
  } finally {
    isApplyingData = false;
  }
}

function saveCurrentChar() {
  if (!characters[currentCharIndex]) return;

  const data = collectData();
  characters[currentCharIndex].data = data;

  // Mantém o nome da aba sincronizado com o campo da ficha.
  if (data['char-name']) {
    characters[currentCharIndex].name = data['char-name'];
  }
}

function loadChar(char) {
  clearSheet();
  if(char&&char.data) applyData(char.data);
}

function markDirty() {
  if (typeof isApplyingData !== 'undefined' && isApplyingData) return;
  if (typeof isDeletingCharacter !== 'undefined' && isDeletingCharacter) return;

  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => { saveToLocalStorage(); }, 1500);
}

function saveToLocalStorage() {
  saveCurrentChar();
  try { localStorage.setItem('arcanum_codex_v2', JSON.stringify(characters)); } catch(e) {}
}

function persistCharactersOnly() {
  try { localStorage.setItem('arcanum_codex_v2', JSON.stringify(characters)); } catch(e) {}
}

function saveLocalNow() {
  saveToLocalStorage();
  showDriveStatus('saved', 'Salvo localmente ✓');
}

function loadFromLocalStorage() {
  try {
    const saved=localStorage.getItem('arcanum_codex_v2');
    if(saved) {
      characters=JSON.parse(saved);
      if(characters.length>0) { currentCharIndex=0; loadChar(characters[0]); renderCharTabs(); }
    }
    if(characters.length===0) { characters=[{id:Date.now(),name:'Meu Herói',data:{}}]; renderCharTabs(); }
  } catch(e) { characters=[{id:Date.now(),name:'Meu Herói',data:{}}]; renderCharTabs(); }
}


// ====================================================================
// EXPORT / IMPORT JSON BACKUP
// ====================================================================
const JSON_BACKUP_SCHEMA_VERSION = 2;
const JSON_BACKUP_APP_VERSION = '2M';

function getBackupTimestampParts() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  return {
    iso: now.toISOString(),
    fileStamp: `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`
  };
}

function getCharacterDisplayName(char, fallbackIndex = 0) {
  return char?.name || char?.data?.['char-name'] || `Personagem ${fallbackIndex + 1}`;
}

function sanitizeFileName(value) {
  return String(value || 'personagem')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 60) || 'personagem';
}

function createJSONBackupPayload(selectedCharacters, exportType = 'all') {
  const { iso } = getBackupTimestampParts();
  const safeCharacters = JSON.parse(JSON.stringify(selectedCharacters || []));

  return {
    app: 'Arcanum Codex',
    appVersion: JSON_BACKUP_APP_VERSION,
    schemaVersion: JSON_BACKUP_SCHEMA_VERSION,
    exportType,
    exportedAt: iso,
    characterCount: safeCharacters.length,
    characters: safeCharacters,
    notes: 'Backup gerado pelo Arcanum Codex. Pode ser importado pelo próprio app.'
  };
}

function downloadJSONPayload(payload, fileName) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function getBackupFileName(exportType = 'all', charName = '') {
  const { fileStamp } = getBackupTimestampParts();

  if(exportType === 'current') {
    return `arcanum-codex-personagem_${sanitizeFileName(charName)}_${fileStamp}.json`;
  }

  return `arcanum-codex-backup-todos_${fileStamp}.json`;
}

function createBlankCharacter() {
  const id = Date.now() + Math.floor(Math.random() * 1000);
  const name = 'Novo Personagem';
  return {
    id,
    name,
    data: {
      'char-name': name,
      'char-level': '1',
      'str-score': '10',
      'dex-score': '10',
      'con-score': '10',
      'int-score': '10',
      'wis-score': '10',
      'cha-score': '10',
      'hp-current': '10',
      'hp-max': '10',
      'char-ac': '10',
      'char-speed': '30'
    }
  };
}

function getCurrentCharacterIndexSafe() {
  if (!Array.isArray(characters) || characters.length === 0) return -1;

  // 1) Preferir o índice da aba visualmente ativa, pois ela representa a ficha aberta no topo.
  const activeTab = document.querySelector('#char-tabs .char-tab.active');
  if (activeTab) {
    const tabs = Array.from(document.querySelectorAll('#char-tabs .char-tab:not(.new-tab)'));
    const visualIndex = tabs.indexOf(activeTab);
    if (visualIndex >= 0 && characters[visualIndex]) return visualIndex;
  }

  // 2) Tentar localizar pelo ID da ficha atualmente carregada, caso exista.
  const currentData = collectData ? collectData() : {};
  if (currentData && currentData.id) {
    const idIndex = characters.findIndex(ch => ch && ch.id === currentData.id);
    if (idIndex >= 0) return idIndex;
  }

  // 3) Fallback pelo índice global.
  if (Number.isInteger(currentCharIndex) && currentCharIndex >= 0 && currentCharIndex < characters.length) {
    return currentCharIndex;
  }

  return 0;
}

function deleteCurrentCharacter() {
  if (!Array.isArray(characters) || characters.length === 0) {
    showDriveStatus('error', 'Nenhuma ficha para excluir.');
    return;
  }

  const deleteIndex = getCurrentCharacterIndexSafe();
  if (deleteIndex < 0 || !characters[deleteIndex]) {
    showDriveStatus('error', 'Não foi possível identificar a ficha atual.');
    return;
  }

  const current = characters[deleteIndex] || {};
  const name = current.name || current.data?.['char-name'] || document.getElementById('char-name')?.value || 'Personagem sem nome';

  const confirmed = confirm(
    `Excluir a ficha "${name}"?\n\n` +
    'Essa ação remove a ficha do navegador/localStorage. ' +
    'Se quiser guardar uma cópia, exporte o JSON antes de excluir.'
  );

  if (!confirmed) return;

  clearTimeout(saveTimeout);
  saveTimeout = null;
  isDeletingCharacter = true;
  isApplyingData = true;

  try {
    // Remove a ficha do array, sem coletar os dados atuais da tela.
    characters = characters.filter((_, idx) => idx !== deleteIndex);

    if (characters.length === 0) {
      characters.push(createBlankCharacter());
      currentCharIndex = 0;
    } else {
      // Depois de excluir a ficha 2, por exemplo, abrimos a ficha que ocupou a posição dela.
      currentCharIndex = Math.max(0, Math.min(deleteIndex, characters.length - 1));
    }

    // Salva imediatamente o array já corrigido.
    persistCharactersOnly();

    // MUITO IMPORTANTE:
    // Use loadChar(), não applyData() direto.
    // loadChar() chama clearSheet() antes de applyData(), impedindo que campos
    // da ficha excluída permaneçam na tela e sejam salvos por cima da próxima.
    loadChar(characters[currentCharIndex]);

    renderCharTabs();
    persistCharactersOnly();

    showDriveStatus('saved', 'Ficha excluída ✓');
  } finally {
    isApplyingData = false;
    isDeletingCharacter = false;
    clearTimeout(saveTimeout);
    saveTimeout = null;
  }
}

function exportCurrentCharacterToJSON() {
  saveCurrentChar();

  const current = characters[currentCharIndex];
  if(!current) {
    showDriveStatus('error', 'Nenhum personagem atual');
    return;
  }

  const charName = getCharacterDisplayName(current, currentCharIndex);
  const payload = createJSONBackupPayload([current], 'current');
  downloadJSONPayload(payload, getBackupFileName('current', charName));

  showDriveStatus('saved', 'Personagem atual exportado ✓');
}

function exportCharactersToJSON() {
  const answer = prompt(
    'O que você quer exportar?\n\n' +
    '1 = Todos os personagens\n' +
    '2 = Apenas o personagem atual\n\n' +
    'Digite 1 ou 2:',
    '1'
  );

  if(answer === null) return;

  const selected = String(answer).trim();
  if(selected === '1') return exportAllCharactersToJSON();
  if(selected === '2') return exportCurrentCharacterToJSON();

  showDriveStatus('error', 'Opção de exportação inválida');
}

function importCharactersFromJSON() {
  let input = document.getElementById('json-import-input');

  if(!input) {
    input = document.createElement('input');
    input.type = 'file';
    input.id = 'json-import-input';
    input.accept = 'application/json,.json';
    input.style.display = 'none';
    input.addEventListener('change', handleJSONImport);
    document.body.appendChild(input);
  }

  input.value = '';
  input.click();
}

function normalizeImportedCharacters(parsed) {
  // Formato antigo: array direto de personagens.
  if(Array.isArray(parsed)) return parsed;

  // Formato novo/antigo com envelope.
  if(parsed && Array.isArray(parsed.characters)) return parsed.characters;

  // Formato futuro/simples: um personagem único.
  if(parsed && parsed.data && typeof parsed.data === 'object') return [parsed];

  throw new Error('Arquivo JSON inválido: não encontrei personagens para importar.');
}

function getImportedCharName(char, fallbackIndex) {
  return getCharacterDisplayName(char, fallbackIndex);
}

function cloneImportedCharacter(char, fallbackIndex, suffix = 'importado') {
  const cloned = JSON.parse(JSON.stringify(char || {}));
  const originalName = getImportedCharName(cloned, fallbackIndex);
  cloned.id = Date.now() + fallbackIndex + Math.floor(Math.random() * 1000);
  cloned.name = `${originalName} (${suffix})`;
  if(!cloned.data) cloned.data = {};
  cloned.data['char-name'] = cloned.data['char-name'] || originalName;
  return cloned;
}

function getImportMetadataText(parsed, importedCharacters) {
  if(!parsed || Array.isArray(parsed)) return 'Formato: backup antigo/compatível';

  const lines = [];
  if(parsed.app) lines.push(`App: ${parsed.app}`);
  if(parsed.appVersion) lines.push(`Versão: ${parsed.appVersion}`);
  if(parsed.schemaVersion) lines.push(`Esquema: ${parsed.schemaVersion}`);
  if(parsed.exportType) lines.push(`Tipo: ${parsed.exportType === 'current' ? 'personagem atual' : parsed.exportType}`);
  if(parsed.exportedAt) {
    const date = new Date(parsed.exportedAt);
    lines.push(`Exportado em: ${Number.isNaN(date.getTime()) ? parsed.exportedAt : date.toLocaleString('pt-BR')}`);
  }
  lines.push(`Personagens encontrados: ${importedCharacters.length}`);

  return lines.join('\n');
}

function chooseImportMode(importedCharacters, parsedPayload = null) {
  const preview = importedCharacters
    .slice(0, 8)
    .map((char, i) => `${i + 1}. ${getImportedCharName(char, i)}`)
    .join('\n');

  const extra = importedCharacters.length > 8 ? `\n... e mais ${importedCharacters.length - 8}` : '';
  const metadata = getImportMetadataText(parsedPayload, importedCharacters);

  return prompt(
    `${metadata}\n\n` +
    `Arquivo com ${importedCharacters.length} personagem(ns):\n${preview}${extra}\n\n` +
    `Escolha o modo de importação:\n\n` +
    `1 = Substituir todos os personagens atuais\n` +
    `2 = Adicionar ao final como cópias novas\n` +
    `3 = Mesclar: atualizar personagens com mesmo ID/nome e adicionar os novos\n` +
    `4 = Escolher apenas um personagem para adicionar\n\n` +
    `Digite 1, 2, 3 ou 4:`,
    importedCharacters.length === 1 ? '4' : '2'
  );
}

function replaceAllImportedCharacters(importedCharacters) {
  characters = importedCharacters.map((char, i) => {
    const cloned = JSON.parse(JSON.stringify(char || {}));
    if(!cloned.id) cloned.id = Date.now() + i;
    cloned.name = getImportedCharName(cloned, i);
    if(!cloned.data) cloned.data = {};
    return cloned;
  });
  currentCharIndex = 0;
}

function appendImportedCharacters(importedCharacters) {
  const copies = importedCharacters.map((char, i) => cloneImportedCharacter(char, i));
  characters = characters.concat(copies);
  currentCharIndex = Math.max(0, characters.length - copies.length);
}

function mergeImportedCharacters(importedCharacters) {
  importedCharacters.forEach((imported, i) => {
    const importedName = getImportedCharName(imported, i);
    const existingIndex = characters.findIndex(current => {
      const sameId = imported?.id && current?.id && String(imported.id) === String(current.id);
      const currentName = getImportedCharName(current, i);
      const sameName = importedName && currentName && importedName === currentName;
      return sameId || sameName;
    });

    const cloned = JSON.parse(JSON.stringify(imported || {}));
    if(!cloned.id) cloned.id = Date.now() + i;
    cloned.name = importedName;
    if(!cloned.data) cloned.data = {};

    if(existingIndex >= 0) {
      characters[existingIndex] = cloned;
      currentCharIndex = existingIndex;
    } else {
      characters.push(cloneImportedCharacter(imported, i, 'novo'));
      currentCharIndex = characters.length - 1;
    }
  });
}

function importSingleCharacter(importedCharacters) {
  const list = importedCharacters
    .map((char, i) => `${i + 1}. ${getImportedCharName(char, i)}`)
    .join('\n');

  const answer = prompt(`Qual personagem você quer importar?\n\n${list}\n\nDigite o número:`, '1');
  if(answer === null) return false;

  const index = parseInt(answer, 10) - 1;
  if(Number.isNaN(index) || index < 0 || index >= importedCharacters.length) {
    showDriveStatus('error', 'Número inválido');
    return false;
  }

  characters.push(cloneImportedCharacter(importedCharacters[index], index));
  currentCharIndex = characters.length - 1;
  return true;
}

function finishJSONImport(message) {
  if(characters.length === 0) {
    characters = [{id: Date.now(), name: 'Meu Herói', data: {}}];
    currentCharIndex = 0;
  }

  loadChar(characters[currentCharIndex] || characters[0]);
  renderCharTabs();
  saveToLocalStorage();
  showDriveStatus('saved', message);
}

function handleJSONImport(event) {
  const file = event.target.files && event.target.files[0];
  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const importedCharacters = normalizeImportedCharacters(parsed);

      if(importedCharacters.length === 0) {
        showDriveStatus('error', 'JSON sem personagens');
        return;
      }

      saveCurrentChar();
      const mode = chooseImportMode(importedCharacters, parsed);
      if(mode === null) return;

      const selectedMode = String(mode).trim();

      if(selectedMode === '1') {
        const ok = confirm(`Substituir TODOS os ${characters.length} personagem(ns) atuais por ${importedCharacters.length} personagem(ns) do arquivo?`);
        if(!ok) return;
        replaceAllImportedCharacters(importedCharacters);
        finishJSONImport('Importação substituiu tudo ✓');
        return;
      }

      if(selectedMode === '2') {
        appendImportedCharacters(importedCharacters);
        finishJSONImport('Personagens adicionados ✓');
        return;
      }

      if(selectedMode === '3') {
        const ok = confirm('Mesclar importação? Personagens com mesmo ID ou mesmo nome serão atualizados. Os demais serão adicionados.');
        if(!ok) return;
        mergeImportedCharacters(importedCharacters);
        finishJSONImport('Personagens mesclados ✓');
        return;
      }

      if(selectedMode === '4') {
        const imported = importSingleCharacter(importedCharacters);
        if(!imported) return;
        finishJSONImport('Personagem importado ✓');
        return;
      }

      showDriveStatus('error', 'Modo inválido');
    } catch(err) {
      console.error(err);
      showDriveStatus('error', 'Erro ao importar JSON');
    }
  };

  reader.readAsText(file);
}

// Expor para botões e atalhos.
window.exportCharactersToJSON = exportCharactersToJSON;
window.exportAllCharactersToJSON = exportAllCharactersToJSON;
window.exportCurrentCharacterToJSON = exportCurrentCharacterToJSON;
window.importCharactersFromJSON = importCharactersFromJSON;
window.handleJSONImport = handleJSONImport;
window.saveLocalNow = saveLocalNow;
window.saveToLocalStorage = saveToLocalStorage;
window.persistCharactersOnly = persistCharactersOnly;


// ====================================================================
// LOCAL SAVE COMPATIBILITY
// ====================================================================
// O projeto agora usa localStorage + JSON. Mantemos estes nomes antigos
// para compatibilidade com qualquer onclick/atalho que ainda exista no HTML.
async function saveAllToDrive() {
  saveLocalNow();
}

async function loadFromDrive() {
  showDriveStatus('error', 'Drive desativado. Use Exportar/Importar JSON.');
}


function showDriveStatus(type, msg) {
  const el=document.getElementById('drive-status');
  const txt=document.getElementById('drive-status-text');
  el.className='show '+type;
  txt.textContent=msg;
  clearTimeout(window.driveStatusTimer);
  window.driveStatusTimer=setTimeout(()=>el.className='',type==='error'?4000:2500);
}

window.deleteCurrentCharacter = deleteCurrentCharacter;
window.getCurrentCharacterIndexSafe = getCurrentCharacterIndexSafe;
window.createBlankCharacter = createBlankCharacter;
