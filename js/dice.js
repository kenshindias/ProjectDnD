// ====================================================================
// DICE ROLLER
// ====================================================================
function toggleDicePanel() { diceOpen=!diceOpen; document.getElementById('dice-panel').classList.toggle('open',diceOpen); }
function openDicePanel() { diceOpen=true; document.getElementById('dice-panel').classList.add('open'); }

function setRollMode(mode) {
  rollMode = mode;
  document.getElementById('adv-btn').classList.toggle('active',mode==='advantage');
  document.getElementById('normal-btn').classList.toggle('active',mode==='normal');
  document.getElementById('dis-btn').classList.toggle('active',mode==='disadvantage');
}

function rollSingleDie(sides) {
  return Math.ceil(Math.random() * sides);
}

function rollDiceExpression(count, sides, mod = 0) {
  const rolls = [];
  let subtotal = 0;

  for (let i = 0; i < count; i++) {
    const roll = rollSingleDie(sides);
    rolls.push(roll);
    subtotal += roll;
  }

  return {
    rolls,
    subtotal,
    mod,
    total: subtotal + mod,
  };
}

function formatModifier(mod) {
  if (!mod) return '';
  return `${mod >= 0 ? '+' : ''}${mod}`;
}

function formatRollDetails(result) {
  return `${result.rolls.join('+')}${formatModifier(result.mod)}`;
}

function chooseRollResult(first, second) {
  if (rollMode === 'advantage') {
    return first.total >= second.total ? first : second;
  }

  if (rollMode === 'disadvantage') {
    return first.total <= second.total ? first : second;
  }

  return first;
}

function rollDie(sides) {
  const count = parseInt(document.getElementById('dice-count').value) || 1;
  const mod = parseInt(document.getElementById('dice-modifier').value) || 0;
  const fab = document.getElementById('dice-fab');
  fab.classList.add('rolling');
  setTimeout(() => fab.classList.remove('rolling'), 600);

  const label = `${count}d${sides}${formatModifier(mod)}`;

  if (rollMode !== 'normal') {
    const first = rollDiceExpression(count, sides, mod);
    const second = rollDiceExpression(count, sides, mod);
    const chosen = chooseRollResult(first, second);
    const modeStr = rollMode === 'advantage' ? 'Vantagem' : 'Desvantagem';

    addRollResult(
      `🎲 ${label} (${modeStr})`,
      `[${formatRollDetails(first)} = ${first.total}] vs [${formatRollDetails(second)} = ${second.total}] → <span class="big-number">${chosen.total}</span>`
    );
  } else {
    const result = rollDiceExpression(count, sides, mod);
    addRollResult(
      `🎲 ${label}`,
      count === 1 && !mod
        ? `<span class="big-number">${result.total}</span>`
        : `${formatRollDetails(result)} = <span class="big-number">${result.total}</span>`
    );
  }
}

function rollCustom() {
  const count = parseInt(document.getElementById('dice-count').value) || 1;
  const mod = parseInt(document.getElementById('dice-modifier').value) || 0;
  const sides = parseInt(prompt('Quantas faces?', '6'));
  if (!sides || sides < 2) return;

  const label = `${count}d${sides}${formatModifier(mod)}`;

  if (rollMode !== 'normal') {
    const first = rollDiceExpression(count, sides, mod);
    const second = rollDiceExpression(count, sides, mod);
    const chosen = chooseRollResult(first, second);
    const modeStr = rollMode === 'advantage' ? 'Vantagem' : 'Desvantagem';

    addRollResult(
      `🎲 ${label} (${modeStr})`,
      `[${formatRollDetails(first)} = ${first.total}] vs [${formatRollDetails(second)} = ${second.total}] → <span class="big-number">${chosen.total}</span>`
    );
  } else {
    const result = rollDiceExpression(count, sides, mod);
    addRollResult(
      `🎲 ${label}`,
      `${formatRollDetails(result)} = <span class="big-number">${result.total}</span>`
    );
  }
}

function rollD20WithMode(mod = 0) {
  const r1 = rollSingleDie(20);

  if (rollMode === 'normal') {
    return {
      finalRoll: r1,
      detail: `[${r1}]`,
      total: r1 + mod,
    };
  }

  const r2 = rollSingleDie(20);
  const finalRoll = rollMode === 'advantage' ? Math.max(r1, r2) : Math.min(r1, r2);

  return {
    finalRoll,
    detail: `[${r1}, ${r2}] → ${finalRoll}`,
    total: finalRoll + mod,
  };
}

function rollAbility(name, attr) {
  const mod = getAbilityMod(attr);
  const result = rollD20WithMode(mod);
  addRollResult(`🎲 Teste de ${name}`, `${result.detail}${mod >= 0 ? '+' : ''}${mod} = <span class="big-number">${result.total}</span>`);
  openDicePanel();
}

function rollSave(attr, name) {
  const mod = getAbilityMod(attr) + (saveProfs[attr] ? getPB() : 0);
  const result = rollD20WithMode(mod);
  addRollResult(`🛡 TR de ${name}`, `${result.detail}${mod >= 0 ? '+' : ''}${mod} = <span class="big-number">${result.total}</span>`);
  openDicePanel();
}

function renderRollHistory() {
  const el = document.getElementById('dice-results');
  if (!el) return;

  el.innerHTML = '';

  if (!Array.isArray(rollHistory) || rollHistory.length === 0) {
    el.innerHTML = '<div class="dice-empty-state" style="color:var(--parchment-dark);font-style:italic;font-size:0.85rem;text-align:center;padding:1rem;">Clique em um dado para rolar...</div>';
    return;
  }

  rollHistory.slice(0, 20).forEach(entry => {
    const div = document.createElement('div');
    div.className = 'roll-entry';

    let timeLabel = '';
    if (entry.createdAt) {
      const d = new Date(entry.createdAt);
      if (!Number.isNaN(d.getTime())) {
        timeLabel = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      }
    }

    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:0.5rem;align-items:center;">
        <span style="color:var(--gold-dark);font-size:0.75rem;">${entry.title || 'Rolagem'}</span>
        <span style="color:var(--ink-faded);font-size:0.68rem;font-family:'Cinzel',serif;">${timeLabel}</span>
      </div>
      <div>${entry.result || ''}</div>
    `;
    el.appendChild(div);
  });
}

function clearRollHistory() {
  if (!confirm('Limpar o histórico de rolagens deste personagem?')) return;
  rollHistory = [];
  renderRollHistory();
  markDirty();
}

function addRollResult(title, result) {
  if (!Array.isArray(rollHistory)) rollHistory = [];

  rollHistory.unshift({
    title,
    result,
    createdAt: new Date().toISOString()
  });

  rollHistory = rollHistory.slice(0, 20);
  renderRollHistory();
  markDirty();
}
