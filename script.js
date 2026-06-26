document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ==========================================================================
     DOM ELEMENTS
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const menuIcon = mobileToggleBtn.querySelector('.menu-icon');
  const closeIcon = mobileToggleBtn.querySelector('.close-icon');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const scrollBtn = document.getElementById('scroll-to-top-btn');
  const contactForm = document.getElementById('portfolio-contact-form');
  const successOverlay = document.getElementById('form-success-overlay');
  const successCloseBtn = document.getElementById('success-close-btn');

  // Navigation Links
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section');

  /* ==========================================================================
     SCROLL EFFECTS (NAVBAR & SCROLL-TO-TOP)
     ========================================================================== */
  window.addEventListener('scroll', () => {
    // Add shadow/compact class to navbar on scroll
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Toggle scroll-to-top button visibility
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Scroll to top when button is clicked
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ==========================================================================
     MOBILE DRAWER MENU
     ========================================================================== */
  function toggleMobileMenu() {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

    if (isOpen) {
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    } else {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      document.body.style.overflow = ''; // Resume background scrolling
    }
  }

  mobileToggleBtn.addEventListener('click', toggleMobileMenu);

  // Close drawer when a mobile link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================================
     ACTIVE NAVIGATION LINK HIGHLIGHTING & SCROLL REVEALS
     ========================================================================== */
  // Intersection Observer for highlighting active section in navigation
  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Triggers when section occupies middle portion of viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update Desktop Links
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update Mobile Links
        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  // Observe all sections
  sections.forEach(section => {
    navObserver.observe(section);
  });

  // Intersection Observer for Scroll Reveal Animations
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px', // Starts transition slightly before entering viewport
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, revealObserverOptions);

  // Observe all elements with .scroll-reveal class
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
     CONTACT FORM VALIDATION & INTERACTIVE SUCCESS OVERLAY
     ========================================================================== */
  // Helper to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Clear single validation error
  function clearValidationError(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    formGroup.classList.remove('invalid');
  }

  // Validate single input
  function validateField(inputElement) {
    const formGroup = inputElement.closest('.form-group');
    const value = inputElement.value.trim();
    let isValid = true;

    if (inputElement.id === 'contact-name') {
      if (value.length < 2) {
        isValid = false;
        document.getElementById('name-error').innerText = 'Please enter your name (at least 2 letters)';
      }
    } else if (inputElement.id === 'contact-email') {
      if (!isValidEmail(value)) {
        isValid = false;
        document.getElementById('email-error').innerText = 'Please enter a valid email address';
      }
    } else if (inputElement.id === 'contact-message') {
      if (value.length < 10) {
        isValid = false;
        document.getElementById('message-error').innerText = 'Please write a slightly longer message (at least 10 letters)';
      }
    }

    if (!isValid) {
      formGroup.classList.add('invalid');
    } else {
      formGroup.classList.remove('invalid');
    }

    return isValid;
  }

  // Add real-time input change validation removal
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.closest('.form-group').classList.contains('invalid')) {
        validateField(input);
      }
    });
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });

  
  // Close success overlay
  successCloseBtn.addEventListener('click', () => {
    successOverlay.classList.add('hidden');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});
