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

class Votacion {

	// -- Punto #6 -- //
	static llamarReunionEmergencia(jugadores) {
		const votos = new Map();

		jugadores.forEach((jugador) => {
			let voto;
			console.log(jugador);

			if (jugador.impugnado) {
				voto = null;
			} else if (jugador.personalidad === 'troll') {
				voto = jugadores.find((p) => p.personalidad !== 'sospechoso');
				console.log(voto);
			} else if (jugador.personalidad === 'detective') {
				const maximaSospechaJugador = jugadores.reduce(
					(maxJugador, jugadorActual) =>
						jugadorActual.nivelSospecha > maxJugador.nivelSospecha
							? jugadorActual
							: maxJugador
				);
				voto = maximaSospechaJugador;
			} else if (jugador.personalidad === 'materialista') {
				voto = jugadores.find((p) => p.mochila.length === 0);
			} else {
				voto = jugadores[Math.floor(Math.random() * jugadores.length)];
			}

			votos.set(jugador, voto);
		});

		/* ------------------------------ Contar Votos ------------------------------ */
		const contadorVotos = new Map();
		votos.forEach((jugadorVotado, votante) => {
			const contador = contadorVotos.get(jugadorVotado) || 0;
			contadorVotos.set(jugadorVotado, contador + 1);
		});

		/* --------------------- Encontrar Jugador con mas Votos -------------------- */
		let jugadorMasVotado;
		let maximosVotos = 0;

		for (const [jugador, contador] of contadorVotos) {
			if (
				contador > maximosVotos ||
				(contador === maximosVotos && Math.random() > 0.5)
			) {
				jugadorMasVotado = jugador;
				maximosVotos = contador;
			}
		}

		/* -------------------------- Manejar la Expulsion -------------------------- */
		if (jugadorMasVotado) {
			console.log('Expulsado el jugador: ', jugadorMasVotado.color);
			const index = jugadores.indexOf(jugadorMasVotado);
			jugadores.splice(index, 1);
		} else {
			console.log('Voto en blanco. Nadie fue expulsado');
		}

		/* ---------------- Verificar Ganadores Después de Expulsión ---------------- */
		const impostores = jugadores.filter(
			(jugador) => jugador.personalidad === 'impostor'
		);
		const tripulantes = jugadores.filter(
			(jugador) => jugador.personalidad !== 'impostor'
		);

		if (impostores.length === 0) {
			console.log('¡Ganaron los Tripulantes!');
		} else if (impostores.length >= tripulantes.length) {
			console.log('¡Ganaron los Impostores!');
		}
	}
}
