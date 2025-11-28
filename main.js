// main.js - Mini Portfolio interactivity (actualizado)
const projects = [
  { id: 1, title: "Landing Page Clean", tags: ["web"], desc: "Landing responsiva para producto." },
  { id: 2, title: "App de Tareas", tags: ["tool","web"], desc: "Pequeña SPA para gestión de tareas." },
  { id: 3, title: "Rediseño UX", tags: ["ux"], desc: "Caso de estudio de mejora de flujo de compra." },
  { id: 4, title: "Kit de Componentes", tags: ["web","ux"], desc: "Librería pequeña de componentes reutilizables." }
];

// DOM refs
const projectsList = document.getElementById('projectsList');
const filterSelect = document.getElementById('filter');
const themeToggle = document.getElementById('themeToggle');
const yearSpan = document.getElementById('year');

const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const sendBtn = document.getElementById('sendBtn');
const resetBtn = document.getElementById('resetBtn');
const nameInput = document.getElementById('name');

function renderProjects(filter = 'all') {
  projectsList.innerHTML = '';
  const filtered = (filter === 'all') ? projects : projects.filter(p => p.tags.includes(filter));
  if (filtered.length === 0) {
    projectsList.innerHTML = '<li class="project-item">No hay proyectos que coincidan.</li>';
    return;
  }
  filtered.forEach(p => {
    const li = document.createElement('li');
    li.className = 'project-item';
    li.innerHTML = `<h3>${p.title}</h3><div class="meta">${p.tags.join(' · ')} · ${p.desc}</div>`;
    projectsList.appendChild(li);
  });
}

// Theme toggle (persistido en localStorage)
let dark = false;
function applyTheme() {
  if (dark) {
    document.documentElement.style.setProperty('--bg', '#0b1220');
    document.documentElement.style.setProperty('--card', '#071026');
    document.documentElement.style.setProperty('--muted', 'rgba(255,255,255,0.68)');
    themeToggle.textContent = 'Tema claro';
  } else {
    document.documentElement.style.setProperty('--bg', '#f6f8fb');
    document.documentElement.style.setProperty('--card', '#ffffff');
    document.documentElement.style.setProperty('--muted', '#6b7280');
    themeToggle.textContent = 'Tema oscuro';
  }
  try { localStorage.setItem('mini_portfolio_dark', JSON.stringify(!!dark)); } catch(e){}
}

// Contact form basic validation + fake "send"
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = 'Por favor completa todos los campos.';
    formMsg.style.color = 'var(--danger, #fb7185)';
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formMsg.textContent = 'Introduce un correo válido.';
    formMsg.style.color = 'var(--danger, #fb7185)';
    return;
  }

  // simulate send
  sendBtn.disabled = true;
  formMsg.style.color = 'var(--muted)';
  formMsg.textContent = 'Enviando...';

  setTimeout(() => {
    formMsg.style.color = 'green';
    formMsg.textContent = '¡Mensaje enviado! Gracias, responderé pronto.';
    contactForm.reset();
    sendBtn.disabled = false;
    // focus back to name for quick follow-ups
    nameInput.focus();
  }, 900);
});

resetBtn.addEventListener('click', () => {
  contactForm.reset();
  formMsg.textContent = '';
  nameInput.focus();
});

// filter handler (persist last filter)
filterSelect.addEventListener('change', (e) => {
  const val = e.target.value;
  renderProjects(val);
  try { localStorage.setItem('mini_portfolio_lastFilter', val); } catch(e){}
});

// theme handler
themeToggle.addEventListener('click', () => {
  dark = !dark;
  applyTheme();
});

// fill year
yearSpan.textContent = new Date().getFullYear();

// Restore preferences from localStorage (if any)
try {
  const storedDark = JSON.parse(localStorage.getItem('mini_portfolio_dark'));
  if (typeof storedDark === 'boolean') dark = storedDark;
  const lastFilter = localStorage.getItem('mini_portfolio_lastFilter');
  if (lastFilter) {
    filterSelect.value = lastFilter;
  }
} catch(e){ /* ignore */ }

// initial render with restored filter
renderProjects(filterSelect.value || 'all');
applyTheme();
