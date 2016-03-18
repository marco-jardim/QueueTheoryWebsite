function Simulacao( classe1,  classe2) {
    this.nLoops = 30;
    this.tempoFinal = 10000;
    this.classe1 = classe1;
    this.classe2 = classe2;
}

Simulacao.prototype.PrintSimulacaoResultado = function( titulo, resultado){
    var media = [];
    var intervaloDeConfiancaInferior = [];
    var intervaloDeConfiancaSuperior = [];
    for( r of resultado){
        media.push(r.media.toString());
        intervaloDeConfiancaInferior.push(r.intConfInferior.toString());
        intervaloDeConfiancaSuperior.push(r.intConfSuperior.toString());
    }
    console.log(titulo);
    console.log("Media");
    console.log(media);
    console.log("Inferior");
    console.log(intervaloDeConfiancaInferior);
    console.log("Superior");
    console.log(intervaloDeConfiancaSuperior);
}

Simulacao.prototype.getSimulador = function(tempoFinal, classe1, classe2) {
    if (classe2)
        return new Simulador(tempoFinal, classe1, classe2);

    return new Simulador(tempoFinal, classe1);
}

Simulacao.prototype.executarPessoasNaFila = function(lambda){
    this.classe1.setLambda(lambda);
    var MediasPessoasNaFilaColetadas = [];
    var intervaloInferior;
    var intervaloSuperior;
    var media;
    do{
        for(var i = 0; i < this.nLoops; i++){
            var simulador = this.getSimulador(this.tempoFinal,this.classe1,this.classe2);
            var metricaDeInteresse = simulador.iniciarSimulacao();
            MediasPessoasNaFilaColetadas.push( Metricas.Little(this.classe1.getLambda() + this.classe2.getLambda(), metricaDeInteresse.getMediaTempoDeEspera()));
        }

        media = Metricas.Media(MediasPessoasNaFilaColetadas);
        intervaloInferior = Metricas.IntervaloConfiancaInferior(MediasPessoasNaFilaColetadas);
        intervaloSuperior = Metricas.IntervaloConfiancaSuperior(MediasPessoasNaFilaColetadas);
    }while( media < intervaloInferior || media > intervaloSuperior );

    return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
}

Simulacao.prototype.executarTempoPessoasNaFila = function(lambda){
    this.classe1.setLambda(lambda);
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

Simulacao.prototype.executarFracaoTempoServidorVazio = function(lambda){
    this.classe1.setLambda(lambda);
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

Simulacao.prototype.executarFracaoChegadasServidorVazio = function(lambda){
    this.classe1.setLambda(lambda);
    var mediasFracaoChegadasServidorVazio = [];
    var intervaloInferior;
    var intervaloSuperior;
    var media;
    do{
        for(var i = 0; i < this.nLoops; i++){
            var simulador = this.getSimulador(this.tempoFinal, this.classe1, this.classe2);
            var metricaDeInteresse = simulador.iniciarSimulacao();
            mediasFracaoChegadasServidorVazio.push(metricaDeInteresse.getFracaoDeChegadasServidorVazio());
        }

        media = Metricas.Media(mediasFracaoChegadasServidorVazio);
        intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasFracaoChegadasServidorVazio);
        intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasFracaoChegadasServidorVazio);

    }while( media < intervaloInferior || media > intervaloSuperior );

    return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
}

Simulacao.prototype.executar = function(inicio, _final, incremento){
    var mediaPessoa = [];
    var mediaTempo = [];
    var mediaTempoVazio = [];
    var mediaChegadaVazio = [];

    for(var lambda = inicio; lambda <= _final; lambda += incremento){
        mediaPessoa.push(this.executarPessoasNaFila(lambda));
    }

    for(var lambda = inicio; lambda <= _final; lambda += incremento){
        mediaTempo.push(this.executarTempoPessoasNaFila(lambda));
    }

    // Questão 7
    /*for(var lambda = inicio; lambda <= _final; lambda += incremento){
        mediaTempoVazio.push(executarFracaoTempoServidorVazio(lambda));
    }

    for(var lambda = inicio; lambda <= _final; lambda += incremento){
        mediaChegadaVazio.push(executarFracaoChegadasServidorVazio(lambda));
    }*/

    this.PrintSimulacaoResultado("Media de Pessoas da Fila", mediaPessoa);
    this.PrintSimulacaoResultado("Media de tempo das pessoas na fila", mediaTempo);
    //this.PrintSimulacaoResultado("Fracao em que o servidor fica vazio", mediaTempoVazio);
    //this.PrintSimulacaoResultado("Fracao de chegadas em que servidor se encontra vazio", mediaChegadaVazio);

    //Questão 8 Parte 2
    /*
    console.log("Trabalho Pendente");
    for(var lambda = inicio; lambda <= _final; lambda += incremento){
        console.log(executarTrabalhoPendente(lambda));
    }*/

    //Questão 8 Parte 2
    // console.log("Pessoas na Fila 1");
    // for(lambda = inicio; lambda <= _final; lambda += incremento){
    //     var medias = this.executarMediaPessoasFilas(lambda);
    //     console.log("Classe 1: " + (medias[0]));
    //     console.log("Classe 2: " + (medias[1]));
    // }
}

//Questão 6
Simulacao.prototype.executarTempoEntreChegadasDeCliente = function(filename) {
    var simulador = this.getSimulador(this.tempoFinal, this.classe1, this.classe2);
    var metricaDeInteresse = simulador.iniciarSimulacao();
    var tempoEntreChegadas = metricaDeInteresse.getTempoEntreChegadas();
    tempoEntreChegadas.sort(function(a, b){return a-b});

    var blobs = {x: [], y: []};
    for (var i = 0; i < tempoEntreChegadas.length; i++) {
        blobs.x.push(Stats.round(tempoEntreChegadas[i], 4));
        blobs.y.push(Stats.round((i + 1) / tempoEntreChegadas.length, 4));
    }
    // var data = new Blob(blobs, {type: 'text/plain'});
    // if (textFile !== null) {
    //     window.URL.revokeObjectURL(textFile);
    // }

    return blobs;

  //textFile = window.URL.createObjectURL(data);
}

Simulacao.prototype.executarTempoEntreSaidasDeCliente = function(filename) {
    var simulador = this.getSimulador(this.tempoFinal, this.classe1, this.classe2);
    var metricaDeInteresse = simulador.iniciarSimulacao();
    var tempoEntreSaidas = metricaDeInteresse.getTempoEntreSaidas();
    tempoEntreSaidas.sort(function(a, b){return a-b});

    var blobs = {x: [], y: []};
    for (var i = 0; i < tempoEntreSaidas.length; i++) {
        blobs.x.push(Stats.round(tempoEntreSaidas[i], 4));
        blobs.y.push(Stats.round((i + 1) / tempoEntreSaidas.length, 4));
    }
    // var data = new Blob(blobs, {type: 'text/plain'});
    // if (textFile !== null) {
    //     window.URL.revokeObjectURL(textFile);
    // }

    return blobs;

  //textFile = window.URL.createObjectURL(data);
}

//Questão 8
Simulacao.prototype.executarTrabalhoPendente = function(lambda) {
    this.classe1.setLambda(lambda);
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

Simulacao.prototype.executarMediaPessoasFilas = function(lambda) {
    this.classe1.setLambda(lambda);
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
