// ===== Navigation Scroll Effect =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== Scroll Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.feature-card, .step, .tech-card, .cta-card, .section-header, .network-card, .dash-stat-card, .dash-table-card, .dashboard-window, .payments-showcase').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Stagger feature cards
document.querySelectorAll('.feature-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.tech-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.network-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.05}s`;
});

document.querySelectorAll('.dash-stat-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// ===== Demo Chat Animation =====
const demoChat = document.getElementById('demo-chat');
const demoMessages = [
  { type: 'sent', text: "Hi! I need to book a yoga class for next week", time: '09:14' },
  { type: 'received', text: "Hey there! I'd be happy to help you book a yoga class. Which day next week works best for you?", time: '09:14' },
  { type: 'sent', text: "Wednesday would be great, do you have anything in the morning?", time: '09:15' },
  { type: 'received', text: "We have two morning slots available on Wednesday: 7:30am Sunrise Flow and 9:00am Vinyasa. Which one do you prefer?", time: '09:15' },
  { type: 'sent', text: "9am Vinyasa sounds perfect", time: '09:15' },
  { type: 'received', text: "Excellent choice! Let me confirm: Vinyasa class on Wednesday at 9:00am. Shall I go ahead and book that for you?", time: '09:16' },
  { type: 'sent', text: "Yes please!", time: '09:16' },
  { type: 'received', text: "All booked! Vinyasa class, Wednesday 9:00am. You'll receive a reminder the day before. See you on the mat!", time: '09:16' },
];

let demoStarted = false;

const demoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !demoStarted) {
      demoStarted = true;
      animateDemo();
      demoObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (demoChat) {
  demoObserver.observe(demoChat);
}

function animateDemo() {
  demoChat.innerHTML = '';
  demoMessages.forEach((msg, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `msg msg-${msg.type}`;
      div.innerHTML = `<p>${msg.text}</p><span class="msg-time">${msg.time}</span>`;
      demoChat.appendChild(div);
      demoChat.scrollTop = demoChat.scrollHeight;
    }, i * 800 + 300);
  });
}

// ===== Processing Steps Animation =====
const procSteps = document.querySelectorAll('.proc-step');
if (procSteps.length > 0) {
  let currentStep = 0;

  const procObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProcessing();
        procObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  procObserver.observe(procSteps[0].parentElement);

  function animateProcessing() {
    const cycle = () => {
      procSteps.forEach(s => s.classList.remove('active'));
      procSteps[currentStep].classList.add('active');
      currentStep = (currentStep + 1) % procSteps.length;
    };

    cycle();
    setInterval(cycle, 1200);
  }
}

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
