document.addEventListener('DOMContentLoaded', () => {
  // 1. MENÚ HAMBURGUESA / OVERLAY
  const burgerToggle = document.getElementById('burger-toggle');
  const closeToggle = document.getElementById('close-toggle');
  const navOverlay = document.getElementById('nav-overlay');

  if (burgerToggle && navOverlay) {
    burgerToggle.addEventListener('click', () => navOverlay.classList.add('open'));
  }
  if (closeToggle && navOverlay) {
    closeToggle.addEventListener('click', () => navOverlay.classList.remove('open'));
  }

  // Cerrar menú con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay && navOverlay.classList.contains('open')) {
      navOverlay.classList.remove('open');
    }
  });

  // 2. CARRUSEL EN PRODUCTOS (HOMBRE Y MUJER)
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
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });
    }
  });

  // 3. CONTADOR Y ACCIÓN SIMPLE DE CARRITO
  let cartCount = 0;
  const cartCountEl = document.getElementById('cart-count');
  const addButtons = document.querySelectorAll('.add-to-cart');
  const cartBtn = document.querySelector('.cart-btn');

  // Añadir productos
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      if (cartCountEl) cartCountEl.textContent = cartCount;
      btn.textContent = "AÑADIDO ✓";
      setTimeout(() => {
        btn.textContent = "AÑADIR AL PEDIDO";
      }, 1500);
    });
  });

  // Clic en el botón CARRITO del Navbar (Redirige a contacto/WhatsApp si hay items)
  if (cartBtn && !window.location.pathname.includes('admin')) {
    cartBtn.addEventListener('click', () => {
      if (cartCount === 0) {
        alert("Tu carrito está vacío. Agrega prendas para realizar tu pedido.");
      } else {
        // Redirige directamente a la página de contacto para finalizar
        window.location.href = "contacto.html";
      }
    });
  }

  // 4. LOGIN PANEL ADMINISTRADOR (PIN POR DEFECTO: 1234)
  const adminForm = document.getElementById('admin-login-form');
  const adminLoginScreen = document.getElementById('admin-login-screen');
  const adminDashboard = document.getElementById('admin-dashboard');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  const SECRET_PIN = "1234"; // Puedes cambiar este PIN cuando gustes

  if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pinInput = document.getElementById('admin-pin').value;

      if (pinInput === SECRET_PIN) {
        adminLoginScreen.style.display = 'none';
        adminDashboard.style.display = 'block';
        loginError.style.display = 'none';
      } else {
        loginError.style.display = 'block';
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