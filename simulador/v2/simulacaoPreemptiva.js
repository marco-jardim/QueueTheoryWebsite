//require simulacao

//falta resto q vem de Simulacao

function SimulacaoPreemptiva(classe1, classe2) {
	return Simulacao(classe1, classe2);
}

SimulacaoPreemptiva.prototype.getSimulador = function(tempoFinal, classe1, classe2) {
	if (classe2)
		return new SimuladorPreemptivo(tempoFinal, classe1, classe2);
	else
		return new SimuladorPreemptivo(tempoFinal, classe1);
}
