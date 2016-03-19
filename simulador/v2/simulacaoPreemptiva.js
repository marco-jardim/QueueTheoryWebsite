function SimulacaoPreemptiva(classe1, classe2) {
    this.nLoops = 30;
    this.tempoFinal = 10000;
    this.classe1 = classe1;
    this.classe2 = classe2;
}

SimulacaoPreemptiva.prototype.getSimulador = function(tempoFinal, classe1, classe2) {
	return new SimuladorPreemptivo(tempoFinal, classe1, classe2);
}

SimulacaoPreemptiva.prototype.PrintSimulacaoResultado = function(titulo, resultado){
    var media = [];
    var intervaloDeConfiancaInferior = [];
    var intervaloDeConfiancaSuperior = [];
    for( r of resultado){
        media.push(r.media.toString());
        intervaloDeConfiancaInferior.push(r.intConfInferior.toString());
        intervaloDeConfiancaSuperior.push(r.intConfSuperior.toString());
    }
    console.log(titulo);
    console.log("Média:");
    console.log(media);
    console.log("Intervalo de confiança inferior:");
    console.log(intervaloDeConfiancaInferior);
    console.log("Intervalo de confiança superior:");
    console.log(intervaloDeConfiancaSuperior);
}

SimulacaoPreemptiva.prototype.executarPessoasNaFila = function(lambda){
    this.classe1.lambda = lambda;
    var MediasPessoasNaFilaColetadas = [];
    var intervaloInferior;
    var intervaloSuperior;
    var media;
    do{
        for(var i = 0; i < this.nLoops; i++){
            var simulador = this.getSimulador(this.tempoFinal,this.classe1,this.classe2);
            var metricaDeInteresse = simulador.iniciarSimulacao();
            MediasPessoasNaFilaColetadas.push( Metricas.Little(this.classe1.lambda + this.classe2.lambda, metricaDeInteresse.getMediaTempoDeEspera()));
        }

        media = Metricas.Media(MediasPessoasNaFilaColetadas);
        intervaloInferior = Metricas.IntervaloConfiancaInferior(MediasPessoasNaFilaColetadas);
        intervaloSuperior = Metricas.IntervaloConfiancaSuperior(MediasPessoasNaFilaColetadas);
    }while( media < intervaloInferior || media > intervaloSuperior );

    return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
}

SimulacaoPreemptiva.prototype.executarTempoPessoasNaFila = function(lambda){
    this.classe1.lambda = lambda;
    var mediasTempoDePessoasNaFila = [];
    var intervaloInferior;
    var intervaloSuperior;
    var media;
    do{
        for(var i = 0; i < this.nLoops; i++){
            var simulador = this.getSimulador(this.tempoFinal, this.classe1, this.classe2);
            var metricaDeInteresse = simulador.iniciarSimulacao();
            mediasTempoDePessoasNaFila.push(metricaDeInteresse.getMediaTempoDeEspera());
        }
        media = Metricas.Media(mediasTempoDePessoasNaFila);
        intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasTempoDePessoasNaFila);
        intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasTempoDePessoasNaFila);

    }while( media < intervaloInferior || media > intervaloSuperior );

    return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
}

SimulacaoPreemptiva.prototype.executarFracaoTempoServidorVazio = function(lambda){
    this.classe1.lambda = lambda;
    var mediasFracaoServidorVazio = [];
    var intervaloInferior;
    var intervaloSuperior;
    var media;
    do{
        for(var i = 0; i < this.nLoops; i++){
            var simulador = this.getSimulador(this.tempoFinal, this.classe1, this.classe2);
            var metricaDeInteresse = simulador.iniciarSimulacao();
            mediasFracaoServidorVazio.push(metricaDeInteresse.getFracaoDeTempoServidorVazio());
        }

        media = Metricas.Media(mediasFracaoServidorVazio);
        intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasFracaoServidorVazio);
        intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasFracaoServidorVazio);

    }while( media < intervaloInferior || media > intervaloSuperior );

    return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
}

SimulacaoPreemptiva.prototype.executarFracaoChegadasServidorVazio = function(lambda){
    this.classe1.lambda = lambda;
    var mediasFracaoChegadasServidorVazio = [];
    var intervaloInferior;
    var intervaloSuperior;
    var media;
    do{
        for(var i = 0; i < this.nLoops; i++){
            var simulador = this.getSimulador(this.tempoFinal, this.classe1, this.classe2);
            var metricaDeInteresse = simulador.iniciarSimulacao();
            mediasFracaoChegadasServidorVazio.push(metricaDeInteresse.fracaoDeChegadasServidorVazio);
        }

        media = Metricas.Media(mediasFracaoChegadasServidorVazio);
        intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasFracaoChegadasServidorVazio);
        intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasFracaoChegadasServidorVazio);

    }while( media < intervaloInferior || media > intervaloSuperior );

    return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
}

//Questão 6
SimulacaoPreemptiva.prototype.executarTempoEntreSaidasDeCliente = function(filename) {
    console.log();
    var simulador = this.getSimulador(this.tempoFinal, this.classe1, this.classe2);
    var metricaDeInteresse = simulador.iniciarSimulacao();
    var tempoEntreSaidas = metricaDeInteresse.getTempoEntreSaidas();
    tempoEntreSaidas.sort(function(a, b){return a-b});

    var blobs = [];
    for (var i = 0; i < tempoEntreSaidas.length; i++) {
        blobs.push(tempoEntreSaidas[i] + " " + (i + 1) / tempoEntreSaidas.length + '\n');
    }
    var data = new Blob(blobs, {type: 'text/plain'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);
}

//Questão 8
SimulacaoPreemptiva.prototype.executarTrabalhoPendente = function(lambda) {
    this.classe1.lambda = lambda;
    var mediasTrabalhoPendente = [];
    var intervaloInferior;
    var intervaloSuperior;
    var media;
    do{
        for(var i = 0; i < this.nLoops; i++){
            var simulador = this.getSimulador(this.tempoFinal,this.classe1,this.classe2);
            var metricaDeInteresse = simulador.iniciarSimulacao();
            mediasTrabalhoPendente.push(metricaDeInteresse.getTrabalhoPendente());
        }

        media = Metricas.Media(mediasTrabalhoPendente);
        intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasTrabalhoPendente);
        intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasTrabalhoPendente);

    }while( media < intervaloInferior || media > intervaloSuperior );

    return media;
}

SimulacaoPreemptiva.prototype.executarMediaPessoasFilas = function(lambda) {
    this.classe1.lambda = lambda;
    var mediasPessoasFila1 = [];
    var mediasPessoasFila2 = [];
    var intervaloInferior1, intervaloInferior2;
    var intervaloSuperior1, intervaloSuperior2;
    var media1, media2;
    do{
        for(var i = 0; i < this.nLoops; i++){
            var simulador = this.getSimulador(this.tempoFinal,this.classe1,this.classe2);
            var metricaDeInteresse = simulador.iniciarSimulacao();
            mediasPessoasFila1.push(metricaDeInteresse.getPessoasFila()[0]);
            mediasPessoasFila2.push(metricaDeInteresse.getPessoasFila()[1]);
        }

        media1 = Metricas.Media(mediasPessoasFila1);
        media2 = Metricas.Media(mediasPessoasFila2);
        intervaloInferior1 = Metricas.IntervaloConfiancaInferior(mediasPessoasFila1);
        intervaloSuperior1 = Metricas.IntervaloConfiancaSuperior(mediasPessoasFila1);
        intervaloInferior2 = Metricas.IntervaloConfiancaInferior(mediasPessoasFila2);
        intervaloSuperior2 = Metricas.IntervaloConfiancaSuperior(mediasPessoasFila2);

    }while(( media1 < intervaloInferior1 || media1 > intervaloSuperior1 ) && ( media2 < intervaloInferior2 || media2 > intervaloSuperior2 ));

    return [media1, media2];
}