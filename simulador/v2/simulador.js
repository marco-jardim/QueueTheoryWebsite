function Simulador( tempoFinal,  classeObrigatoria, classes) {
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

Simulador.prototype.prepararSimulacao= function( classes){
    var self = this;
    for( c of classes){
        var callback = function(c) {
            return function(tempo) { self.InsereClienteNaFila(tempo,c); }
        }
        this.temporizador.registrarTarefaPorAtraso(c.getRandomChegada(), callback(c)); 
    }
}

Simulador.prototype.LiberaServidorEBuscaNovoCliente= function( horarioDeEntradaNoServidor,  cliente){
    this.servidorOcupado = false;
    this.tempoVazio = this.temporizador.tempoAtual;
    this.metricaDeInteresse.adicionaClienteProcessado(cliente);
    if(this.fila.tamanho() > 0){
        var novoCliente = this.fila.remover();
        novoCliente.tempoSaida = horarioDeEntradaNoServidor;
        this.ProcessarCliente(novoCliente);
    }
}

Simulador.prototype.ProcessarCliente= function( cliente){
    var self = this;
    this.servidorOcupado = true;
    this.clienteAtual = cliente;
    this.tempoVazioTotal = this.tempoVazioTotal + this.temporizador.tempoAtual - this.tempoVazio;
    this.temporizador.registrarTarefaPorAtraso(cliente.tempoDeServico, function(tempo) { self.LiberaServidorEBuscaNovoCliente(tempo, cliente); }); 
}

Simulador.prototype.InsereClienteNaFila= function( horarioDeEntrada,  classe){
    var self = this;
    var cliente = new Cliente(classe, horarioDeEntrada);
    if(!this.servidorOcupado){
        cliente.tempoSaida = horarioDeEntrada;
        cliente.trabalhoPendente = this.getTrabalhoPendenteAtual(0);
        this.metricaDeInteresse.fracaoDeChegadasServidorVazio = ++this.nClientesComServidorVazio/++this.nClientesChegadas;
        this.ProcessarCliente(cliente);
    }else{
        cliente.trabalhoPendente = this.getTrabalhoPendenteAtual(this.clienteAtual.tempoDeServico);
        this.metricaDeInteresse.fracaoDeChegadasServidorVazio = this.nClientesComServidorVazio/++this.nClientesChegadas;
        this.fila.adicionar(cliente,false);
    }
    this.temporizador.registrarTarefaPorAtraso(classe.getRandomChegada(), function(tempo) { self.InsereClienteNaFila(tempo, classe); }); 
}

Simulador.prototype.getTrabalhoPendenteAtual= function( xResidual) {
    //Nq1*E[X1] + Nq2*E[X2] + Xr
    var total = 0.0;
    for( f of this.fila.filas) {
        for( cliente of f)
            total += 1/cliente.classe.mi;
    }

    return total + xResidual;
}

Simulador.prototype.iniciarSimulacao= function(){
    this.temporizador.play();
    this.metricaDeInteresse.fracaoDeTempoServidorVazio = this.tempoVazioTotal / this.temporizador.tempoFinal;
    return this.metricaDeInteresse;
}

Simulador.prototype.continuarSimulacao= function( tempoFinal){
    this.metricaDeInteresse.mediaCalculada = null;
    this.temporizador.setTempoFinal(tempoFinal);
    return this.iniciarSimulacao();
}