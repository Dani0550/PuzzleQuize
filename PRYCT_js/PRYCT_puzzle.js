const zonaPrincipal = document.querySelector(".sitios");
const imgs  = document.querySelectorAll(".piezas_img");
const zonas = document.querySelectorAll(".sitios_img");
const seleccion = document.querySelector(".seleccion");
const elegirImagenes = document.querySelectorAll(".selec_img");
const juego = document.querySelector(".juego");
const siguiente = document.querySelector(".siguiente");
const atras = document.querySelector(".atras");
const movimientos = document.querySelector(".movimientos");
const time = document.querySelector(".time");

let tiempoInicio = 0;
let intervalo;
let tiempoFinal;
function actualizarReloj() {
    const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000); // Calcula el tiempo en segundos
    const horas = Math.floor(tiempoTranscurrido / 3600);
    const minutos = Math.floor((tiempoTranscurrido % 3600) / 60);
    const segundos = tiempoTranscurrido % 60;

    const horaFormateada = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    time.textContent = horaFormateada;
    tiempoFinal = horaFormateada;
}

const elegirPuzzle = p => {
	if(getComputedStyle(seleccion).display == "flex"){
		juego.classList.toggle("juegoOpacity", true);
		elegirImagenes.forEach(imagen => {
			imagen.addEventListener("click", e => {
				imagen.classList.add("vigente");
				seleccion.classList.toggle("noSeleccion", true);
				if (seleccion.classList.contains("noSeleccion")){
					juego.classList.remove("juegoOpacity");
					juego.classList.toggle("juegoAparecer", true)
				}

				tiempoInicio = Date.now();
				intervalo = setInterval(actualizarReloj, 1000);	

				if(elegirImagenes[0].classList.contains("vigente")){ siguiente.value = "1"; atras.value = "1" }
				else if (elegirImagenes[1].classList.contains("vigente")){ siguiente.value = "2"; atras.value = "2" }
				else if (elegirImagenes[2].classList.contains("vigente")){ siguiente.value = "3"; atras.value = "3" }
				else if (elegirImagenes[3].classList.contains("vigente")){ siguiente.value = "4"; atras.value = "4" }
				else if (elegirImagenes[4].classList.contains("vigente")){ siguiente.value = "5"; atras.value = "5" }
				else if (elegirImagenes[5].classList.contains("vigente")){ siguiente.value = "6"; atras.value = "6" }

				const backgroundImg = getComputedStyle(imagen).backgroundImage;
				// console.log(backgroundImg);
				imgs.forEach(img => {
					img.style.backgroundImage = backgroundImg;
				})
			})
		})
	}
}
elegirPuzzle();

let movimientoDrop = 0;

const contar = c => {
	movimientoDrop++;
	movimientos.innerHTML = `MOVIMIENTOS: ${movimientoDrop}`;
	return movimientoDrop;
}

let totalEventos = [];
let movimientoValue;
const entradaZonas = (z) => {
    z.forEach(zona => {
        zona.addEventListener("dragenter", e => {
            e.preventDefault();
            console.log("entró");
        });
        zona.addEventListener("dragover", e => {
            e.preventDefault();
        });
        zona.addEventListener("drop", e => {
            e.preventDefault();
            zona.classList.add('sitios_premium');
            zona.style.backgroundImage = e.dataTransfer.getData('text/plain');
            zona.style.backgroundPosition = e.dataTransfer.getData("position/img");
            totalEventos.push(zona.dataset.value);
            movimientoValue = contar();
        });
    });
};

const realizarPuzzle = (e) => {
    imgs.forEach(img => {
        img.addEventListener("dragstart", e => {
            const estilo = getComputedStyle(img);
            const backgPosition = estilo.backgroundPosition;
            const backgroundImg = estilo.backgroundImage;
            e.dataTransfer.setData('text/plain', backgroundImg);
            e.dataTransfer.setData("position/img", backgPosition);
            console.log(backgroundImg);
        });
    });
    entradaZonas(zonas);
}
realizarPuzzle();

// PANEL DE CONTROL

		// AJUSTES
const ajustes = document.querySelector(".ajustes");
const ajustesContainer = document.querySelector(".prueba");
ajustes.addEventListener("click", e => {
	if (ajustesContainer.classList.contains("ajustesDesaparecer")){
		ajustesContainer.classList.remove("ajustesDesaparecer");
		ajustesContainer.classList.toggle("ajustesAparicion", true)
	} else{
		ajustesContainer.classList.toggle("ajustesAparicion", true);
	}
})
const volverBtn = document.querySelector(".ajustesVolverBtn");
volverBtn.addEventListener("click", e => {
	ajustesContainer.classList.remove("ajustesAparicion");
	ajustesContainer.classList.toggle("ajustesDesaparecer");
})

		// LIMPIAR

const limpiar = document.querySelector(".limpiar");
limpiar.addEventListener("click", e=>{
	zonas.forEach( zona => {
		zona.style.backgroundImage = "url(#)"
	})
})

		// MEZCLAR
const mezclar = document.querySelector(".mezclar");
mezclar.addEventListener("click", e=>{

	let pieza1 = getComputedStyle(imgs[0]).backgroundPosition;
	let pieza2 = getComputedStyle(imgs[1]).backgroundPosition;
	let pieza3 = getComputedStyle(imgs[2]).backgroundPosition;
	let pieza4 = getComputedStyle(imgs[3]).backgroundPosition;
	let pieza5 = getComputedStyle(imgs[4]).backgroundPosition;
	let pieza6 = getComputedStyle(imgs[5]).backgroundPosition;
	let pieza7 = getComputedStyle(imgs[6]).backgroundPosition;
	let pieza8 = getComputedStyle(imgs[7]).backgroundPosition;
	let pieza9 = getComputedStyle(imgs[8]).backgroundPosition;
	
	console.log(`${pieza1} // ${pieza2} // ${pieza3} // ${pieza4} // ${pieza5} // ${pieza6} // ${pieza7} // ${pieza8} // ${pieza9}`);

	const arregloMezcla1 = m => {
		m[0].style.backgroundPosition = pieza4;
		m[1].style.backgroundPosition = pieza7;
		m[2].style.backgroundPosition = pieza9;
		m[3].style.backgroundPosition = pieza5;
		m[4].style.backgroundPosition = pieza2;
		m[5].style.backgroundPosition = pieza1;
		m[6].style.backgroundPosition = pieza8;
		m[7].style.backgroundPosition = pieza3;
		m[8].style.backgroundPosition = pieza6;
	}
	arregloMezcla1(imgs);
})

		// SIGUIENTE
const cambioImagen = imagen => {
	imgs.forEach(img => {
		img.style.backgroundImage = imagen;
	})
}

const celebrar = document.querySelector(".juego_terminado");
const verPuntaje = (p, s, t) => {
	const tuScore = document.querySelector(".tu");
	const mensaje = document.querySelector(".mensaje");
	const tiempoTotal = document.querySelector(".tiempoTotal");
	if(p == 6){
		tuScore.innerHTML = `Tu <span>${s}</span>`;
		celebrar.classList.toggle("celebracion_aparece", true);
		mensaje.classList.toggle("mensaje_aparece", true);

		clearInterval(intervalo);
		tiempoTotal.classList.toggle("tiempo_aparece", true);
		tiempoTotal.innerHTML = t;

		if (s < 25){mensaje.innerHTML = `<h2 style="color:red">¡Aún puedes mejorar!</h2>`}
		else if (25 < s < 35){mensaje.innerHTML = `<h2 style="color:green">¡Se te da bien!</h2>`}
		else if (35 < s < 50){mensaje.innerHTML = `<h2 style="color:green">¡Eres muy bueno!</h2>`}
		else if (50 < s < 60){mensaje.innerHTML = `<h2 style="color:green">¡Excelente!</h2>`}
		else if (s == 60){mensaje.innerHTML = `<h2 style="color:green">¡Rompiste todos los récords!</h2>`}
	}
};
const score = document.querySelector(".score");
let scoreAcumulado = 0;
let numeroSiguiente = 1;
let cantidadSiguientes;
siguiente.addEventListener("click", e=>{
	if (zonas[0].style.backgroundPosition == "0px 0px" &&
		zonas[1].style.backgroundPosition == "50% 0px" &&
		zonas[2].style.backgroundPosition == "100% 0px" &&
		zonas[3].style.backgroundPosition == "0% 50%" &&
		zonas[4].style.backgroundPosition == "50% 50%" &&
		zonas[5].style.backgroundPosition == "100% 50%" &&
		zonas[6].style.backgroundPosition == "0px 100%" &&
		zonas[7].style.backgroundPosition == "50% 100%" &&
		zonas[8].style.backgroundPosition == "100% 100%"){	

		zonaPrincipal.classList.add("gapReduce");
		setTimeout(e => {
			zonaPrincipal.classList.remove("gapReduce");
			zonaPrincipal.classList.toggle("gapReestablece", true);
			zonas.forEach(zona => {
				zona.style.backgroundImage = "url(#)"
				zona.style.backgroundPosition = "0px 0px"
			})
		}, 1000);
		if (zonaPrincipal.classList.contains("gapReestablece")){
			zonaPrincipal.classList.remove("gapReestablece");
		}


		if (siguiente.value == "1"){cambioImagen(getComputedStyle(elegirImagenes[1]).backgroundImage); siguiente.value = "2"}
		else if (siguiente.value == "2"){cambioImagen(getComputedStyle(elegirImagenes[2]).backgroundImage); siguiente.value = "3"}
		else if (siguiente.value == "3"){cambioImagen(getComputedStyle(elegirImagenes[3]).backgroundImage); siguiente.value = "4"}
		else if (siguiente.value == "4"){cambioImagen(getComputedStyle(elegirImagenes[4]).backgroundImage); siguiente.value = "5"}
		else if (siguiente.value == "5"){cambioImagen(getComputedStyle(elegirImagenes[5]).backgroundImage); siguiente.value = "6"}
		else if (siguiente.value == "6"){cambioImagen(getComputedStyle(elegirImagenes[0]).backgroundImage); siguiente.value = "1"}

		let scoreMaximo = 90;
		let resultadoScore = scoreMaximo/movimientoValue;
		scoreAcumulado += resultadoScore;
		score.innerHTML = `Score: ${resultadoScore.toFixed(2)}`;
		movimientoDrop = 0;
		console.log(scoreAcumulado);

		cantidadSiguientes = numeroSiguiente++;
	}
	console.log(cantidadSiguientes);
	verPuntaje(cantidadSiguientes, scoreAcumulado.toFixed(2), tiempoFinal);
})

		// ATRAS
atras.addEventListener("click", e => {
	let lastEvent = totalEventos.pop();
	zonas.forEach(zona => {
		if (zona.dataset.value == lastEvent){
			zona.style.backgroundImage = "url(#)";
		}
	})
})


		// IDIOMA
const idioma = document.querySelector(".idioma");
idioma.addEventListener("click", e => {
	const containerIdioma = document.querySelector(".idioma_container");
	if (containerIdioma.classList.contains("idiomaAnim")){
		containerIdioma.classList.remove("idiomaAnim");
		containerIdioma.classList.toggle("anim", true);
	}
	else{
		containerIdioma.classList.toggle("anim", true);
	}
})

const inglesButton = document.querySelector(".ingles_button");
inglesButton.addEventListener("click", e => {
	const containerIdioma = document.querySelector(".idioma_container");
	if (document.title == "PROYECTO PUZZLE english"){
		containerIdioma.classList.remove("anim");
		containerIdioma.classList.toggle("idiomaAnim", true);
	}
	else{
		location.href = "en/index.html";
	}
})

const españolButton = document.querySelector(".español_button");
españolButton.addEventListener("click", e => {
	const containerIdioma = document.querySelector(".idioma_container");
	if (document.title == "PROYECTO PUZZLE"){
		containerIdioma.classList.remove("anim");
		containerIdioma.classList.toggle("idiomaAnim", true);
	}
	else{
		location.href = "../PRYCT_puzzle.html";
	}
})
