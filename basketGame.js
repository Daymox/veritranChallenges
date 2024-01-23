const Estilo = {
	Tirador: 'tirador',
	Pasador: 'pasador',
	Reboteador: 'reboteador',
};
class Jugador {
	constructor(
		nombre,
		altura,
		eficaciaTriples,
		inteligencia,
		talento,
		sucio,
		estilo
	) {
		this.nombre = nombre;
		this.altura = altura;
		this.eficaciaTriples = eficaciaTriples;
		this.inteligencia = inteligencia;
		this.talento = talento;
		this.sucio = sucio;
		this.estilo = estilo;
		this.stamina = 100;
	}

	esCrack() {
		const habilidad = this.calcularHabilidad();

		return habilidad;
	}

	esLeyenda() {
		if (this.esCrack()) {
			return true;
		}
		return false;
	}

	calcularHabilidad() {
		let habilidad;

		switch (this.estilo) {
			case 'tirador':
				habilidad =
					(this.eficaciaTriples * 2 +
						(this.inteligencia + this.talento) / 2 +
						this.altura / 2) /
					2;

				if (this.sucio) {
					habilidad *= 0.85;
				}
				break;

			case 'pasador':
				habilidad =
					((this.inteligencia + this.talento) / 2 +
						this.altura * 0.8 +
						this.eficaciaTriples * 0.3) /
					5;
				break;

			case 'reboteador':
				habilidad =
					(this.altura * 2 + (this.inteligencia - this.talento) / 3) / 5;

				if (this.sucio) {
					habilidad *= 1.2;
				}

				break;
		}

		return habilidad > 0 ? habilidad : 0;
	}

	entrenar() {
		switch (this.estilo) {
			case 'tirador':
				this.stamina -= 3;
				break;

			case 'pasador':
				this.stamina -= 5;
				break;

			case 'reboteador':
				this.stamina -= 8;
				break;
		}

		return (this.stamina = Math.max(0, this.stamina));
	}

	descansar(puntosRecuperados) {
		this.stamina += puntosRecuperados;
		this.stamina = Math.min(100, this.stamina);
	}
}

class Entrenador {
	constructor(nombre, apellido, edad, multiplicadorHabilidad) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.edad = edad;
		this.multiplicadorHabilidad = multiplicadorHabilidad;
	}

	entrenarEquipo(equipo) {
		equipo.jugadores.forEach((jugador) => {
			jugador.entrenar();
			jugador.eficaciaTriples *= 1.1; // Aumenta la eficacia en un 10%
			jugador.talento *= 1.1; // Aumenta el talento en un 10%
		});
	}

	definirEntrenador(equipo) {
		const valoracionOriginal = equipo.valoracion;
		const fino = equipo.jugadores.every(
			(jugador) => 100 - jugador.stamina <= 4
		);

		if (fino) {
			equipo.valoracion *= 1.3;
			return 'Finos';
		}

		const motivador = valoracionOriginal < 75;
		if (motivador) {
			equipo.valoracion *= 1.5;
			return 'Motivadores';
		}

		const vendeHumo = equipo.jugadores.find((jugador) => jugador.esLeyenda());
		if (vendeHumo) {
			equipo.valoracion *= 1.25;
			return 'Vende Humo';
		} else {
			equipo.valoracion *= 0.85;
			return 'Vende Humo';
		}
	}
}

class Equipo {
	constructor(jugadores, entrenador) {
		this.jugadores = jugadores;
		this.entrenador = entrenador;
		this.valoracion = 0;
	}

	esDreamTeam() {
		const leyenda = this.jugadores.find((jugador) => jugador.esLeyenda());

		if (leyenda) {
			return true;
		} else {
			return false;
		}
	}

	obtenerValoracionTotal() {
		return this.calcularValoracionTotal();
	}

	calcularValoracionTotal() {
		const habilidades = this.jugadores.map((jugador) =>
			jugador.calcularHabilidad()
		);

		const valoracionPromedio =
			habilidades.reduce((sumatoria, habilidad) => sumatoria + habilidad, 0) /
			this.jugadores.length;

		let bonificacion = 0;

		const sucios = this.jugadores.every((jugador) => jugador.sucio);
		if (sucios || !sucios) {
			bonificacion += 10;
		}

		bonificacion += this.entrenador.multiplicadorHabilidad * valoracionPromedio;
		this.valoracion = valoracionPromedio + bonificacion;

		return this.valoracion;
	}
}

/* -------------------------------------------------------------------------- */
/*                               Casos de Prueba                              */
/* -------------------------------------------------------------------------- */
const juan = new Jugador('Juan', 180, 60, 30, 60, true, 'tirador');
const franco = new Jugador('Franco', 200, 10, 70, 70, true, 'reboteador');
const aye = new Jugador('Aye', 167, 35, 80, 85, false, 'pasador');

const equipoPdeP = new Equipo(
	[juan, franco, aye],
	new Entrenador('Felipe', 'Scarpa', 25, 0.2)
);

console.log('Habilidad de Juan: ', juan.calcularHabilidad());
console.log('Habilidad de Franco: ', franco.calcularHabilidad());
console.log('Habilidad de Aye: ', aye.calcularHabilidad());

juan.entrenar();
console.log('Stamina de Juan después de entrenar: ', juan.stamina);
franco.entrenar();
console.log('Stamina de Franco después de entrenar: ', franco.stamina);
aye.entrenar();
console.log('Stamina de Aye después de entrenar: ', aye.stamina);

const lebron = new Jugador('Lebron James', 700, 90, 95, 90, true, 'pasador');
console.log(
	'¿Lebron es leyenda? ',
	lebron.calcularHabilidad() > 90 ? 'Si' : 'No'
);

console.log('¿Juan es leyenda? ', juan.calcularHabilidad() > 90 ? 'Si' : 'No');

const scarpa = new Entrenador('Felipe', 'Scarpa', 25, 0.2);
scarpa.entrenarEquipo(equipoPdeP);
console.log(
	'La valoración total del equipo PdeP con Felipe Scarpa es: ',
	equipoPdeP.calcularValoracionTotal()
);

console.log('¿PdeP es DreamTeam? ', equipoPdeP.esDreamTeam() ? 'Si' : 'No');

const caruso = new Entrenador('Ricardo', 'Caruso', 58, 0);
const equipoLakers = new Equipo(
	[juan, lebron, aye],
	new Entrenador('Ricardo', 'Caruso', 58, 0.2)
);
caruso.entrenarEquipo(equipoLakers);
console.log(
	'La valoración total del equipo Lakers con Ricardo Caruso es: ',
	equipoLakers.calcularValoracionTotal()
);

caruso.definirEntrenador(equipoPdeP);
console.log(
	'La valoración total del equipo PdeP con Ricardo Caruso es: ',
	equipoPdeP.calcularValoracionTotal()
);

const hammon = new Entrenador('Backy', 'Hammon', 43, 0.3);
hammon.entrenarEquipo(equipoPdeP);
console.log(
	'La valoración total del equipo PdeP con Becky Hammon es: ',
	equipoPdeP.calcularValoracionTotal()
);
