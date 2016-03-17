function SimuladorDeterministico(tempoFinal, classeObrigatoria, classes) {
	return Simulador(tempoFinal, classeObrigatoria, classes);
}

SimuladorDeterministico.prototype.getClasseRandomLambda(classe) {
	return Random.Deterministico(classe.getLambda());
}