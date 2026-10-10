// ===== Dark / Light mode toggle =====
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function getPreferredTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

applyTheme(getPreferredTheme());

toggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Sticky header shadow on scroll =====
const siteHeader = document.querySelector('.site-header');
function updateHeaderShadow() {
  if (window.scrollY > 8) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
if (siteHeader) {
  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
}
