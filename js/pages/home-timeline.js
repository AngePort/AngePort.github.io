(() => {
  // Find the timeline and all full-page year sections.
  const track = document.querySelector('.timeline-track');
  const yearSections = [...document.querySelectorAll('.career-year')];
  if (!track || !yearSections.length) return;

  // Timeline settings used by pointer, keyboard, and scroll updates.
  const startYear = 2019;
  const endYear = new Date().getFullYear();
  const yearOutput = track.querySelector('.timeline-year');
  const runner = track.querySelector('.timeline-runner');
  let previousYear = endYear;

  // Walk frames cycle only while the timeline is moving.
  const walkFrames = runner ? [
    runner.dataset.walk1,
    runner.dataset.walk2,
    runner.dataset.walk3,
    runner.dataset.walk4,
    runner.dataset.walk5,
    runner.dataset.walk6
  ].filter(Boolean) : [];
  let walkFrameIndex = 0;
  let walkInterval = null;

  const startWalking = () => {
    if (!runner || !walkFrames.length || walkInterval) return;

    runner.classList.add('is-running');
    walkInterval = window.setInterval(() => {
      walkFrameIndex = (walkFrameIndex + 1) % walkFrames.length;
      runner.querySelector('img').src = walkFrames[walkFrameIndex];
    }, 90);
  };

  const stopWalking = () => {
    if (!runner) return;

    window.clearInterval(walkInterval);
    walkInterval = null;
    runner.classList.remove('is-running');
    runner.querySelector('img').src = runner.dataset.idle;
  };

  track.setAttribute('aria-valuemax', String(endYear));

  let runnerPosition = 100;
  let runnerTarget = 100;
  let runnerFrame = null;

  // Move the dot and label immediately, but queue the knight for smooth travel.
  const moveRunnerToTarget = () => {
    if (!runner) return;

    if (runnerFrame) window.cancelAnimationFrame(runnerFrame);

    const animateRunner = () => {
      const distance = runnerTarget - runnerPosition;

      if (Math.abs(distance) < 0.08) {
        runnerPosition = runnerTarget;
        runner.style.setProperty('--runner-position', `${runnerPosition}%`);
        stopWalking();
        runnerFrame = null;
        return;
      }

      runner.style.setProperty('--runner-direction', distance < 0 ? '-1' : '1');
      runnerPosition += distance * 0.055;
      runner.style.setProperty('--runner-position', `${runnerPosition}%`);
      startWalking();
      runnerFrame = window.requestAnimationFrame(animateRunner);
    };

    runnerFrame = window.requestAnimationFrame(animateRunner);
  };

  // Move the dot, year label, and runner to a selected year.
  const setYear = (year, shouldScroll = false) => {
    year = Math.min(endYear, Math.max(startYear, Number(year)));
    const position = ((year - startYear) / (endYear - startYear)) * 100;
    const yearChanged = year !== previousYear;

    track.style.setProperty('--timeline-position', `${position}%`);
    track.setAttribute('aria-valuenow', String(year));
    yearOutput.textContent = String(year);

    // Dot and year move now; the knight follows the latest queued position.
    if (runner && yearChanged) {
      runnerTarget = position;

      window.clearTimeout(runner.runTimer);
      runner.runTimer = window.setTimeout(moveRunnerToTarget, 120);
    } else if (runner) {
      runnerTarget = position;
    }

    previousYear = year;

    // Scroll to a year only for click or keyboard navigation.
    if (shouldScroll) {
      document.querySelector(`#year-${year}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Calculate a year from a pointer position on the horizontal line.
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

  // Keyboard users can move one year at a time or jump to 2019/2026.
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

  // Find the year section closest to the center of the viewport while scrolling.
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

    // Use one update per animation frame for smooth scrolling.
    scrollFrame = window.requestAnimationFrame(() => {
      updateYearFromScroll();
      scrollFrame = null;
    });
  }, { passive: true });

  // Set the timeline to the current section on load.
  setYear(endYear);
})();
