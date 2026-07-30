/* ============================================================
   READING PROGRESS BAR
   Tracks scroll position and updates progress indicator
   ============================================================ */

(function() {
  const progressBar = document.getElementById('progress-bar');

  if (!progressBar) return;

  function updateProgress() {
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', Math.round(progress));
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  window.addEventListener('load', updateProgress);

  if (window.ResizeObserver) {
    new ResizeObserver(updateProgress).observe(document.body);
  }

  updateProgress();
})();
