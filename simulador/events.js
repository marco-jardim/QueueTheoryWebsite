
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
    }
  }
}

function getUniformRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function geraListaEventos(MAX_EVENTOS, taxaChegada1, tipoSaida1, taxaSaida1, taxaChegada2, tipoSaida2, taxaSaida2) {
    prox_evento = ""
    lista_eventos = []
    
    //###1 Saída Exponencial (Cenário 1)###
    if (tipoSaida1 == "exponencial" && tipoSaida2 == null) 
        for (k = 0; k < MAX_EVENTOS; k++) {
            tempo_chegada1 = myrand.random.exponential(taxaChegada1) //#Pega um tempo de chegada
            tempo_saida1 = myrand.random.exponential(taxaSaida1) //#Pega um tempo de saída
            
            //#Confere qual tempo é menor e atribui se o próximo evento  é chegada ou saída
            if (tempo_chegada1 < tempo_saida1)
                prox_evento = "chegada1"
            else
                prox_evento = "saida1"
            
            lista_eventos.push(prox_evento)
        }
                
   //###2 Saídas Exponenciais (Cenário 2)###
    if (tipoSaida1 == "exponencial" && tipoSaida2 == "exponencial")
        for (k = 0; k < MAX_EVENTOS; k++) {          
            //console.log(sistema_tipo1+sistema_tipo2, lista_eventos[-1])
            tempo_chegada1 = myrand.random.exponential(taxaChegada1)
            tempo_chegada2 = myrand.random.exponential(taxaChegada2)
            tempo_saida1 = myrand.random.exponential(taxaSaida1)
            tempo_saida2 = myrand.random.exponential(taxaSaida2)
            
            menor_tempo = Math.min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2)
                    
            if (menor_tempo == tempo_chegada1)//#ocorreu uma chegada1
                prox_evento = "chegada1"
            else if (menor_tempo == tempo_chegada2)//#ocorreu uma chegada2
                prox_evento = "chegada2"
            else if (menor_tempo == tempo_saida1) //#ocorreu uma saida1
                prox_evento = "saida1"
            else if (menor_tempo == tempo_saida2)//#ocorreu uma saida2
                prox_evento = "saida2"
                
            lista_eventos.push(prox_evento)
        }
            

    //###2 Saídas Determinísticas (Cenário 3)###
    if (tipoSaida1 == "deterministica" && tipoSaida2 == "deterministica") {
        //#Aqui deve-se considerar o tempo residual de atendimento de um cliente no servidor
        tempo_saida1 = 1.0/(taxaSaida1)
        tempo_saida2 = 1.0/(taxaSaida2)
        for (k = 0; k < MAX_EVENTOS; k++) {
            tempo_chegada1 = myrand.random.exponential(taxaChegada1)
            tempo_chegada2 = myrand.random.exponential(taxaChegada2)
            
            menor_tempo = Math.min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2)
            
            if (menor_tempo == tempo_chegada1) {
                prox_evento = "chegada1"
                tempo_saida1 = (tempo_saida1-tempo_chegada1)
                tempo_saida2 = (tempo_saida2-tempo_chegada1)
            } else if (menor_tempo == tempo_chegada2) {
                prox_evento = "chegada2"
                tempo_saida1 = (tempo_saida1-tempo_chegada2)
                tempo_saida2 = (tempo_saida2-tempo_chegada2)
            }
            //#######################    
            else if (menor_tempo == tempo_saida1) {
                prox_evento = "saida1"
                tempo_saida2 = (tempo_saida2-tempo_saida1)
                tempo_saida1 = 1.0/(taxaSaida1)
            }
            else if (menor_tempo == tempo_saida2) {
                prox_evento = "saida2"
                tempo_saida1 = (tempo_saida1-tempo_saida2)
                tempo_saida2 = 1.0/(taxaSaida2)
            }
                    
            lista_eventos.push(prox_evento)
        }
    }
            
    //###2 Saídas Uniformes (Cenário 4)###
    if (tipoSaida1 == "uniforme" && tipoSaida2 == "uniforme") {
    //#Aqui deve-se considerar o tempo residual de atendimento de um cliente no servidor
        tempo_saida1 = getUniformRandomInt(taxaSaida1[0], taxaSaida1[1])
        tempo_saida2 = getUniformRandomInt(taxaSaida2[0], taxaSaida2[1])
        for (k = 0; k < MAX_EVENTOS; k++) {
            tempo_chegada1 = myrand.random.exponential(taxaChegada1)
            tempo_chegada2 = myrand.random.exponential(taxaChegada2)
            
            menor_tempo = Math.min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2)
            
            if (menor_tempo == tempo_chegada1) {
                prox_evento = "chegada1"
                tempo_saida1 = (tempo_saida1-tempo_chegada1)
                tempo_saida2 = (tempo_saida2-tempo_chegada1)
            } else if (menor_tempo == tempo_chegada2) {
                prox_evento = "chegada2"
                tempo_saida1 = (tempo_saida1-tempo_chegada2)
                tempo_saida2 = (tempo_saida2-tempo_chegada2)
            //#######################    
            } else if (menor_tempo == tempo_saida1) {
                prox_evento = "saida1"
                tempo_saida2 = (tempo_saida2-tempo_saida1)
                tempo_saida1 = numpy.random.uniform(taxaSaida1[0], taxaSaida1[1])
            } else {
                prox_evento = "saida2"
                tempo_saida1 = (tempo_saida1-tempo_saida1)
                tempo_saida2 = numpy.random.uniform(taxaSaida2[0], taxaSaida2[1])
            }
                    
            lista_eventos.push(prox_evento)
        }
    }

    return lista_eventos
}