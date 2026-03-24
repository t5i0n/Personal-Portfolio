/* ===== Loading Animation =====
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.style.opacity = '0';
    loading.style.visibility = 'hidden';
  }, 500);
}); */

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-center');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
      navMenu.classList.contains('active')
    );
    
    // Update menu icon
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking outside or on a link
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-center a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

// ===== Contact Button =====
document.getElementById("contactBtn").addEventListener("click", () => {
  document.getElementById('contact').scrollIntoView({ 
    behavior: 'smooth' 
  });
});

// ===== Dark / Light Mode =====
const modeToggle = document.getElementById("modeToggle"); Cannot declare a const variable twice: 'modeToggle'. error
const modeIcon = modeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDark.matches)) {
  document.body.classList.add('dark-mode');
  modeIcon.classList.remove('fa-moon');
  modeIcon.classList.add('fa-sun');
}

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  // Update icon
  if (document.body.classList.contains('dark-mode')) {
    modeIcon.classList.remove('fa-moon');
    modeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    modeIcon.classList.remove('fa-sun');
    modeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
  
  // Add click animation
  modeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    modeToggle.style.transform = 'scale(1)';
  }, 150);
});

// ===== Back to Top + Sticky Header =====
const backTop = document.getElementById("backTop");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  // Back to top button
  backTop.style.display = window.scrollY > 300 ? "flex" : "none";
  
  // Sticky header
  header.classList.toggle("scrolled", window.scrollY > 50);
  
  // Section fade-in animations
  animateSections();
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Skills Animation =====
function animateSkills() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  skillLevels.forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.style.width = level + '%';
  });
}

// ===== Animated Numbers Counter =====
function animateNumbers() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(',', '');
      const increment = Math.ceil(target / speed);
      
      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    
    updateCount();
  });
}

// ===== Section Scroll Animations =====
function animateSections() {
  const sections = document.querySelectorAll('.content-section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      section.classList.add('fade-in');
    }
  });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission
    alert('Thank you for your message, ' + name + '! I\'ll get back to you soon.');
    contactForm.reset();
  });
}

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
  // Close modal on Escape
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
  
  // Focus trap for mobile menu
  if (e.key === 'Tab' && navMenu && navMenu.classList.contains('active')) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});

// ===== Initialize Animations =====
document.addEventListener('DOMContentLoaded', () => {
  // Initial animations
  animateSections();
  animateSkills();
  
  // Start number counters when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
  
  // Set current year in footer
  const yearElement = document.querySelector('footer p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
  }
});


const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});


document.getElementById("downloadResumeBtn").addEventListener("click", function() {
    // Path to your resume file
    const resumeUrl = "Resume.pdf"; // Replace with your actual file path
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Tsion Tesfaye.pdf"; // Name for downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });const modeToggle = document.getElementById("modeToggle");
const modeIcon = modeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDark.matches)) {
  document.body.classList.add('dark-mode');
  modeIcon.classList.remove('fa-moon');
  modeIcon.classList.add('fa-sun');
}

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  // Update icon
  if (document.body.classList.contains('dark-mode')) {
    modeIcon.classList.remove('fa-moon');
    modeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    modeIcon.classList.remove('fa-sun');
    modeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
  
  // Add click animation
  modeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    modeToggle.style.transform = 'scale(1)';
  }, 150);
});

// ===== Back to Top + Sticky Header =====
const backTop = document.getElementById("backTop");
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  // Back to top button
  backTop.style.display = window.scrollY > 300 ? "flex" : "none";
  
  // Sticky header
  header.classList.toggle("scrolled", window.scrollY > 50);
  
  // Section fade-in animations
  animateSections();
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Skills Animation =====
function animateSkills() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  skillLevels.forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.style.width = level + '%';
  });
}

// ===== Animated Numbers Counter =====
function animateNumbers() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(',', '');
      const increment = Math.ceil(target / speed);
      
      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    
    updateCount();
  });
}

// ===== Section Scroll Animations =====
function animateSections() {
  const sections = document.querySelectorAll('.content-section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      section.classList.add('fade-in');
    }
  });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission
    alert('Thank you for your message, ' + name + '! I\'ll get back to you soon.');
    contactForm.reset();
  });
}

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
  // Close modal on Escape
  if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
  
  // Focus trap for mobile menu
  if (e.key === 'Tab' && navMenu && navMenu.classList.contains('active')) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
});

// ===== Initialize Animations =====
document.addEventListener('DOMContentLoaded', () => {
  // Initial animations
  animateSections();
  animateSkills();
  
  // Start number counters when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
  
  // Set current year in footer
  const yearElement = document.querySelector('footer p');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
  }
});
