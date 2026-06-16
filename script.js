const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Project filters
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category.includes(filter)) ? '' : 'none';
    });
  });
});

// Check optional report PDFs. If the user later uploads PDFs to assets/reports, buttons activate automatically.
async function checkReportLinks() {
  const links = document.querySelectorAll('[data-report-file]');
  for (const link of links) {
    const status = link.parentElement.querySelector('.report-status');
    try {
      const response = await fetch(link.getAttribute('href'), { method: 'HEAD' });
      if (response.ok) {
        link.classList.remove('disabled');
        link.removeAttribute('aria-disabled');
        if (status) {
          status.textContent = 'Full PDF is available.';
          status.classList.remove('missing');
        }
      } else {
        link.classList.add('disabled');
        link.setAttribute('aria-disabled', 'true');
        if (status) {
          status.textContent = 'Full PDF slot is ready. Upload the document with the expected file name to activate this button.';
          status.classList.add('missing');
        }
      }
    } catch (e) {
      link.classList.add('disabled');
      link.setAttribute('aria-disabled', 'true');
      if (status) {
        status.textContent = 'Full PDF slot is ready. Upload the document with the expected file name to activate this button.';
        status.classList.add('missing');
      }
    }
  }
}
checkReportLinks();
