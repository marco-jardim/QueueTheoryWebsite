"use strict";

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
};

function geraListaEventos(MAX_EVENTOS, taxaChegada1, tipoSaida1, taxaSaida1, taxaChegada2, tipoSaida2, taxaSaida2) {
  var prox_evento = "";
  var lista_eventos = [];
  var tempo_chegada, tempo_saida, tempo_saida2, tempo_saida1, tempo_chegada1, tempo_chegada2;
  var k;
  //debugger;
  ////////1 Saída Exponencial (Cenário 1)//////
  if (tipoSaida1 == "exponencial" && tipoSaida2 == null) {
    for (k = 0; k < MAX_EVENTOS; k += 1){
      tempo_chegada = myrand.random.exponential(taxaChegada1); //Pega um tempo de chegada
      tempo_saida = myrand.random.exponential(taxaSaida1); //Pega um tempo de saída

      //Confere qual tempo é menor e atribui se o próximo evento  é chegada ou saída
      if (tempo_chegada < tempo_saida){
        prox_evento = "chegada";
      }
      else if (tempo_chegada > tempo_saida){
        prox_evento = "saida";
      }

      lista_eventos.push(prox_evento);
    }
  }

  ////////2 Saídas Exponenciais (Cenário 2)//////
  if (tipoSaida1 == "exponencial" && tipoSaida2 == "exponencial") {
    fila_tipo1 = 0; //OBS:  inclui servidor
    fila_tipo2 = 0; //OBS:  inclui servidor
    //lista_eventos.push("debug")
    for (k = 0; k < MAX_EVENTOS; kddd += 1){
      ////print fila_tipo1+fila_tipo2, lista_eventos[-1]
      if (fila_tipo1 == 0 && fila_tipo2 == 0) { //Se não há ninguém na fila, só chegadas podem ocorrer
        ////print "ninguem na fila no evento " + str(k)
        tempo_chegada1 = myrand.random.exponential(taxaChegada1);
        tempo_chegada2 = myrand.random.exponential(taxaChegada2);

        if (tempo_chegada1 < tempo_chegada2) {
          prox_evento = "chegada1";
          fila_tipo1 += 1;
        }
        else {
          prox_evento = "chegada2";
          fila_tipo2 += 1;
        }
      }
      else {////Se há alguém na fila
        if (fila_tipo1 == 0 && fila_tipo2 != 0) { //Só há tipo2 na fila, logo só chegadas e saídas2 podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida2 = myrand.random.exponential(taxaSaida2);

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida2);

          if (menor_tempo == tempo_chegada1) { //ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1+=1;
          }
          else if (menor_tempo == tempo_chegada2) { //ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2 += 1;
          }
          else if (menor_tempo == tempo_saida2) { //ocorreu uma saida2
            prox_evento = "saida2";
            fila_tipo2 -= 1;
          }
        }
        else if (fila_tipo1 != 0 && fila_tipo2 == 0) { //Apenas chegadas e saídas1 podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida1 = myrand.random.exponential(taxaSaida1);

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida1);

          if (menor_tempo == tempo_chegada1) { //ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1+=1;
          }
          else if (menor_tempo == tempo_chegada2) {//ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2+=1;
          }
          else if (menor_tempo == tempo_saida1) {//ocorreu uma saida1
            prox_evento = "saida1";
            fila_tipo1-=1;
          }
        }
        else{ //Chegadas e saídas de quaisquer tipo podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida1 = myrand.random.exponential(taxaSaida1);
          tempo_saida2 = myrand.random.exponential(taxaSaida2);

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2);

          if (menor_tempo == tempo_chegada1) {//ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1 += 1;
          }
          else if (menor_tempo == tempo_chegada2) { //ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2 += 1;
          }
          else if (menor_tempo == tempo_saida1) { //ocorreu uma saida1
            prox_evento = "saida1";
            fila_tipo1 -= 1;
          }
          else if (menor_tempo == tempo_saida2) { //ocorreu uma saida2
            prox_evento = "saida2";
            fila_tipo2 -= 1;
          }
        }
      }
    }

    lista_eventos.push(prox_evento);
  }
  //////2 Saídas Determinísticas (Cenário 3)//////
  if (tipoSaida1 == "deterministica" && tipoSaida2 == "deterministica") {
    fila_tipo1 = 0; //////OBS:   inclui servidor
    fila_tipo2 = 0; //////OBS:  inclui servidor
    //lista_eventos.push("debug")
    for (k = 0; k < MAX_EVENTOS; kddd += 1) {
      //print fila_tipo1+fila_tipo2, lista_eventos[-1]
      if (fila_tipo1 == 0 && fila_tipo2 == 0) {  //Se não há ninguém na fila, só chegadas podem ocorrer
        //print "ninguem na fila no evento " + str(k)
        tempo_chegada1 = myrand.random.exponential(taxaChegada1);
        tempo_chegada2 = myrand.random.exponential(taxaChegada2);

        if (tempo_chegada1 < tempo_chegada2) {
          prox_evento = "chegada1";
          fila_tipo1+=1;
        }
        else{
          prox_evento = "chegada2";
          fila_tipo2+=1;
        }
      }
      else { //Se há alguém na fila
        if (fila_tipo1 == 0 && fila_tipo2 != 0) { //Só há tipo2 na fila, logo só chegadas e saídas2 podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida2 = 1/taxaSaida2;

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida2);

          if (menor_tempo == tempo_chegada1) { //ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1+=1;
          }
          else if (menor_tempo == tempo_chegada2) { //ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2+=1;
          }
          else if (menor_tempo == tempo_saida2) { //ocorreu uma saida2
            prox_evento = "saida2";
            fila_tipo2-=1;
          }
        }
        else if (fila_tipo1 != 0 && fila_tipo2 == 0) { //Apenas chegadas e saídas1 podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida1 = 1/taxaSaida1;

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida1);

          if (menor_tempo == tempo_chegada1) { //ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1 +=1 ;
          }
          else if (menor_tempo == tempo_chegada2) { //ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2 +=1 ;
          }
          else if (menor_tempo == tempo_saida1) { //ocorreu uma saida1
            prox_evento = "saida1";
            fila_tipo1 -=1 ;
          }
        }
        else{  //Chegadas e saídas de quaisquer tipo podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida1 = 1/taxaSaida1;
          tempo_saida2 = 1/taxaSaida2;

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2);

          if (menor_tempo == tempo_chegada1) { //ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1+=1;
          }
          else if (menor_tempo == tempo_chegada2) { //ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2+=1;
          }
          else if (menor_tempo == tempo_saida1) { //ocorreu uma saida1
            prox_evento = "saida1";
            fila_tipo1-=1;
          }
          else if (menor_tempo == tempo_saida2) { //ocorreu uma saida2
            prox_evento = "saida2";
            fila_tipo2-=1;
          }
        }
      }
      lista_eventos.push(prox_evento);
    }
  }
  //////2 Saídas Uniformes (Cenário 4)//////
  if (tipoSaida1 == "uniforme" && tipoSaida2 == "uniforme") {
    fila_tipo1 = 0; //////OBS:  inclui servidor
    fila_tipo2 = 0; //////OBS:  inclui servidor
    for (k = 0; k < MAX_EVENTOS; kddd += 1) {
      //print fila_tipo1+fila_tipo2, lista_eventos[-1]
      if (fila_tipo1 == 0 && fila_tipo2 == 0) {  //Se não há ninguém na fila, só chegadas podem ocorrer
        //print "ninguem na fila no evento " + str(k)
        tempo_chegada1 = myrand.random.exponential(taxaChegada1);
        tempo_chegada2 = myrand.random.exponential(taxaChegada2);

        if (tempo_chegada1 < tempo_chegada2) {
          prox_evento = "chegada1";
          fila_tipo1 += 1;
        }
        else {
          prox_evento = "chegada2";
          fila_tipo2 += 1;
        }
      }
      else { //Se há alguém na fila
        if (fila_tipo1 == 0 && fila_tipo2 != 0) { //Só há tipo2 na fila, logo só chegadas e saídas2 podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida2 =  myrand.random.uniform(taxaSaida2[0], taxaSaida2[1]);

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida2);

          if (menor_tempo == tempo_chegada1) { //ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1+=1;
          }
          else if (menor_tempo == tempo_chegada2) { //ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2+=1;
          }
          else if (menor_tempo == tempo_saida2) { //ocorreu uma saida2
            prox_evento = "saida2";
            fila_tipo2-=1;
          }
        }
        else if (fila_tipo1 != 0 && fila_tipo2 == 0) { //Apenas chegadas e saídas1 podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida1 =  myrand.random.uniform(taxaSaida1[0], taxaSaida1[1]);

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida1);

          if (menor_tempo == tempo_chegada1) { //ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1+=1;
          }
          else if (menor_tempo == tempo_chegada2) { //ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2+=1;
          }
          else if (menor_tempo == tempo_saida1) { //ocorreu uma saida1
            prox_evento = "saida1";
            fila_tipo1-=1;
          }
        }
        else{  //Chegadas e saídas de quaisquer tipo podem ocorrer
          tempo_chegada1 = myrand.random.exponential(taxaChegada1);
          tempo_chegada2 = myrand.random.exponential(taxaChegada2);
          tempo_saida1 =  myrand.random.uniform(taxaSaida1[0], taxaSaida1[1]);
          tempo_saida2 =  myrand.random.uniform(taxaSaida2[0], taxaSaida2[1]);

          menor_tempo = min(tempo_chegada1, tempo_chegada2, tempo_saida1, tempo_saida2);

          if (menor_tempo == tempo_chegada1) { //ocorreu uma chegada1
            prox_evento = "chegada1";
            fila_tipo1+=1;
          }
          else if (menor_tempo == tempo_chegada2) { //ocorreu uma chegada2
            prox_evento = "chegada2";
            fila_tipo2+=1;
          }
          else if (menor_tempo == tempo_saida1) { //ocorreu uma saida1
            prox_evento = "saida1";
            fila_tipo1-=1;
          }
          else if (menor_tempo == tempo_saida2) { //ocorreu uma saida2
            prox_evento = "saida2";
            fila_tipo2-=1;
          }
        }
      }
      lista_eventos.push(prox_evento);
    }
  }


  //print lista_eventos
  return lista_eventos;
}
