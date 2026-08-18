document.addEventListener('DOMContentLoaded', () => {
  // 1. MENÚ OVERLAY
  const burgerToggle = document.getElementById('burger-toggle');
  const closeToggle = document.getElementById('close-toggle');
  const navOverlay = document.getElementById('nav-overlay');

  if (burgerToggle && navOverlay) {
    burgerToggle.addEventListener('click', () => navOverlay.classList.add('open'));
  }
  if (closeToggle && navOverlay) {
    closeToggle.addEventListener('click', () => navOverlay.classList.remove('open'));
  }

  // 2. CARRUSELES
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });
    }
  });

  // 3. REDIRECCIÓN BOTÓN CARRITO A CHECKOUT
  const cartBtn = document.querySelector('.cart-btn');
  if (cartBtn && !window.location.pathname.includes('admin') && !window.location.pathname.includes('checkout')) {
    cartBtn.addEventListener('click', () => {
      window.location.href = "checkout.html";
    });
  }

  // 4. SELECCIÓN DE TALLA EN DETALLE DE PRODUCTO
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 5. LOGIN ADMIN
  const adminForm = document.getElementById('admin-login-form');
  const adminLoginScreen = document.getElementById('admin-login-screen');
  const adminDashboard = document.getElementById('admin-dashboard');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  const SECRET_PIN = "1234";

  if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pinInput = document.getElementById('admin-pin').value;
      if (pinInput === SECRET_PIN) {
        adminLoginScreen.style.display = 'none';
        adminDashboard.style.display = 'block';
        if (loginError) loginError.style.display = 'none';
      } else {
        if (loginError) loginError.style.display = 'block';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      adminDashboard.style.display = 'none';
      adminLoginScreen.style.display = 'block';
      document.getElementById('admin-pin').value = '';
    });
  }
});