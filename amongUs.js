class Sabotaje {
	constructor(nombre, incrementoSospecha) {
		this.nombre = nombre;
		this.incrementoSospecha = incrementoSospecha;
	}

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
