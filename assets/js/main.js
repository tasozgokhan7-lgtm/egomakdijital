// ===========================
// EGOMAK DİJİTAL — MAIN.JS
// ===========================

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll(
  '.service-card, .portfolio-card, .blog-card, .process-step, .why-list li, .contact-item'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// Contact form — mailto fallback
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Lütfen ad soyad, e-posta ve mesaj alanlarını doldurun.');
      return;
    }

    const subjectMap = {
      kurumsal: 'Kurumsal Web Sitesi Talebi',
      eticaret: 'E-Ticaret Sitesi Talebi',
      seo: 'SEO Hizmeti Talebi',
      mobil: 'Mobil Uygulama Talebi',
      diger: 'Genel Talep'
    };
    const mailSubject = subjectMap[subject] || 'Web Sitesi Talebi';
    const body = `Ad Soyad: ${name}\nE-Posta: ${email}\nTelefon: ${phone || 'Belirtilmedi'}\n\nMesaj:\n${message}`;
    window.location.href = `mailto:egomak2025@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});
