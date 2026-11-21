(() => {
  // Find the timeline and its year sections.
  const track = document.querySelector('.timeline-track');
  const yearSections = [...document.querySelectorAll('.career-year')];
  if (!track || !yearSections.length) return;

  const yearOutput = track.querySelector('.timeline-year');
  const startYear = 2019;
  const endYear = new Date().getFullYear();
  track.setAttribute('aria-valuemax', String(endYear));

  // Move the active dot and year label to a timeline position.
  const setYear = (year, shouldScroll = false) => {
    year = Math.min(endYear, Math.max(startYear, Number(year)));
    const position = ((year - startYear) / (endYear - startYear)) * 100;

    track.style.setProperty('--timeline-position', `${position}%`);
    track.setAttribute('aria-valuenow', String(year));
    yearOutput.textContent = String(year);

    // Clicking or keyboard moving can smoothly scroll to that year.
    if (shouldScroll) {
      document.querySelector(`#year-${year}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hover or press calculates the closest year on the horizontal line.
  const setYearFromPointer = (clientX) => {
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const year = Math.round(startYear + ratio * (endYear - startYear));
    setYear(year);
  };

  track.addEventListener('pointermove', (event) => setYearFromPointer(event.clientX));
  track.addEventListener('pointerenter', () => track.classList.add('is-active'));
  track.addEventListener('pointerleave', () => track.classList.remove('is-active'));

  track.addEventListener('pointerdown', (event) => {
    track.setPointerCapture?.(event.pointerId);
    setYearFromPointer(event.clientX);
  });

  track.addEventListener('click', (event) => {
    setYearFromPointer(event.clientX);
    setYear(track.getAttribute('aria-valuenow'), true);
  });

  // Arrow keys, Home, and End provide keyboard navigation.
  track.addEventListener('keydown', (event) => {
    let year = Number(track.getAttribute('aria-valuenow')) || endYear;

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') year--;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') year++;
    else if (event.key === 'Home') year = startYear;
    else if (event.key === 'End') year = endYear;
    else if (event.key === 'Enter' || event.key === ' ') {
      setYear(year, true);
      event.preventDefault();
      return;
    } else return;

    event.preventDefault();
    setYear(year);
  });

  // While scrolling, keep the top timeline on the currently visible year.
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setYear(visible.target.dataset.year);
  }, {
    rootMargin: '-35% 0px -35% 0px',
    threshold: [0.15, 0.35, 0.6]
  });

  yearSections.forEach((section) => observer.observe(section));
})();
