/* require:

simulador
simulacaoresultado
metricadeinteresse
classe
metricas

*/





function Simulacao( classe1,  classe2) {
        this.nLoops = 30;
    this.tempoFinal = 100000.;
        this.classe1 = classe1;
        if(classe2 == null){
            this.classe2 = new Classe(0,0,0,null);
        }else{
            this.classe2 = classe2;
        }
    }



    Simulacao.prototype.PrintSimulacaoResultado= function( titulo, resultado){
        var media = [];
        var intervaloDeConfiacaInferior;
        var intervaloDeConfiacaSuperior;

        for( r of resultado){
            media.push(r.media.toString());
            intervaloDeConfiacaInferior.add(r.intConfInferior.toString());
            intervaloDeConfiacaSuperior.add(r.intConfSuperior.toString());
        }
        System.out.println(titulo);
        //System.out.println("Media");
        System.out.println(media.toString().replace('.',','));
        //System.out.println("Inferior");
        System.out.println(intervaloDeConfiacaInferior.toString().replace('.',','));
        //System.out.println("Superior");
        System.out.println(intervaloDeConfiacaSuperior.toString().replace('.',','));
    }



    Simulacao.prototype.getSimulador= function(Double tempoFinal, Classe classe1) {
        return new Simulador(tempoFinal, classe1);
    }

    Simulacao.prototype.getSimulador= function(Double tempoFinal, Classe classe1, Classe classe2) {
        return new Simulador(tempoFinal, classe1, classe2);
    }

    Simulacao.prototype.executarPessoasNaFila= function(Double lambda){
        classe1.setLambda(lambda);
        List<Double> MediasPessoasNaFilaColhetadas = new ArrayList<>(nLoops);
        Double intervaloInferior;
        Double intervaloSuperior;
        Double media;
        do{
            for(int i = 0; i < nLoops; i++){
                Simulador simulador = getSimulador(tempoFinal,classe1,classe2);
                MetricaDeInteresse metricaDeInteresse = simulador.iniciarSimulacao();
                MediasPessoasNaFilaColhetadas.add( Metricas.Little(classe1.getLambda() + classe2.getLambda(), metricaDeInteresse.getMediaTempoDeEspera()));
            }

            media = Metricas.Media(MediasPessoasNaFilaColhetadas);
            intervaloInferior = Metricas.IntervaloConfiancaInferior(MediasPessoasNaFilaColhetadas);
            intervaloSuperior = Metricas.IntervaloConfiancaSuperior(MediasPessoasNaFilaColhetadas);

        }while( media < intervaloInferior || media > intervaloSuperior );

        return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
    }

    Simulacao.prototype.executarTempoPessoasNaFila= function(Double lambda){
        classe1.setLambda(lambda);
        List<Double> mediasTempoDePessoasNaFila = new ArrayList<>(nLoops);
        Double intervaloInferior;
        Double intervaloSuperior;
        Double media;
        do{
            for(int i = 0; i < nLoops; i++){
                Simulador simulador = getSimulador(tempoFinal, classe1, classe2);
                MetricaDeInteresse metricaDeInteresse = simulador.iniciarSimulacao();
                mediasTempoDePessoasNaFila.add(metricaDeInteresse.getMediaTempoDeEspera());
            }

            media = Metricas.Media(mediasTempoDePessoasNaFila);
            intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasTempoDePessoasNaFila);
            intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasTempoDePessoasNaFila);

        }while( media < intervaloInferior || media > intervaloSuperior );

        return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
    }

    Simulacao.prototype.executarFracaoTempoServidorVazio= function(Double lambda){
        classe1.setLambda(lambda);
        List<Double> mediasFracaoServidorVazio = new ArrayList<>(nLoops);
        Double intervaloInferior;
        Double intervaloSuperior;
        Double media;
        do{
            for(int i = 0; i < nLoops; i++){
                Simulador simulador = getSimulador(tempoFinal, classe1, classe2);
                MetricaDeInteresse metricaDeInteresse = simulador.iniciarSimulacao();
                mediasFracaoServidorVazio.add(metricaDeInteresse.getFracaoDeTempoServidorVazio());
            }

            media = Metricas.Media(mediasFracaoServidorVazio);
            intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasFracaoServidorVazio);
            intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasFracaoServidorVazio);

        }while( media < intervaloInferior || media > intervaloSuperior );

        return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
    }

   Simulacao.prototype.executarFracaoChegadasServidorVazio= function(Double lambda){
        classe1.setLambda(lambda);
        List<Double> mediasFracaoChegadasServidorVazio = new ArrayList<>(nLoops);
        Double intervaloInferior;
        Double intervaloSuperior;
        Double media;
        do{
            for(int i = 0; i < nLoops; i++){
                Simulador simulador = getSimulador(tempoFinal, classe1, classe2);
                MetricaDeInteresse metricaDeInteresse = simulador.iniciarSimulacao();
                mediasFracaoChegadasServidorVazio.add(metricaDeInteresse.getFracaoDeChegadasServidorVazio());
            }

            media = Metricas.Media(mediasFracaoChegadasServidorVazio);
            intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasFracaoChegadasServidorVazio);
            intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasFracaoChegadasServidorVazio);

        }while( media < intervaloInferior || media > intervaloSuperior );

        return new SimulacaoResultado(media,intervaloInferior,intervaloSuperior);
    }

   Simulacao.prototype.executar= function(double inicio, double _final, double incremento){
        List<SimulacaoResultado> mediaPessoa = new ArrayList<>(20);
        List<SimulacaoResultado> mediaTempo = new ArrayList<>(20);
        List<SimulacaoResultado> mediaTempoVazio = new ArrayList<>(20);
        List<SimulacaoResultado> mediaChegadaVazio = new ArrayList<>(20);

        for(Double lambda = inicio; lambda <= _final; lambda += incremento){
            mediaPessoa.add(executarPessoasNaFila(lambda));
        }

        for(Double lambda = inicio; lambda <= _final; lambda += incremento){
            mediaTempo.add(executarTempoPessoasNaFila(lambda));
        }

        // Questão 7
        /*for(Double lambda = inicio; lambda <= _final; lambda += incremento){
            mediaTempoVazio.add(executarFracaoTempoServidorVazio(lambda));
        }

        for(Double lambda = inicio; lambda <= _final; lambda += incremento){
            mediaChegadaVazio.add(executarFracaoChegadasServidorVazio(lambda));
        }*/

        PrintSimulacaoResultado("Media de Pessoas da Fila", mediaPessoa);
        PrintSimulacaoResultado("Media de tempo das pessoas na fila", mediaTempo);
        //PrintSimulacaoResultado("Fracao em que o servidor fica vazio", mediaTempoVazio);
        //PrintSimulacaoResultado("Fracao de chegadas em que servidor se encontra vazio", mediaChegadaVazio);

        //Questão 8 Parte 2
        /*
        System.out.println("Trabalho Pendente");
        for(Double lambda = inicio; lambda <= _final; lambda += incremento){
            System.out.println(executarTrabalhoPendente(lambda));
        }*/

        //Questão 8 Parte 2
        System.out.println("Pessoas na Fila 1");
        for(Double lambda = inicio; lambda <= _final; lambda += incremento){
            Double[] medias = executarMediaPessoasFilas(lambda);
            System.out.println("Classe 1: " + (medias[0]));
            System.out.println("Classe 2: " + (medias[1]));
        }
    }

    //Questão 6
   Simulacao.prototype.executarTempoEntreSaidasDeCliente= function(String filename) {
        System.out.println();
        Simulador simulador = getSimulador(tempoFinal, classe1, classe2);
        MetricaDeInteresse metricaDeInteresse = simulador.iniciarSimulacao();
        List<Double> tempoEntreSaidas = metricaDeInteresse.getTempoEntreSaidas();
        tempoEntreSaidas.sort(Comparator.<Double>naturalOrder());
        PrintWriter out = null;
        try {
            out = new PrintWriter(filename);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        for (int i = 0; i < tempoEntreSaidas.size(); i++) {
            out.println(tempoEntreSaidas.get(i) + " " + (i + 1) / (double) tempoEntreSaidas.size());
        }
        out.close();
    }

    //Questão 8
   Simulacao.prototype.executarTrabalhoPendente= function(double lambda) {
        classe1.setLambda(lambda);
        List<Double> mediasTrabalhoPendente = new ArrayList<>(nLoops);
        Double intervaloInferior;
        Double intervaloSuperior;
        Double media;
        do{
            for(int i = 0; i < nLoops; i++){
                Simulador simulador = getSimulador(tempoFinal,classe1,classe2);
                MetricaDeInteresse metricaDeInteresse = simulador.iniciarSimulacao();
                mediasTrabalhoPendente.add(metricaDeInteresse.getTrabalhoPendente());
            }

            media = Metricas.Media(mediasTrabalhoPendente);
            intervaloInferior = Metricas.IntervaloConfiancaInferior(mediasTrabalhoPendente);
            intervaloSuperior = Metricas.IntervaloConfiancaSuperior(mediasTrabalhoPendente);

        }while( media < intervaloInferior || media > intervaloSuperior );

        return media;
    }

  Simulacao.prototype.executarMediaPessoasFilas= function(double lambda) {
        classe1.setLambda(lambda);
        List<Double> mediasPessoasFila1 = new ArrayList<>(nLoops);
        List<Double> mediasPessoasFila2 = new ArrayList<>(nLoops);
        Double intervaloInferior1, intervaloInferior2;
        Double intervaloSuperior1, intervaloSuperior2;
        Double media1, media2;
        do{
            for(int i = 0; i < nLoops; i++){
                Simulador simulador = getSimulador(tempoFinal,classe1,classe2);
                MetricaDeInteresse metricaDeInteresse = simulador.iniciarSimulacao();
                mediasPessoasFila1.add(metricaDeInteresse.getPessoasFila()[0]);
                mediasPessoasFila2.add(metricaDeInteresse.getPessoasFila()[1]);
            }

            media1 = Metricas.Media(mediasPessoasFila1);
            media2 = Metricas.Media(mediasPessoasFila2);
            intervaloInferior1 = Metricas.IntervaloConfiancaInferior(mediasPessoasFila1);
            intervaloSuperior1 = Metricas.IntervaloConfiancaSuperior(mediasPessoasFila1);
            intervaloInferior2 = Metricas.IntervaloConfiancaInferior(mediasPessoasFila2);
            intervaloSuperior2 = Metricas.IntervaloConfiancaSuperior(mediasPessoasFila2);

        }while(( media1 < intervaloInferior1 || media1 > intervaloSuperior1 ) && ( media2 < intervaloInferior2 || media2 > intervaloSuperior2 ));

        return new Double[]{media1, media2};
    }