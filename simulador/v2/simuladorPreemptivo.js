
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

SimuladorPreemptivo.prototype.setServidorOcupado = function( servidorOcupado) {
    this.servidorOcupado = servidorOcupado;
}

SimuladorPreemptivo.prototype.getServidorOcupado = function() {
    return this.servidorOcupado;
}

SimuladorPreemptivo.prototype.getTemporizador = function() {
    return this.temporizador;
}

SimuladorPreemptivo.prototype.getFila = function() {
    return this.fila;
}

SimuladorPreemptivo.prototype.getMetricaDeInteresse = function() {
    return this.metricaDeInteresse;
}

SimuladorPreemptivo.prototype.prepararSimulacao = function( classes){
    var self = this;
    for( c of classes){
        var callback = function(c) {
            return function(tempo) { self.InsereClienteNaFila(tempo,c); }
        }
        this.temporizador.registrarTarefaPorAtraso(this.getClasseRandomLambda(c), callback(c)); ////////////////////// 
    }
}

SimuladorPreemptivo.prototype.LiberaServidorEBuscaNovoCliente = function(horarioDeEntradaNoServidor, cliente){
    this.metricaDeInteresse.adicionaClienteProcessado(cliente);
    //tira o cliente do servidor
    this.clienteNoServidor = null;
    //se tiver gnt na fila
    if(this.fila.tamanho() > 0) {
        //tira da fila
        var novoCliente = this.fila.remover();
        //Marca a saida do cliente
        novoCliente.marcaSaida(horarioDeEntradaNoServidor);
        //Processa o cliente
        this.ProcessarCliente(novoCliente, horarioDeEntradaNoServidor);
    }
}

SimuladorPreemptivo.prototype.ProcessarCliente = function(cliente, horarioAtual){
    //guarda o cliente no servidor
    this.clienteNoServidor = cliente;
    //marca o tempo de saida da fila
    this.clienteNoServidor.marcaSaida(horarioAtual);
    //cria o evento para terminar o processamento do cliente, baseado do tempo pendente para terminado
    //guarda o evento
    //dispara o evento
    var self = this;
    var callback = function(cliente) {
        return function(tempo) { self.LiberaServidorEBuscaNovoCliente(tempo, cliente); }
    }
    tarefaDeProcessamento =
    this.temporizador.registrarTarefaPorAtraso(this.clienteNoServidor.getTempoPendente() , callback(cliente));
}

SimuladorPreemptivo.prototype.InsereClienteNaFila = function(horarioDeEntrada, classe){
    //marca o horario de entrada
    var novoCliente = new ClientePreemptivo(classe, horarioDeEntrada);
    //Se tem cliente no Servidor
    if(this.clienteNoServidor != null) {
        //Se a prioridade for menor do cliente que esta no servidor
        if(novoCliente.getClasse().getPrioridade() < this.clienteNoServidor.getClasse().getPrioridade()){
            novoCliente.setTrabalhoPendente(this.getTrabalhoPendenteAtual(0));
            //Cancela o evento de processamento desse cliente
            this.temporizador.cancelarTarefa(tarefaDeProcessamento);
            //Marca o tempo restante que falta para terminar o processamento
            this.clienteNoServidor.atualizaTempoPendente(horarioDeEntrada); // i.e horarioDeEntrada corresponde ao horario atual
            //Marca a nova entrada do cliente
            this.clienteNoServidor.marcaEntrada(horarioDeEntrada);
            //Colocar como proximo na fila
            this.fila.adicionar(this.clienteNoServidor, true);
            //Processa o Cliente que chegou
            this.ProcessarCliente(novoCliente,horarioDeEntrada);
        }else{
            novoCliente.setTrabalhoPendente(this.getTrabalhoPendenteAtual(novoCliente.getTempoPendente()));
            this.fila.adicionar(novoCliente,false);
        }
    }else{
        //Processa o cliente que chegou
        novoCliente.setTrabalhoPendente(this.getTrabalhoPendenteAtual(0));
        this.ProcessarCliente(novoCliente,horarioDeEntrada);
    }

    // Usa-se Random.Exponecial Sempre pois a entrada eh sempre Memoryless
    var self = this;
    this.temporizador.registrarTarefaPorAtraso(Random.Exponencial(classe.getLambda()), function(tempo) { self.InsereClienteNaFila(tempo, classe); });
}

SimuladorPreemptivo.prototype.getTrabalhoPendenteAtual = function( xResidual) {
    //Nq1*E[X1] + Nq2*E[X2] + Xr
    var total = 0.0;
    for( f of this.fila.getFilas()) {
        for( cliente of f)
            total += 1/cliente.getClasse().getMi();
    }

    return total + xResidual;
}

SimuladorPreemptivo.prototype.iniciarSimulacao = function(){
    this.temporizador.play();
    this.getMetricaDeInteresse().setFracaoDeTempoServidorVazio(this.tempoVazioTzxotal / this.temporizador.getTempoFinal());
    return this.getMetricaDeInteresse();
}

SimuladorPreemptivo.prototype.continuarSimulacao = function( tempoFinal){
    this.getMetricaDeInteresse().setMediaCalculada(null);
    this.temporizador.setTempoFinal(tempoFinal);
    return this.iniciarSimulacao();
}

SimuladorPreemptivo.prototype.setTempoVazioTotal = function( tempoVazioTotal) {
    this.tempoVazioTotal = tempoVazioTotal;
}

SimuladorPreemptivo.prototype.setTempoVazio = function( tempoVazio) {
    this.tempoVazio = tempoVazio;
}

SimuladorPreemptivo.prototype.getClasseRandomLambda = function( classe) {
    return Random.Exponencial(classe.getLambda());
}



