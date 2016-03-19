function SimulacaoRejuvenescimento(rho, lambda, tempoFinal) {
  this.rho = rho;
  this.lambda = lambda;
  this.tempoFinal = tempoFinal;
}

SimulacaoRejuvenescimento.prototype.getSimulador = function() {
  return new SimuladorRejuvenescimento(this.tempoFinal, this.rho, this.lambda);
}

SimulacaoRejuvenescimento.prototype.XEstrela = function(l, s) {
    return l/(l+s);
}
