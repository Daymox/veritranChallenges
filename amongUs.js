class Jugador {
	constructor(color, personalidad) {
		this.color = color;
		this.personalidad = personalidad;
		this.nivelSospecha = 40;
		this.mochila = [];
		this.tareaRealizadas = [];
		this.impugnado = false;
	}

	// -- Punto #1 -- //
	esSospechoso() {
		return this.nivelSospecha > 50;
	}

	// -- Punto #2 -- //
	agregarItem(item) {
		this.mochila.push(item);
	}

	// -- Punto #3 -- //
	completarTareas() {
		if (this.tareaRealizadas.length === todasTareas.length) {
			throw new Error('Ganaron los Tripulantes');
		}
	}

	// -- Punto #4 -- //
	realizarTarea(tarea) {
		if (this.mochila.includes(tarea.requerimiento)) {
			this.nivelSospecha += tarea.incrementoSospecha;
			this.tareaRealizadas.push(tarea);
			return true;
		}
		return false;
	}
}

class Sabotaje {
	constructor(nombre, incrementoSospecha) {
		this.nombre = nombre;
		this.incrementoSospecha = incrementoSospecha;
	}
	
	// -- Punto #5 -- //
	realizarSabotaje() {
		if (this.nombre === 'Reducir el oxigeno') {
			const barraOxigeno = nave.tieneBarraOxigeno();
			if (!barraOxigeno) {
				nave.reducirOxigeno(10);
			}

			if (nave.getNivelOxigeno() === 0) {
				throw new Error('Ganaron los Impostores');
			}
		} else if (this.nombre === 'Impugnar un Jugador') {
			const jugadorImpugnado =
				jugadores[Math.floor(Math.random() * jugadores.length)];
			jugadorImpugnado.impugnado = true;
		}

		impostor.aumentarSospecha(this.incrementoSospecha);
	}
}
