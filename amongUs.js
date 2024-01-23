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
}
