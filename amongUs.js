class Votacion {
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
