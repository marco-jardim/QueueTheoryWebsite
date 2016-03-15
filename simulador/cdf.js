var myrand = {
  random: {
    // random exponential function from https://gist.github.com/nicolashery/5885280
    exponential: function(rate, randomUniform) {
      rate = rate || 1;

      // Allow to pass a random uniform value or function
      // Default to Math.random()
      var U = randomUniform;
      if (typeof randomUniform === 'function') U = randomUniform();
      if (!U) U = Math.random();

      return -Math.log(U)/rate;
    },

    uniform: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }
}

function switchCenario(MAX_AMOSTRAS, EXERCICIO){
  if (EXERCICIO == '6.1') { //Para o Exercicio 6.1, usa-se o cenario 1 //
    lambda1 = 0.9;
    mi1 = 1.0;

    result_cenario1 = geraListaCdfSimulacao(MAX_AMOSTRAS, lambda1, "exponencial", mi1, 0.0, null, null);

    lista_cdf = geraListaCdfExponencial(MAX_AMOSTRAS, 1);

    lista_plot_simulacao = [];
    lista_plot_cdf = [];
    for (i = 0; i < MAX_AMOSTRAS; i++) {
      lista_plot_simulacao.push( (result_cenario1.lista_intervalos[i], result_cenario1.lista_indice[i]) );
      lista_plot_cdf.push( (lista_cdf[i], result_cenario1.lista_indice[i]) );
      //(lista_lambda, lista_fila) = geraListaCDF(MAX_AMOSTRAS, lambda1, "exponencial", mi1, lambda2, "exponencial", mi2)
    }

    return (lista_plot_simulacao, lista_plot_cdf);
  }

  if (EXERCICIO == '6.2') { //Para o Exercicio 6.2, usa-se os cenario 2, 3 e 4 //
    //Cenário 2//
    lambda1 = 0.6;
    mi1 = 1.0;
    lambda2 = 0.2;
    mi2 = 0.5;
    result_cenario2 = geraListaCdfSimulacao(MAX_AMOSTRAS, lambda1, "exponencial", mi1, lambda2, "exponencial", mi2);
    result_cenario3 = geraListaCdfSimulacao(MAX_AMOSTRAS, lambda1, "deterministica", mi1, lambda2, "deterministica", mi2);

    lambda1 = 0.08;
    lambda2 = 0.05;
    mi1 = [5, 15];
    mi2 = [1, 3];
    result_cenario4 = geraListaCdfSimulacao(MAX_AMOSTRAS, lambda1, "uniforme", mi1, lambda2, "uniforme", mi2);

    lista_cdf = geraListaCdfExponencial(MAX_AMOSTRAS, 1);

    lista_plot_simulacao_c2 = [];
    lista_plot_simulacao_c3 = [];
    lista_plot_simulacao_c4 = [];
    lista_plot_cdf = [];

    for (i = 0; i < MAX_AMOSTRAS; i++) {
      lista_plot_simulacao_c2.push( (result_cenario2.lista_intervalos[i], result_cenario2.lista_indice[i]) );
      lista_plot_simulacao_c3.push( (result_cenario3.lista_intervalos[i], result_cenario2.lista_indice[i]) );
      lista_plot_simulacao_c4.push( (result_cenario4.lista_intervalos[i], result_cenario2.lista_indice[i]) );
      lista_plot_cdf.push( (lista_cdf[i], result_cenario2.lista_indice[i]) );
      //(lista_lambda, lista_fila) = geraListaCDF(MAX_AMOSTRAS, lambda1, "exponencial", mi1, lambda2, "exponencial", mi2)
    }
    return {lista_plot_simulacao_c2, lista_plot_simulacao_c3, lista_plot_simulacao_c4, lista_plot_cdf};
  }
}


function geraListaCdfSimulacao(MAX_AMOSTRAS, taxaChegada1, tipoSaida1, taxaSaida1, taxaChegada2=null, tipoSaida2=null, taxaSaida2=null){  num_saidas_consecutivas = 0
  intervalo_atual = 0;
  lista_intervalos = [];

  if (tipoSaida1 == "exponencial" && tipoSaida2 == null) { //Tipos do Cenário 1
    while (lista_intervalos.length < MAX_AMOSTRAS) {
      tempo_chegada1 = myrand.random.exponential(1.0/taxaChegada1); //Pega um tempo de chegada
      tempo_saida1 = myrand.random.exponential(1.0/taxaSaida1); //Pega um tempo de saída

      //Confere qual tempo é menor e atribui se o próximo evento  é chegada ou saída
      if (tempo_saida1 < tempo_chegada1) { //Se o tempo de saída é menor, ocorreu uma saída
        num_saidas_consecutivas+=1;
        if (num_saidas_consecutivas == 2) {
          intervalo_atual += tempo_saida1;
          lista_intervalos.push(intervalo_atual);
          intervalo_atual = 0;
          num_saidas_consecutivas = 1;
        }
      }
      else if (tempo_saida1 > tempo_chegada1){ //Ocorreu uma chegada, somar tempo
        intervalo_atual += tempo_chegada1;
      }
    }
  }
  else if (tipoSaida1 == "exponencial" && tipoSaida2 == "exponencial") { //Tipos do Cenário 2
    while (lista_intervalos.length < MAX_AMOSTRAS) {
      tempo_chegada1 = myrand.random.exponential(1.0/taxaChegada1); //Pega um tempo de chegada;
      tempo_chegada2 = myrand.random.exponential(1.0/taxaChegada2); //Pega um tempo de chegada;
      tempo_saida1 = myrand.random.exponential(1.0/taxaSaida1); //Pega um tempo de saída;
      tempo_saida2 = myrand.random.exponential(1.0/taxaSaida2); //Pega um tempo de saída;

      menor_tempo = Math.min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2);
      //Confere qual tempo é menor e atribui se o próximo evento  é chegada ou saída

      if (menor_tempo == tempo_saida1 || menor_tempo == tempo_saida2) {
        num_saidas_consecutivas+=1;
        if (num_saidas_consecutivas == 2) {
          intervalo_atual += menor_tempo;
          lista_intervalos.push(intervalo_atual);
          intervalo_atual = 0;
          num_saidas_consecutivas = 1;
        }
      }
      else if (menor_tempo == tempo_chegada1 || menor_tempo == tempo_chegada2) { //Ocorreu uma chegada, somar tempo
          intervalo_atual += menor_tempo;
      }
    }
  }

  else if (tipoSaida1 == "deterministica" || tipoSaida2 == "deterministica") { //Tipos do Cenário 3
    tempo_saida1 = 1.0/taxaSaida1; //Pega um tempo de saída;
    tempo_saida2 = 1.0/taxaSaida2; //Pega um tempo de saída;
    while (lista_intervalos.length < MAX_AMOSTRAS) {
      tempo_chegada1 = myrand.random.exponential(1.0/taxaChegada1); //Pega um tempo de chegada
      tempo_chegada2 = myrand.random.exponential(1.0/taxaChegada2); //Pega um tempo de chegada

      menor_tempo = Math.min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2);
      // Confere qual tempo é menor e atribui se o próximo evento  é chegada ou saída
      if (menor_tempo == tempo_saida1) {
        num_saidas_consecutivas+=1;
        tempo_saida1 = 1.0/taxaSaida1;
        tempo_saida2 = tempo_saida2 - menor_tempo;
        if (num_saidas_consecutivas == 2) {
          intervalo_atual += menor_tempo;
          lista_intervalos.push(intervalo_atual);
          intervalo_atual = 0;
          num_saidas_consecutivas = 1;
        }
      }
      else if (menor_tempo == tempo_saida2) {
        num_saidas_consecutivas+=1;
        tempo_saida1 = tempo_saida1 - menor_tempo;
        tempo_saida2 = 1.0/taxaSaida2;
        if (num_saidas_consecutivas == 2) {
          intervalo_atual += menor_tempo;
          lista_intervalos.push(intervalo_atual);
          intervalo_atual = 0;
          num_saidas_consecutivas = 1;
        }
      }
      else if (menor_tempo == tempo_chegada1 || menor_tempo == tempo_chegada2) { //#Ocorreu uma chegada, somar tempo
        intervalo_atual += menor_tempo;
        tempo_saida1 = tempo_saida1 - menor_tempo;
        tempo_saida2 = tempo_saida2 - menor_tempo;
      }
    }
  }

  else if (tipoSaida1 == "uniforme" && tipoSaida2 == "uniforme") {  //Tipos do Cenário 3
    tempo_saida1 = myrand.random.uniform(taxaSaida1[0], taxaSaida1[1]);
    tempo_saida2 = myrand.random.uniform(taxaSaida2[0], taxaSaida2[1]);

    while (lista_intervalos.length < MAX_AMOSTRAS) {
      tempo_chegada1 = myrand.random.exponential(1.0/taxaChegada1); //Pega um tempo de chegada;
      tempo_chegada2 = myrand.random.exponential(1.0/taxaChegada2); //Pega um tempo de chegada;

      menor_tempo = Math.min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2);
      //Confere qual tempo é menor e atribui se o próximo evento  é chegada ou saída
      if (menor_tempo == tempo_saida1) {
        num_saidas_consecutivas+=1;
        tempo_saida1 = myrand.random.uniform(taxaSaida1[0], taxaSaida1[1]);
        tempo_saida2 = tempo_saida2 - menor_tempo;

        if (num_saidas_consecutivas == 2) {
          intervalo_atual += menor_tempo;
          lista_intervalos.push(intervalo_atual);
          intervalo_atual = 0;
          num_saidas_consecutivas = 1;
        }
      }
      else if (menor_tempo == tempo_saida2) {
        num_saidas_consecutivas+=1;
        tempo_saida1 = tempo_saida1 - menor_tempo;
        tempo_saida2 = myrand.random.uniform(taxaSaida2[0], taxaSaida2[1]);
        if (num_saidas_consecutivas == 2) {
          intervalo_atual += menor_tempo;
          lista_intervalos.push(intervalo_atual);
          intervalo_atual = 0;
          num_saidas_consecutivas = 1;
        }
      }
      else if (menor_tempo == tempo_chegada1 || menor_tempo == tempo_chegada2) { //Ocorreu uma chegada, somar tempo
        intervalo_atual += menor_tempo;
        tempo_saida1 = tempo_saida1 - menor_tempo;
        tempo_saida2 = tempo_saida2 - menor_tempo;
      }
    }
  }
  lista_intervalos.sort();
  lista_indice = [];

  for (i = 0; i < MAX_AMOSTRAS; i++) {
    lista_indice.push(parseFloat(i)/parseFloat(MAX_AMOSTRAS));
  }

  return {lista_intervalos, lista_indice};
}

function geraListaCdfExponencial(MAX_AMOSTRAS, taxa) {
  lista_cdf = [];
  for (i = 0; i < MAX_AMOSTRAS; i++) {
      lista_cdf.push(myrand.random.exponential(1));
  }

  lista_cdf.sort();
  return lista_cdf;
}
