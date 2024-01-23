class Jugador {
	constructor(color, personalidad) {
		this.color = color;
		this.personalidad = personalidad;
		this.nivelSospecha = 40;
		this.mochila = [];
		this.tareaRealizadas = [];
		this.impugnado = false;
	}

	agregarItem(item) {
		this.mochila.push(item);
	}
}
