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

// ===== Multilingue (FR / EN) =====
const langToggle = document.getElementById('lang-toggle');

function getTranslation(key, lang) {
  const parts = key.split('.');
  let node = translations[lang];
  for (const part of parts) {
    if (node === undefined) return undefined;
    node = node[part];
  }
  return node;
}

function applyLang(lang) {
  root.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = getTranslation(el.getAttribute('data-i18n'), lang);
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const value = getTranslation(el.getAttribute('data-i18n-aria'), lang);
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  if (langToggle) langToggle.textContent = lang === 'fr' ? 'EN' : 'FR';
}

function getPreferredLang() {
  return localStorage.getItem('lang') || 'fr';
}

if (typeof translations !== 'undefined') {
  applyLang(getPreferredLang());
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = root.getAttribute('lang') || 'fr';
    applyLang(current === 'fr' ? 'en' : 'fr');
  });
}

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
