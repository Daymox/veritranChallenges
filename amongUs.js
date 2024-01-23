class Jugador {
	constructor(color, personalidad) {
		this.color = color;
		this.personalidad = personalidad;
		this.nivelSospecha = 40;
		this.mochila = [];
		this.tareaRealizadas = [];
		this.impugnado = false;
	}

	realizarTarea(tarea) {
		if (this.mochila.includes(tarea.requerimiento)) {
			this.nivelSospecha += tarea.incrementoSospecha;
			this.tareaRealizadas.push(tarea);
			return true;
		}
		return false;
	}

	completarTareas() {
		if (this.tareaRealizadas.length === todasTareas.length) {
			throw new Error('Ganaron los Tripulantes');
		}
	}
}
