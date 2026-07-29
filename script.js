(function () {
  // ---------- SCENE 0: date lock ----------
  const gate = document.getElementById('gate');
  const stage = document.getElementById('stage');
  const gateDay = document.getElementById('gateDay');
  const gateMonth = document.getElementById('gateMonth');
  const gateYear = document.getElementById('gateYear');
  const gateBtn = document.getElementById('gateBtn');
  const gateMsg = document.getElementById('gateMsg');
  const gateCard = gate ? gate.querySelector('.gate-card') : null;

  // The correct anniversary date
  const ANNIV_DAY = 27;
  const ANNIV_MONTH = 12; // December
  const ANNIV_YEAR = 2024;

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function fillSelect(el, count, startAt, formatter, placeholderText) {
    if (!el) return;
    const frag = document.createDocumentFragment();
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = placeholderText || 'Select';
    placeholder.disabled = true;
    placeholder.selected = true;
    frag.appendChild(placeholder);
    for (let i = 0; i < count; i++) {
      const val = startAt + i;
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = formatter ? formatter(val) : val;
      frag.appendChild(opt);
    }
    el.appendChild(frag);
  }

  if (gate) {
    fillSelect(gateDay, 31, 1, null, 'Day');
    MONTHS.forEach((name, i) => {
      const opt = document.createElement('option');
      opt.value = i + 1;
      opt.textContent = name;
      gateMonth.appendChild(opt);
    });
    gateMonth.insertBefore((() => {
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Month';
      placeholder.disabled = true;
      placeholder.selected = true;
      return placeholder;
    })(), gateMonth.firstChild);
    const thisYear = new Date().getFullYear();
    fillSelect(gateYear, (thisYear - 2015) + 1, 2015, null, 'Year');

    function checkUnlock() {
      const d = parseInt(gateDay.value, 10);
      const m = parseInt(gateMonth.value, 10);
      const y = parseInt(gateYear.value, 10);

      if (!d || !m || !y) {
        gateMsg.textContent = 'pick a day, month, and year first';
        return;
      }

      if (d === ANNIV_DAY && m === ANNIV_MONTH && y === ANNIV_YEAR) {
        gateMsg.textContent = 'that\u2019s the one \u2014 opening now\u2026';
        gate.classList.add('hidden');
        stage.classList.remove('hidden');
      } else {
        gateMsg.textContent = 'not quite \u2014 try again';
        if (gateCard) {
          gateCard.classList.remove('shake');
          // force reflow so the animation can retrigger
          void gateCard.offsetWidth;
          gateCard.classList.add('shake');
        }
      }
    }

    gateBtn.addEventListener('click', checkUnlock);
  }

  const envelope = document.getElementById('envelope');
  const seal = document.getElementById('seal');
  const hint = document.getElementById('hint');
  const letterWrap = document.getElementById('letterWrap');
  const reseal = document.getElementById('reseal');
  const dateEl = document.getElementById('todayDate');

  // Friendly date, e.g. "29 July 2026"
  if (dateEl) {
    const d = new Date();
    dateEl.textContent = d.toLocaleDateString(undefined, {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  function openLetter() {
    seal.classList.add('cracking');
    hint.style.opacity = '0';
    envelope.classList.add('open');

    setTimeout(() => {
      stage.classList.add('hidden');
      letterWrap.classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }, 850);
  }

  function closeLetter() {
    letterWrap.classList.remove('visible');
    setTimeout(() => {
      stage.classList.remove('hidden');
      envelope.classList.remove('open');
      seal.classList.remove('cracking');
      hint.style.opacity = '.8';
    }, 500);
  }

  seal.addEventListener('click', openLetter);
  reseal.addEventListener('click', closeLetter);

  // Allow opening with keyboard (Enter/Space) for accessibility
  seal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLetter();
    }
  });
})();