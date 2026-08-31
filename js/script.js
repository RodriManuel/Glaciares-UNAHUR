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
function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll(".filtro-bloques__btn");

    if (botonesFiltro.length === 0) return;

    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach((b) => b.classList.remove("filtro-bloques__btn--activo"));
            boton.classList.add("filtro-bloques__btn--activo");

            const partidoSeleccionado = boton.getAttribute("data-partido");
            // Se seleccionan las tarjetas dinámicamente al momento de hacer clic
            const cardsDiputados = document.querySelectorAll(".diputado");

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
let swiperInstance = null;

// Función principal de carga
async function cargarDatosDiputados() {
    try {
        // Cargar ambas fuentes de datos en paralelo
        const [respuestaLocal, respuestaApi] = await Promise.all([
            fetch('./assets/data/diputados.json'),
            fetch('https://api.argentinadatos.com/v1/diputados/diputados')
        ]);

        if (!respuestaLocal.ok || !respuestaApi.ok) {
            throw new Error("Error al obtener los datos de una o ambas fuentes.");
        }

        const diputadosLocales = await respuestaLocal.json();
        const diputadosApi = await respuestaApi.json();

        // Fusionar los datos locales con los datos de la API
        const diputadosCombinados = fusionarDiputados(diputadosLocales, diputadosApi);

        // Renderizar e inicializar
        renderizarDiputados(diputadosCombinados);
        inicializarFiltros();
        swiperInstance = inicializarSwiper();

    } catch (error) {
        console.error("Error cargando los diputados:", error);
    }
}

// Llama a la función principal
cargarDatosDiputados();

/**
 * Normaliza cadenas de texto para comparar nombres sin problemas de acentos o mayúsculas
 */
function normalizarTexto(texto = "") {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

/**
 * Combina el JSON local con la respuesta de la API
 */
function fusionarDiputados(locales, api) {
    return locales.map(local => {
        // Buscar coincidencia en la API por ID o por coincidencia de Nombre + Apellido
        const coincidenciaApi = api.find(itemApi => {
            const nombreCompletoApi = normalizarTexto(`${itemApi.nombre} ${itemApi.apellido}`);
            const nombreLocal = normalizarTexto(local.nombre);
            
            return itemApi.id === local.id || nombreCompletoApi === nombreLocal;
        });

        // Si no se encuentra en la API, devolver solo el objeto local
        if (!coincidenciaApi) return local;

        // Si la foto en la API es una URL completa, la usamos; de lo contrario, la imagen local
        const fotoFinal = coincidenciaApi.foto && coincidenciaApi.foto.startsWith("http")
            ? coincidenciaApi.foto
            : `assets/img/diputados/${local.foto}`;

        // Combinar ambas fuentes (dando prioridad a la API en datos oficiales si así lo deseas)
        return {
            ...local, // Conserva los datos locales (voto, descripcion, profesion, etc.)
            ...coincidenciaApi, // Agrega datos de la API (bloque, periodoMandato, juramentoFecha, etc.)
            
            // Sobrescribimos campos donde quieras lógica personalizada:
            nombre: local.nombre, // Mantiene el formato local si prefieres
            bloque: coincidenciaApi.bloque || local.partido,
            foto: fotoFinal,
            provincia: local.provincia || coincidenciaApi.provincia
        };
    });
}

function renderizarDiputados(diputados) {
    const container = document.querySelector(".diputados"); 
    container.innerHTML = "";

    diputados.forEach((diputado, index) => {
        const card = document.createElement("article");
        
        card.classList.add("diputado", "swiper-slide");
        card.setAttribute("data-partido", diputado.partido_slug || diputado.bloque);

        const collapseId = `collapse-${diputado.id || index}`;

        // Determinar el origen de la imagen (URL remota o local)
        const imgSrc = diputado.foto.startsWith("http") 
            ? diputado.foto 
            : `assets/img/diputados/${diputado.foto}`;

        card.innerHTML = `
        <div class="diputado__header">
            <figure class="diputado__figure">
                <img class="diputado__img" src="${imgSrc}" alt="Fotografía de ${diputado.nombre}">
            </figure>
            <div class="diputado__info">
                <h3 class="diputado__nombre">${diputado.nombre}</h3>
                ${diputado.bloque ? `<small class="diputado__bloque">${diputado.bloque}</small>` : ''}
                <span class="diputado__voto diputado__voto--${diputado.voto_tipo}">${diputado.voto}</span>
            </div>
        </div>

        <div class="diputado__details">
            <h5 class="diputado__subtitle">Provincia</h5>
            <span class="diputado__provincia">${diputado.provincia}</span>
        </div>

        <div class="diputado__footer">
            ${diputado.perfil_url ? `<a class="diputado__link" href="${diputado.perfil_url}" target="_blank">Ver perfil completo</a>` : ''}
        </div>
        `;

        container.appendChild(card);
    });
}

function inicializarSwiper() {
    return new Swiper('.swiper-diputados', {
        loop: true,
        // Debe ser igual o mayor al slidesPerView más alto (1024px -> 3)
        loopAdditionalSlides: 3,
        slidesPerView: 1,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        preventInteractionOnTransition: true, // Evita registrar clics mientras se desplaza
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}