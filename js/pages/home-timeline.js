(() => {
  // Find the timeline and all full-page year sections.
  const track = document.querySelector('.timeline-track');
  const yearSections = [...document.querySelectorAll('.career-year')];
  if (!track || !yearSections.length) return;

  // Timeline range and visible-year label.
  const startYear = 2019;
  const endYear = new Date().getFullYear();
  const yearOutput = track.querySelector('.timeline-year');
  const meSprite = track.querySelector('.timeline-me');
  let previousYear = endYear;

  track.setAttribute('aria-valuemax', String(endYear));

  // Move the dot and year to the selected timeline position.
  const setYear = (year, shouldScroll = false) => {
    year = Math.min(endYear, Math.max(startYear, Number(year)));
    const position = ((year - startYear) / (endYear - startYear)) * 100;

    track.style.setProperty('--timeline-position', `${position}%`);
    track.setAttribute('aria-valuenow', String(year));
    yearOutput.textContent = String(year);

    // Face right toward newer years and left toward older years.
    if (meSprite && year !== previousYear) {
      meSprite.style.setProperty('--me-direction', year < previousYear ? '-1' : '1');
    }

    previousYear = year;
  };

  // Calculate a year from a pointer position on the line.
  const setYearFromPointer = (clientX) => {
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const year = Math.round(startYear + ratio * (endYear - startYear));
    setYear(year);
  };

  track.addEventListener('pointermove', (event) => setYearFromPointer(event.clientX));
  track.addEventListener('pointerenter', () => track.classList.add('is-active'));
  track.addEventListener('pointerleave', () => track.classList.remove('is-active'));
  track.addEventListener('pointerdown', (event) => setYearFromPointer(event.clientX));

  track.addEventListener('click', (event) => {
    setYearFromPointer(event.clientX);
    setYear(track.getAttribute('aria-valuenow'), true);
  });

  // Keyboard navigation for the timeline.
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

  // Use the closest full-page year while scrolling.
  let scrollFrame = null;
  const updateYearFromScroll = () => {
    const viewportPoint = window.innerHeight * 0.5;
    let closestSection = yearSections[0];
    let closestDistance = Infinity;

    yearSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(sectionCenter - viewportPoint);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = section;
      }
    });

    setYear(closestSection.dataset.year);
  };

  window.addEventListener('scroll', () => {
    if (scrollFrame) return;

    scrollFrame = window.requestAnimationFrame(() => {
      updateYearFromScroll();
      scrollFrame = null;
    });
  }, { passive: true });

  // Insert Locked In only in year blocks that have no timeline content.
  const lockedTemplate = document.querySelector('#locked-in-template');
  yearSections.forEach((section) => {
    const copy = section.querySelector('.career-year-copy');
    if (!copy) return;

    const hasContent = copy.textContent.trim().length > 0;
    if (!hasContent && lockedTemplate) {
      copy.appendChild(lockedTemplate.content.cloneNode(true));
    }
  });

  setYear(endYear);
})();
