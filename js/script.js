// ==============================================
// BOTÓN VOLVER ARRIBA
// ==============================================

const botonArriba = document.getElementById("btn-arriba");

botonArriba.addEventListener("click", function(){

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
// ==============================================
// MOSTRAR BOTÓN AL HACER SCROLL
// ==============================================

window.addEventListener("scroll", function(){

    if(window.scrollY > 300){

        botonArriba.classList.add("mostrar");

    }else{

        botonArriba.classList.remove("mostrar");

    }

});


// ==============================================
// ANIMACIONES AL HACER SCROLL
// ==============================================

const elementos = document.querySelectorAll(".oculto");

function mostrarElementos(){

    elementos.forEach(function(elemento){

        const posicion = elemento.getBoundingClientRect().top;

        const alturaPantalla = window.innerHeight;

        if(posicion < alturaPantalla - 100){

          elemento.classList.add("visible");

        }

    });

}

window.addEventListener("scroll", mostrarElementos);

mostrarElementos();

// ==============================================
// MENÚ ACTIVO SEGÚN LA SECCIÓN
// ==============================================

const secciones = document.querySelectorAll("section");
const enlaces = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let actual = "";

    secciones.forEach(seccion => {

        const top = seccion.offsetTop - 150;
        const alto = seccion.offsetHeight;

        if (scrollY >= top && scrollY < top + alto) {

            actual = seccion.getAttribute("id");

        }

    });

    enlaces.forEach(link => {

        link.classList.remove("activo");

        if(link.getAttribute("href") == "#" + actual){

            link.classList.add("activo");

        }

    });

});


// ==============================================
// BARRA DE PROGRESO
// ==============================================

const barra = document.getElementById("barra-scroll");

window.addEventListener("scroll", function(){

    const scrollActual = window.scrollY;

    const alturaDocumento = document.documentElement.scrollHeight - window.innerHeight;

    const porcentaje = (scrollActual / alturaDocumento) * 100;

    barra.style.width = porcentaje + "%";

});
// ==============================================
// EFECTO MÁQUINA DE ESCRIBIR
// ==============================================

const palabras = [

    "Desarrollador Web Front-End",
    "Creador de sitios web",
    "Aprendiendo JavaScript",
    "Apasionado por la tecnología"

];

const typing = document.getElementById("typing");

let palabraActual = 0;
let letra = 0;
let borrando = false;

function escribir(){

    const palabra = palabras[palabraActual];

    if(!borrando){

        typing.textContent = palabra.substring(0, letra);

        letra++;

        if(letra > palabra.length){

            borrando = true;

            setTimeout(escribir, 1500);

            return;

        }

    }else{

        typing.textContent = palabra.substring(0, letra);

        letra--;

        if(letra < 0){

            borrando = false;

            palabraActual++;

            if(palabraActual >= palabras.length){

                palabraActual = 0;

            }

        }

    }

    setTimeout(escribir, borrando ? 40 : 80);

}

escribir();
// ==============================================
// NAVBAR INTELIGENTE
// ==============================================

const header = document.querySelector("header");

window.addEventListener("scroll", function(){

    if(window.scrollY > 50){

        header.classList.add("scroll");

    }else{

        header.classList.remove("scroll");

    }

});
// ==============================================
// EFECTO 3D EN TARJETAS
// ==============================================

const tarjetas = document.querySelectorAll(".card, .proyecto, .habilidades");

tarjetas.forEach((tarjeta) => {

    tarjeta.addEventListener("mousemove", (e) => {

        const rect = tarjeta.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const centroX = rect.width / 2;

        const centroY = rect.height / 2;

        const rotateX = -(y - centroY) / 12;

        const rotateY = (x - centroX) / 12;

        tarjeta.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)`;

    });

    tarjeta.addEventListener("mouseleave", () => {

        tarjeta.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

});

// ==============================================
// BARRAS DE HABILIDADES
// ==============================================

const progresos = document.querySelectorAll(".progreso");

function animarHabilidades(){

    const habilidades = document.querySelector(".habilidades");

    if(!habilidades){
        return;
    }

    const posicion = habilidades.getBoundingClientRect().top;

    const alturaPantalla = window.innerHeight;

    if(posicion < alturaPantalla - 100){

        progresos.forEach(function(progreso, indice){

            const porcentaje =
                progreso.getAttribute("data-progreso");

            setTimeout(function(){

                progreso.style.width = porcentaje + "%";

            }, indice * 200);

        });

        window.removeEventListener("scroll", animarHabilidades);

    }

}

window.addEventListener("scroll", animarHabilidades);

animarHabilidades();

// ==============================================
// CONTADORES ANIMADOS
// ==============================================

const numeros = document.querySelectorAll(".numero");

let contadoresIniciados = false;

function animarContadores(){

    const seccionSobreMi = document.querySelector("#sobre-mi");

    if(!seccionSobreMi){
        return;
    }

    const posicion = seccionSobreMi.getBoundingClientRect().top;
    const alturaPantalla = window.innerHeight;

    if(posicion < alturaPantalla - 150 && !contadoresIniciados){

        contadoresIniciados = true;

        numeros.forEach(function(numero){

            const objetivo = Number(
                numero.getAttribute("data-valor")
            );

            const esPorcentaje =
                numero.getAttribute("data-porcentaje") === "true";

            let actual = 0;

            const incremento = objetivo / 60;

            function contar(){

                actual += incremento;

                const valorMostrado =
                    actual < objetivo
                        ? Math.floor(actual)
                        : objetivo;

                numero.textContent =
                    esPorcentaje
                        ? valorMostrado + "%"
                        : valorMostrado;

                if(actual < objetivo){

                    requestAnimationFrame(contar);

                }

            }

            contar();

        });

    }

}

window.addEventListener("scroll", animarContadores);

animarContadores();
// ==============================================
// FORMULARIO AJAX
// ==============================================

const formulario = document.getElementById("formulario");

const botonEnviar = document.getElementById("btn-enviar");

const mensaje = document.getElementById("mensaje-enviado");

formulario.addEventListener("submit", async function(e){

    e.preventDefault();

    botonEnviar.disabled = true;

    botonEnviar.textContent = "Enviando...";

    const datos = new FormData(formulario);

    const respuesta = await fetch(formulario.action,{

        method:"POST",

        body:datos,

        headers:{
            "Accept":"application/json"
        }

    });

    if(respuesta.ok){

        formulario.reset();

        mensaje.textContent = "✅ Mensaje enviado correctamente.";

        mensaje.classList.add("mostrar");

    }else{

        mensaje.textContent = "❌ Ocurrió un error.";

        mensaje.classList.add("mostrar");

    }

    botonEnviar.disabled = false;

    botonEnviar.textContent = "Enviar mensaje";

});

