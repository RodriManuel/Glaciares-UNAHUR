// Fecha Dinámica
const elYear = document.getElementById("year");
if (elYear) {
    elYear.textContent = new Date().getFullYear();
}

// Modo Oscuro
const btnModo = document.getElementById("btn-modo");

if(btnModo){
    // Sincronizamos el emoji inicial basándonos en lo que ya aplicó el <head>
    const esOscuroActual = document.documentElement.classList.contains("dark-mode");
    btnModo.textContent = esOscuroActual ? "☀️" : "🌒";

    btnModo.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark-mode");

        // Verifica si el modo oscuro quedó activo
        const modoActivo = document.documentElement.classList.contains("dark-mode");

        // Guarda la elección actual en localStorage
        if (modoActivo) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }

        // Cambia el texto del botón según el estado actual
        btnModo.textContent = modoActivo ? "☀️" : "🌒";
    });
}



// Validación de formularios
// Newsletter

const formNewsletter = document.getElementById("news-form");

if(formNewsletter) {
    
    const inputEmail = document.getElementById("news-email");
    const inputNombre = document.getElementById("news-nombre");
    const inputApellido = document.getElementById("news-apellido");
    const msgNewsletter = document.getElementById("news-message");

    formNewsletter.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const email = inputEmail.value.trim();
        const nombre = inputNombre.value.trim();
        const apellido = inputApellido.value.trim();

        if (email.length < 4 || !email.includes("@")) {
            msgNewsletter.textContent = "Por favor ingresá un email válido.";
            msgNewsletter.style.color = "#B71C1C";
            return;
        }

        if (nombre === "" || apellido === "") {
            msgNewsletter.textContent = "Completá todos los campos antes de enviar.";
            msgNewsletter.className = "error";
            msgNewsletter.style.color = "#B71C1C";
            return;
        }

        msgNewsletter.textContent = `¡Gracias! Vas a recibir noticias en ${email}.`;
        msgNewsletter.style.color = "#1A6B2A";

        formNewsletter.reset();
    });
}

const formContacto = document.getElementById("form-mensaje");

if(formContacto) {
    
    const inputContactoNombre = document.getElementById("nombre");
    const inputContactoEmail = document.getElementById("email");
    const msgContacto = document.getElementById("contacto-message");

    formContacto.addEventListener("submit",(e) =>{
        e.preventDefault();

        const nombre = inputContactoNombre.value.trim();
        const email = inputContactoEmail.value.trim();

        if(nombre === ""){
            msgContacto.textContent = "Por favor, ingresá tu nombre.";
            msgContacto.style.color = "#B71C1C";
            return;
        }
        if(email.length < 4 || !email.includes("@")){
            msgContacto.textContent = "Por favor, ingresá un correo electrónico válido.";
            msgContacto.style.color = "#B71C1C";
            return;
        }
        msgContacto.textContent = `¡Mensaje enviado con éxito! Gracias por escribirnos, ${nombre}.`;
        msgContacto.style.color = "#1A6B2A"; 

        formContacto.reset()
    });
}

//Unirse 
const formUnirse = document.getElementById("form-unirse");

if(formUnirse) {
    
    const inputJoinNombre = document.getElementById("join-nombre");
    const inputJoinEmail = document.getElementById("join-email");
    const selectInteres = document.getElementById("join-interes");
    const msgUnirse = document.getElementById("unirse-message");

    formUnirse.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = inputJoinNombre.value.trim();
        const email = inputJoinEmail.value.trim();
        const interes = selectInteres.value;

        if(nombre === ""){
            msgUnirse.textContent = "Por favor, ingresá tu nombre.";
            msgUnirse.style.color = "#B71C1C";
            return;
        }
        if(email.length < 4 || !email.includes("@")){
            msgUnirse.textContent = "Por favor, ingresá un correo electrónico válido.";
            msgUnirse.style.color = "#B71C1C";
            return;
        }
        if (interes === "") {
            msgUnirse.textContent = "Por favor, seleccioná un área en la que te gustaría ayudar.";
            msgUnirse.style.color = "#B71C1C";
            return;
        }

        msgUnirse.textContent = `¡Gracias ${nombre}! Tus datos fueron validados. Nos contactaremos a: ${email}.`;
        msgUnirse.style.color = "#1A6B2A"; 

        formUnirse.reset()
    });
}


document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("#carouselExampleControls");
  const carouselInner = carousel.querySelector(".carousel-inner");
  const isDesktop = window.matchMedia("(min-width: 576px)");

  if (isDesktop.matches) {
    // Desactiva la transición nativa de Bootstrap para desktop
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: false,
      touch: false
    });

    let scrollPosition = 0;

    carousel.querySelector(".carousel-control-next").addEventListener("click", function () {
      const cardWidth = carousel.querySelector(".carousel-item").offsetWidth;
      const maxScroll = carouselInner.scrollWidth - carouselInner.clientWidth;

      if (scrollPosition < maxScroll) {
        scrollPosition += cardWidth;
        carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    });

    carousel.querySelector(".carousel-control-prev").addEventListener("click", function () {
      const cardWidth = carousel.querySelector(".carousel-item").offsetWidth;

      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        carouselInner.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    });
  }
});

const carrusel = document.querySelector('.carousel');
const puntoDeQuiebre = window.matchMedia('(max-width: 576px)');

function toggleSlideClass(e) {
    if (e.matches) {
        carrusel.classList.add('slide');
    } else {
        carrusel.classList.remove('slide');
    }
}

puntoDeQuiebre.addEventListener('change', toggleSlideClass);

toggleSlideClass(puntoDeQuiebre);

// FILTRADO DE DIPUTADOS POR BLOQUE POLÍTICO

const botonesFiltro = document.querySelectorAll(".filtro-bloques__btn");
const cardsDiputados = document.querySelectorAll(".diputado");

if (botonesFiltro.length > 0 && cardsDiputados.length > 0) {
    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {

            botonesFiltro.forEach((b) => b.classList.remove("filtro-bloques__btn--activo"));
            boton.classList.add("filtro-bloques__btn--activo");

            const partidoSeleccionado = boton.getAttribute("data-partido");

            cardsDiputados.forEach((diputado) => {
                const partidoDiputado = diputado.getAttribute("data-partido");

                if (partidoSeleccionado === "todos" || partidoDiputado === partidoSeleccionado) {
                    diputado.classList.remove("oculto");
                } else {
                    diputado.classList.add("oculto");
                }
            });
        });
    });
}

// Lógica para generar los cards de diputados con la información en diputados.json
fetch('./assets/data/diputados.json')
    .then(response => response.json())
    .then(diputados => {
        renderizarDiputados(diputados);
    })
    .catch(error => console.error("Error cargando los diputados:", error));

function renderizarDiputados(diputados) {
    const container = document.querySelector(".diputados"); 
    container.innerHTML = ""; // Limpia la sección antes de renderizar

    diputados.forEach((diputado, index) => {
        const card = document.createElement("article");
        card.classList.add("diputado");
        card.setAttribute("data-partido", diputado.partido_slug);

        // ID único para controlar el collapse individual de Bootstrap
        const collapseId = `collapse-${diputado.id || index}`;

        card.innerHTML = `
        <div class="diputado__header">
            <figure class="diputado__figure">
            <img class="diputado__img" src="assets/img/diputados/${diputado.foto}" alt="Fotografía de ${diputado.nombre}">
            </figure>
            <div class="diputado__info">
            <h3 class="diputado__nombre">${diputado.nombre}</h3>
            <span class="diputado__cargo">${diputado.cargo}</span>
            <span class="diputado__voto diputado__voto--${diputado.voto_tipo}">${diputado.voto}</span>
            </div>
        </div>

        <div class="diputado__details">
            <h5 class="diputado__subtitle">Provincia</h5>
            <span class="diputado__provincia">${diputado.provincia}</span>
            <h5 class="diputado__subtitle">Profesión</h5>
            <span class="diputado__profesion">${diputado.profesion}</span>
            <h5 class="diputado__subtitle">Estudios</h5>
            <span class="diputado__estudios">${diputado.estudios}</span>
        </div>

        <div class="diputado__footer">
            <div class="d-flex align-items-center gap-1">
            <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                <span class="diputado__subtitle__span">Descripción▾</span>
            </button>
            </div>
            <div class="collapse" id="${collapseId}">
            <div>
                <p class="diputado__descripcion">${diputado.descripcion}</p> 
            </div>
            </div>
            <a class="diputado__link" href="${diputado.perfil_url}" target="_blank">Ver perfil completo</a>
        </div>
        `;

        container.appendChild(card);
  });
}