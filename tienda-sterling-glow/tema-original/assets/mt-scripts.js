// Casa Lumen — scripts propios (prefijo mt-)
document.addEventListener('DOMContentLoaded', function () {
  initReveals();
  initHeroParallax();
  initAcabados();
  initResenasCarrusel();
  initProductoGaleria();
  initProductoVariantes();
});

// ---------- Reveals al hacer scroll ----------
function initReveals() {
  var els = document.querySelectorAll('.mt-reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('mt-visible'); });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('mt-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  els.forEach(function (el, i) {
    el.style.setProperty('--mt-delay', (i % 4) * 90 + 'ms');
    observer.observe(el);
  });
}

// ---------- Parallax suave del hero ----------
function initHeroParallax() {
  var media = document.querySelector('[data-mt-hero-media] img');
  if (!media || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ticking = false;
  function update() {
    var rect = media.parentElement.getBoundingClientRect();
    var offset = rect.top * 0.06;
    media.style.transform = 'translateY(' + offset + 'px) scale(1.04)';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

// ---------- Selector de acabados ----------
function initAcabados() {
  var secciones = document.querySelectorAll('[data-mt-acabados]');
  secciones.forEach(function (seccion) {
    var swatches = seccion.querySelectorAll('.mt-swatch');
    var imagenes = seccion.querySelectorAll('.mt-acabados-visor img');
    swatches.forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        var objetivo = swatch.getAttribute('data-acabado');
        swatches.forEach(function (s) { s.classList.remove('mt-activo'); });
        swatch.classList.add('mt-activo');
        imagenes.forEach(function (img) {
          img.classList.toggle('mt-activa', img.getAttribute('data-acabado') === objetivo);
        });
      });
    });
  });
}

// ---------- Carrusel de reseñas ----------
function initResenasCarrusel() {
  var secciones = document.querySelectorAll('[data-mt-resenas]');
  secciones.forEach(function (seccion) {
    var pista = seccion.querySelector('.mt-resenas-pista');
    var prev = seccion.querySelector('[data-mt-resenas-prev]');
    var next = seccion.querySelector('[data-mt-resenas-next]');
    if (!pista) return;
    function paso() {
      var tarjeta = pista.querySelector('.mt-resena');
      return tarjeta ? tarjeta.getBoundingClientRect().width + 24 : 360;
    }
    if (prev) prev.addEventListener('click', function () { pista.scrollBy({ left: -paso(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { pista.scrollBy({ left: paso(), behavior: 'smooth' }); });
  });
}

// ---------- Galería de producto ----------
function initProductoGaleria() {
  var galerias = document.querySelectorAll('[data-mt-producto-galeria]');
  galerias.forEach(function (galeria) {
    var principal = galeria.querySelector('.mt-producto-galeria-principal img');
    var minis = galeria.querySelectorAll('.mt-producto-miniatura');
    minis.forEach(function (mini) {
      mini.addEventListener('click', function () {
        var src = mini.getAttribute('data-full');
        if (principal && src) principal.src = src;
        minis.forEach(function (m) { m.classList.remove('mt-activa'); });
        mini.classList.add('mt-activa');
      });
    });
  });
}

// ---------- Selector de variantes ----------
function initProductoVariantes() {
  var forms = document.querySelectorAll('[data-mt-producto-form]');
  forms.forEach(function (form) {
    var dataEl = form.querySelector('[data-mt-variantes-json]');
    if (!dataEl) return;
    var variantes;
    try { variantes = JSON.parse(dataEl.textContent); } catch (e) { return; }

    var inputId = form.querySelector('input[name="id"]');
    var botonesOpciones = form.querySelectorAll('.mt-opcion-valor');
    var precioActual = form.querySelector('[data-mt-precio-actual]');
    var precioTachado = form.querySelector('[data-mt-precio-tachado]');
    var botonComprar = form.querySelector('[data-mt-comprar]');
    var stockAviso = form.querySelector('[data-mt-stock]');
    var numOpciones = form.querySelectorAll('.mt-opcion').length;

    function seleccionActual() {
      var seleccion = [];
      for (var i = 0; i < numOpciones; i++) {
        var activo = form.querySelector('.mt-opcion[data-indice="' + i + '"] .mt-opcion-valor.mt-activo');
        seleccion.push(activo ? activo.getAttribute('data-valor') : null);
      }
      return seleccion;
    }

    function encontrarVariante() {
      var seleccion = seleccionActual();
      return variantes.find(function (v) {
        return v.options.every(function (op, i) { return op === seleccion[i]; });
      });
    }

    function formatoDinero(centavos) {
      return (centavos / 100).toLocaleString(undefined, { style: 'currency', currency: window.Shopify && Shopify.currency ? Shopify.currency.active : 'USD' });
    }

    function actualizar() {
      var variante = encontrarVariante();
      if (!variante) return;
      if (inputId) inputId.value = variante.id;
      if (precioActual) precioActual.textContent = formatoDinero(variante.price);
      if (precioTachado) {
        if (variante.compare_at_price && variante.compare_at_price > variante.price) {
          precioTachado.textContent = formatoDinero(variante.compare_at_price);
          precioTachado.style.display = '';
        } else {
          precioTachado.style.display = 'none';
        }
      }
      if (botonComprar) {
        botonComprar.disabled = !variante.available;
        botonComprar.textContent = variante.available ? botonComprar.getAttribute('data-texto-disponible') : botonComprar.getAttribute('data-texto-agotado');
      }
      if (stockAviso) stockAviso.style.display = variante.available ? 'none' : 'block';
    }

    botonesOpciones.forEach(function (boton) {
      boton.addEventListener('click', function () {
        if (boton.classList.contains('mt-agotado')) return;
        var grupo = boton.closest('.mt-opcion');
        grupo.querySelectorAll('.mt-opcion-valor').forEach(function (b) { b.classList.remove('mt-activo'); });
        boton.classList.add('mt-activo');
        actualizar();
      });
    });

    actualizar();
  });
}
