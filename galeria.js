"use strict";

(function () {
  const escenario = document.getElementById("rouletteStage");
  const contador = document.getElementById("galleryCounter");
  const titulo = document.getElementById("galleryTitle");
  const descripcion = document.getElementById("galleryDescription");
  const puntosContenedor = document.getElementById("galleryDots");
  const botonAnterior = document.getElementById("galleryPrev");
  const botonSiguiente = document.getElementById("galleryNext");

  if (!escenario) return;

  let diapositivas = [...escenario.querySelectorAll(".roulette-slide")];
  let indice = 0;

  /* Fondo: dos capas que se cruzan para que el cambio sea suave. */
  const seccion = document.getElementById("galeria");
  const capasFondo = [];
  let capaActual = 0;

  function crearFondo() {
    if (!seccion) return;

    for (let i = 0; i < 2; i++) {
      const capa = document.createElement("div");
      capa.className = "galeria-fondo";
      capa.setAttribute("aria-hidden", "true");
      seccion.prepend(capa);
      capasFondo.push(capa);
    }
  }

  function cambiarFondo(ruta) {
    if (!capasFondo.length || !ruta) return;
    if (capasFondo[capaActual].dataset.ruta === ruta) return;

    const siguiente = 1 - capaActual;
    const capa = capasFondo[siguiente];

    capa.style.backgroundImage = 'url("' + ruta + '")';
    capa.dataset.ruta = ruta;
    capa.classList.add("visible");
    capasFondo[capaActual].classList.remove("visible");
    capaActual = siguiente;
  }

  /* Etiqueta "01 / 17" sobre cada foto. */
  function numerar() {
    diapositivas.forEach(function (d, i) {
      let etiqueta = d.querySelector(".slide-index");
      if (!etiqueta) {
        etiqueta = document.createElement("span");
        etiqueta.className = "slide-index";
        d.appendChild(etiqueta);
      }
      etiqueta.textContent =
        String(i + 1).padStart(2, "0") + " / " + diapositivas.length;
    });
  }

  /* Indicadores (puntos) inferiores. */
  function construirPuntos() {
    if (!puntosContenedor) return;
    puntosContenedor.replaceChildren();

    diapositivas.forEach(function (_, i) {
      const punto = document.createElement("button");
      punto.type = "button";
      punto.setAttribute("aria-label", "Mostrar imagen " + (i + 1));
      punto.addEventListener("click", function () {
        ir(i);
      });
      puntosContenedor.appendChild(punto);
    });
  }

  /* Coloca cada foto: central, laterales o escondida. */
  function actualizar() {
    const total = diapositivas.length;
    if (!total) return;

    diapositivas.forEach(function (d, i) {
      d.classList.remove("active", "previous", "next", "previous2", "next2", "far");
      const dif = (i - indice + total) % total;

      if (dif === 0) d.classList.add("active");
      else if (dif === 1) d.classList.add("next");
      else if (dif === total - 1) d.classList.add("previous");
      else if (dif === 2) d.classList.add("next2");
      else if (dif === total - 2) d.classList.add("previous2");
      else d.classList.add("far");
    });

    const actual = diapositivas[indice];

    const fotoActual = actual.querySelector("img");
    if (fotoActual) cambiarFondo(fotoActual.currentSrc || fotoActual.src);

    if (contador) contador.textContent = "Imagen " + (indice + 1) + " de " + total;
    if (titulo) titulo.textContent = actual.dataset.title || "";
    if (descripcion) descripcion.textContent = actual.dataset.desc || "";

    /* Reinicia la animación suave del texto. */
    const bloqueTexto = titulo ? titulo.parentElement : null;
    if (bloqueTexto) {
      bloqueTexto.classList.remove("cambia");
      void bloqueTexto.offsetWidth;
      bloqueTexto.classList.add("cambia");
    }

    if (puntosContenedor) {
      [...puntosContenedor.children].forEach(function (p, i) {
        p.classList.toggle("active", i === indice);
        p.setAttribute("aria-current", i === indice ? "true" : "false");
      });
    }

    /* Carga la foto siguiente y la anterior para que no se vean vacías. */
    [indice - 1, indice + 1].forEach(function (n) {
      const img = diapositivas[(n + total) % total].querySelector("img");
      if (img) img.loading = "eager";
    });
  }

  function ir(nuevo) {
    const total = diapositivas.length;
    if (!total) return;
    indice = (nuevo + total) % total;
    actualizar();
  }

  /* Si una foto no existe, se quita del carrusel. */
  function vigilarFotos() {
    diapositivas.slice().forEach(function (d) {
      const img = d.querySelector("img");
      if (!img) return;

      img.addEventListener("error", function () {
        const posicion = diapositivas.indexOf(d);
        if (posicion === -1) return;

        diapositivas.splice(posicion, 1);
        d.remove();

        if (indice >= diapositivas.length) indice = 0;
        numerar();
        construirPuntos();
        actualizar();
      });
    });
  }

  /* Clic en una foto lateral = ir a ella. */
  escenario.addEventListener("click", function (e) {
    const d = e.target.closest(".roulette-slide");
    if (!d) return;
    const i = diapositivas.indexOf(d);
    if (i !== -1 && i !== indice) ir(i);
  });

  if (botonAnterior) botonAnterior.addEventListener("click", function () { ir(indice - 1); });
  if (botonSiguiente) botonSiguiente.addEventListener("click", function () { ir(indice + 1); });

  /* Deslizar con el dedo en celular. */
  let inicioX = null;
  let inicioY = null;

  escenario.addEventListener("touchstart", function (e) {
    inicioX = e.touches[0].clientX;
    inicioY = e.touches[0].clientY;
  }, { passive: true });

  escenario.addEventListener("touchend", function (e) {
    if (inicioX === null) return;
    const dx = e.changedTouches[0].clientX - inicioX;
    const dy = e.changedTouches[0].clientY - inicioY;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      ir(dx < 0 ? indice + 1 : indice - 1);
    }
    inicioX = null;
    inicioY = null;
  }, { passive: true });

  /* Flechas del teclado cuando el carrusel tiene el foco. */
  const ruleta = document.getElementById("roulette");
  if (ruleta) {
    ruleta.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") ir(indice - 1);
      if (e.key === "ArrowRight") ir(indice + 1);
    });
  }

  /* Se cargan todas desde el inicio para que cada marco tome su tamaño real. */
  diapositivas.forEach(function (d) {
    const img = d.querySelector("img");
    if (img) img.loading = "eager";
  });

  crearFondo();
  numerar();
  construirPuntos();
  vigilarFotos();
  actualizar();
})();


/* =========================================
   VIDEO DEMOSTRATIVO
   Muestra el aviso solo si el archivo no existe.
   ========================================= */

(function () {
  /* Funciona con todos los videos: cada uno va dentro de un .video-frame. */
  document.querySelectorAll("#videos .video-frame").forEach(function (marco) {
    const video = marco.querySelector("video");
    if (!video) return;

    /* Cuando el video carga, se oculta el aviso. */
    video.addEventListener("loadeddata", function () {
      marco.classList.add("ready");
    });

    /* Si el archivo no existe, se quita el reproductor y queda el aviso. */
    function sinVideo() {
      video.remove();
    }

    video.addEventListener("error", sinVideo);

    const fuente = video.querySelector("source");
    if (fuente) fuente.addEventListener("error", sinVideo);

    /* Al reproducir uno, se pausan los demás. */
    video.addEventListener("play", function () {
      document.querySelectorAll("#videos video").forEach(function (otro) {
        if (otro !== video) otro.pause();
      });
    });
  });
})();