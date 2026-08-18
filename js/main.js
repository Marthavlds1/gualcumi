document.addEventListener('DOMContentLoaded', () => {
  // 1. LÓGICA DEL MENÚ OVERLAY
  const burgerToggle = document.getElementById('burger-toggle');
  const closeToggle = document.getElementById('close-toggle');
  const navOverlay = document.getElementById('nav-overlay');

  if (burgerToggle && navOverlay) {
    burgerToggle.addEventListener('click', () => navOverlay.classList.add('open'));
  }
  if (closeToggle && navOverlay) {
    closeToggle.addEventListener('click', () => navOverlay.classList.remove('open'));
  }

  // 2. LÓGICA DEL CARRUSEL EN PRODUCTOS
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

  // 3. CONTADOR BÁSICO DE CARRITO (SIMULACIÓN)
  let cartCount = 0;
  const cartCountEl = document.getElementById('cart-count');
  const addButtons = document.querySelectorAll('.add-to-cart');

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
});

// 4. LÓGICA DE ENVÍO DE FORMULARIO DE PEDIDOS
  const orderForm = document.getElementById('order-form');

  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      // A) PREPARACIÓN PARA BASE DE DATOS (Backend futuro)
      const orderData = {
        cliente: name,
        email: email,
        telefono: phone,
        pedido: message,
        fecha: new Date().toISOString()
      };

      console.log('Datos listos para enviar a la Base de Datos:', orderData);
      
      /* 
         NOTA DE CONEXIÓN A BASE DE DATOS FUTURA:
         Aquí conectaremos Supabase / Firebase más adelante con algo como:
         
         await fetch('https://tu-api.supabase.co/rest/v1/pedidos', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(orderData)
         });
      */

      // B) REDIRECCIÓN A WHATSAPP (Solución inmediata)
      const whatsappNumber = "525500000000"; // Reemplaza con tu número con clave de país
      const text = `*NUEVO PEDIDO GUALCUMI*%0A%0A*Nombre:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Tel:* ${encodeURIComponent(phone)}%0A*Detalles:* ${encodeURIComponent(message)}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
      
      // Abrir WhatsApp con la orden formateada
      window.open(whatsappUrl, '_blank');

      orderForm.reset();
    });
  }