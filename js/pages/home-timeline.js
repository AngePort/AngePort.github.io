(() => {
  const track = document.querySelector('.timeline-track');
  if (!track) return;

  const yearOutput = track.querySelector('.timeline-year');
  const currentYear = new Date().getFullYear();
  const startYear = 2001;
  const endYear = currentYear;

  track.setAttribute('aria-valuemax', String(endYear));

  const setYearFromPointer = (clientX) => {
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const year = Math.round(startYear + ratio * (endYear - startYear));
    const position = ((year - startYear) / (endYear - startYear)) * 100;

    track.style.setProperty('--timeline-position', `${position}%`);
    track.setAttribute('aria-valuenow', String(year));
    yearOutput.textContent = String(year);
  };

  track.addEventListener('pointermove', (event) => {
    setYearFromPointer(event.clientX);
  });

  track.addEventListener('pointerenter', () => {
    track.classList.add('is-active');
  });

  track.addEventListener('pointerleave', () => {
    track.classList.remove('is-active');
  });

  track.addEventListener('pointerdown', (event) => {
    track.setPointerCapture?.(event.pointerId);
    track.classList.add('is-active');
    setYearFromPointer(event.clientX);
  });

  track.addEventListener('keydown', (event) => {
    let year = Number(track.getAttribute('aria-valuenow')) || endYear;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      year = Math.max(startYear, year - 1);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      year = Math.min(endYear, year + 1);
    } else if (event.key === 'Home') {
      year = startYear;
    } else if (event.key === 'End') {
      year = endYear;
    } else {
      return;
    }

    event.preventDefault();
    const position = ((year - startYear) / (endYear - startYear)) * 100;
    track.style.setProperty('--timeline-position', `${position}%`);
    track.setAttribute('aria-valuenow', String(year));
    yearOutput.textContent = String(year);
  });
})();
