//Questao 9

function SimulacaoRejuvenescimento {
  this.rho = 0.8;
  this.lambda = 0.5;
  this.tempoFinal = 100000;
}

SimulacaoRejuvenescimento.prototype.getSimulador = function()
{
  return new SimuladorRejuvenecimento(tempoFinal, rho, lambda);
}

SimulacaoRejuvenescimento.prototype.getMetrica = function() {
  return this.getSimulador().executar();
}

SimulacaoRejuvenescimento.prototype.XEstrela = function(l, s) {
    return l(l+s);
}

        /*System.out.println(String.format("3.1) Seja p a probabilidade de falhar, logo p(simulacao) = %f", metrica.getProbabilidadeDeFalhar()));
        System.out.println(String.format("3.1) Seja p a probabilidade de falhar, logo p(analítico) = %f", XEstrela(lambda,rho) ));
        System.out.println("-------------------------------------------");
        System.out.println(String.format("3.2) Numero de vezes que o sistema reinicia, até falhar, por simulacao = %f", metrica.getnRejuvenecimentoAteFalhar()));
        System.out.println(String.format("3.2) Numero de vezes que o sistema reinicia, até falhar, analítico %f", 1/XEstrela(lambda,rho)));
        System.out.println("-------------------------------------------");
        System.out.println(String.format("3.3) Tempo do último rejuvenescimento   até a falha, simulacao = %f", metrica.getTempoUltimoRejuvenescimento()));
        System.out.println(String.format("3.3) Tempo do último rejuvenescimento   até a falha, analítico = %f", (1/(lambda + rho))));*/
