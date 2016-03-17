/* require:

random
temporizador
cliente
fila
metricadeinteresse
classe

*/

function SimuladorDeterministico( tempoFinal,  classeObrigatoria, classes) {
    this.temporizador = new Temporizador(tempoFinal);
    this.metricaDeInteresse = new MetricaDeInteresse();
    this.servidorOcupado = false;
    this.tempoVazio = 0.0;
    this.tempoVazioTotal = 0.0;
    this.nClientesChegadas = 0;
    this.nClientesComServidorVazio = 0;
    this.clienteAtual;

    this.listaClasse = [];
    this.listaClasse.push(classeObrigatoria);
    this.listaClasse.concat(classes);

    this.fila = new Fila(this.listaClasse);
    this.prepararSimulacao(this.listaClasse);
}

SimuladorDeterministico.prototype.setServidorOcupado( servidorOcupado) {
    this.servidorOcupado = servidorOcupado;
}

SimuladorDeterministico.prototype.getServidorOcupado() {
    return this.servidorOcupado;
}

SimuladorDeterministico.prototype.getTemporizador() {
    return this.temporizador;
}

SimuladorDeterministico.prototype.getFila() {
    return this.fila;
}

SimuladorDeterministico.prototype.getMetricaDeInteresse() {
    return this.metricaDeInteresse;
}

SimuladorDeterministico.prototype.prepararSimulacao( classes){
    for( c of classes){
        this.temporizador.registrarTarefaPorAtraso(getClasseRandomLambda(c), (tempo) -> InsereClienteNaFila(tempo, c)); //////////////////////
    }
}

SimuladorDeterministico.prototype.LiberaServidorEBuscaNovoCliente( horarioDeEntradaNoServidor,  cliente){
    this.setServidorOcupado(false);
    this.setTempoVazio(temporizador.getTempoAtual());
    metricaDeInteresse.adicionaClienteProcessado(cliente);
    if(this.fila.tamanho() > 0){
        var novoCliente = this.fila.remover();
        novoCliente.setTempoSaida(horarioDeEntradaNoServidor);
        this.ProcessarCliente(novoCliente);
    }
}

SimuladorDeterministico.prototype.ProcessarCliente( cliente){
    // com preempçao: tira o cliente, salva o tempo que ainda resta e coloca o novo no servidor
    this.setServidorOcupado(true);
    this.clienteAtual = cliente;
    this.setTempoVazioTotal(this.tempoVazioTotal + this.temporizador.getTempoAtual() - this.tempoVazio);
    this.temporizador.registrarTarefaPorAtraso(cliente.getTempoDeServico(), (tempo) -> LiberaServidorEBuscaNovoCliente(tempo, cliente)); ////////////////
}

SimuladorDeterministico.prototype.InsereClienteNaFila( horarioDeEntrada,  classe){
    var cliente = new Cliente(classe, horarioDeEntrada);
    // Com preempção: coloca direto no servidor
    if(!this.servidorOcupado){
        cliente.setTempoSaida(horarioDeEntrada);
        cliente.setTrabalhoPendente(this.getTrabalhoPendenteAtual(0));
        this.metricaDeInteresse.setFracaoDeChegadasServidorVazio(++this.nClientesComServidorVazio/++this.nClientesChegadas);
        this.ProcessarCliente(cliente);
    }else{
        cliente.setTrabalhoPendente(getTrabalhoPendenteAtual(this.clienteAtual.getTempoDeServico())); //TODO: XResidual do cliente que está ocupando o servidor
        this.metricaDeInteresse.setFracaoDeChegadasServidorVazio(this.nClientesComServidorVazio/++this.nClientesChegadas);
        this.fila.adicionar(cliente,false);
    }
    // Usa-se Random.Exponecial Sempre pois a entrada eh sempre Memoryless
    this.temporizador.registrarTarefaPorAtraso(getClasseRandomLambda(classe), (tempo) -> InsereClienteNaFila(tempo, classe)); ///////////////
}

SimuladorDeterministico.prototype.getTrabalhoPendenteAtual( xResidual) {
    //Nq1*E[X1] + Nq2*E[X2] + Xr
    var total = 0.0;
    for( f of this.fila.getFilas()) {
        for( cliente of f)
            total += 1/cliente.getClasse().getMi();
    }

    return total + xResidual;
}

SimuladorDeterministico.prototype.iniciarSimulacao(){
    this.temporizador.play();
    this.getMetricaDeInteresse().setFracaoDeTempoServidorVazio(this.tempoVazioTotal / this.temporizador.getTempoFinal());
    return this.getMetricaDeInteresse();
}

SimuladorDeterministico.prototype.continuarSimulação( tempoFinal){
    this.getMetricaDeInteresse().setMediaCalculada(null);
    this.temporizador.setTempoFinal(tempoFinal);
    return this.iniciarSimulacao();
}

SimuladorDeterministico.prototype.setTempoVazioTotal( tempoVazioTotal) {
    this.tempoVazioTotal = tempoVazioTotal;
}

SimuladorDeterministico.prototype.setTempoVazio( tempoVazio) {
    this.tempoVazio = tempoVazio;
}

SimuladorDeterministico.prototype.getClasseRandomLambda(classe) {
	return Random.Deterministico(classe.getLambda());
}