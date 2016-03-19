function SimuladorPreemptivo(tempoFinal, classeObrigatoria, classes) {
    this.temporizador = new Temporizador(tempoFinal);
    this.metricaDeInteresse = new MetricaDeInteresse();
    this.servidorOcupado = false;
    this.tempoVazio = 0.0;
    this.tempoVazioTotal = 0.0;
    this.nClientesChegadas = 0;
    this.nClientesComServidorVazio = 0;
    this.clienteAtual;

    this.listaClasse = [classeObrigatoria];
    if (classes) {
        this.listaClasse = this.listaClasse.concat(classes);
    }

    this.fila = new Fila(this.listaClasse);
    this.prepararSimulacao(this.listaClasse);
}

SimuladorPreemptivo.prototype.prepararSimulacao = function( classes){
    var self = this;
    for( c of classes){
        var callback = function(c) {
            return function(tempo) { self.InsereClienteNaFila(tempo,c); }
        }
        this.temporizador.registrarTarefaPorAtraso(c.getRandomChegada(), callback(c));  
    }
}

SimuladorPreemptivo.prototype.LiberaServidorEBuscaNovoCliente = function(horarioDeEntradaNoServidor, cliente){
    this.metricaDeInteresse.adicionaClienteProcessado(cliente);
    this.clienteNoServidor = null;
    if(this.fila.tamanho() > 0) {
        var novoCliente = this.fila.remover();
        novoCliente.marcaSaida(horarioDeEntradaNoServidor);
        this.ProcessarCliente(novoCliente, horarioDeEntradaNoServidor);
    }
}

SimuladorPreemptivo.prototype.ProcessarCliente = function(cliente, horarioAtual){
    this.clienteNoServidor = cliente;
    this.clienteNoServidor.marcaSaida(horarioAtual);
    var self = this;
    tarefaDeProcessamento =
    this.temporizador.registrarTarefaPorAtraso(this.clienteNoServidor.tempoPendente , function(tempo) { self.LiberaServidorEBuscaNovoCliente(tempo, cliente); });
}

SimuladorPreemptivo.prototype.InsereClienteNaFila = function(horarioDeEntrada, classe){
    var novoCliente = new ClientePreemptivo(classe, horarioDeEntrada);
    if(this.clienteNoServidor != null) {
        if(novoCliente.classe.prioridade < this.clienteNoServidor.classe.prioridade){
            novoCliente.trabalhoPendente = this.getTrabalhoPendenteAtual(0);
            this.temporizador.cancelarTarefa(tarefaDeProcessamento);
            this.clienteNoServidor.atualizaTempoPendente(horarioDeEntrada);
            this.clienteNoServidor.marcaEntrada(horarioDeEntrada);
            this.fila.adicionar(this.clienteNoServidor, true);
            this.ProcessarCliente(novoCliente,horarioDeEntrada);
        }else{
            novoCliente.trabalhoPendente = this.getTrabalhoPendenteAtual(novoCliente.tempoPendente);
            this.fila.adicionar(novoCliente,false);
        }
    }else{
        novoCliente.trabalhoPendente = this.getTrabalhoPendenteAtual(0);
        this.ProcessarCliente(novoCliente,horarioDeEntrada);
    }

    var self = this;
    this.temporizador.registrarTarefaPorAtraso(classe.getRandomChegada(), function(tempo) { self.InsereClienteNaFila(tempo, classe); }); 
}

SimuladorPreemptivo.prototype.getTrabalhoPendenteAtual = function(xResidual) {
    //Nq1*E[X1] + Nq2*E[X2] + Xr
    var total = 0.0;
    for( f of this.fila.filas) {
        for( cliente of f)
            total += 1/cliente.classe.mi;
    }

    return total + xResidual;
}

SimuladorPreemptivo.prototype.iniciarSimulacao = function(){
    this.temporizador.play();
    this.metricaDeInteresse.fracaoDeTempoServidorVazio = this.tempoVazioTotal / this.temporizador.tempoFinal;
    return this.metricaDeInteresse;
}

SimuladorPreemptivo.prototype.continuarSimulacao = function(tempoFinal){
    this.metricaDeInteresse.mediaCalculada = null;
    this.temporizador.setTempoFinal(tempoFinal);
    return this.iniciarSimulacao();
}