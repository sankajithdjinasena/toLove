(function () {
  const stage = document.getElementById('stage');
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