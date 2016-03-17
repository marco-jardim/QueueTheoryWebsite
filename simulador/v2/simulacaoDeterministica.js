//require simulacao

//falta resto q vem de Simulacao

function SimulacaoDeterministica(classe1, classe2) {
	return Simulacao(classe1, classe2);
}

SimulacaoDeterministica.prototype.getSimulador(tempoFinal, classe1, classe2) {
	if (classe2)
		return new SimuladorDeterministico(tempoFinal, classe1, classe2);
	else
		return new SimuladorDeterministico(tempoFinal, classe1);
}
