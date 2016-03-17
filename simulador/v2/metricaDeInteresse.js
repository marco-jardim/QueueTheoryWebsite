//require utils.js
// require cliente.js

function MetricaDeInteresse () {
    this.clientesProcessados;
    this.mediaCalculada = null;
    this.fracaoDeTempoServidorVazio = 0.0;
    this.fracaoDeChegadasServidorVazio = 0.0;

    this.clientesProcessados = []; //cliente.js
    
}


MetricaDeInteresse.prototype.getClientesProcessados  = function() {
        return this.clientesProcessados;
    }

MetricaDeInteresse.prototype.setMediaCalculada  = function( mediaCalculada) {
        this.mediaCalculada = mediaCalculada;
    }

MetricaDeInteresse.prototype.getMediaTempoDeEspera  = function() {
        if(this.mediaCalculada == null){
            var listaDeltaTempo = [];
            for (cliente of this.getClientesProcessados())
                listaDeltaTempo.push(cliente.getDeltaTempo());

            this.setMediaCalculada(Metricas.Media(listaDeltaTempo));
        }
        return this.mediaCalculada;
    }

MetricaDeInteresse.prototype.adicionaClienteProcessado  = function(cliente){
        if(cliente != null){
            this.getClientesProcessados().push(cliente);
        }else{
            var i = 0;
        }
    }

MetricaDeInteresse.prototype.getFracaoDeTempoServidorVazio  = function() {
        return this.fracaoDeTempoServidorVazio;
    }

MetricaDeInteresse.prototype.setFracaoDeTempoServidorVazio  = function( fracaoDeTempoServidorVazio) {
        this.fracaoDeTempoServidorVazio = fracaoDeTempoServidorVazio;
    }

MetricaDeInteresse.prototype.getFracaoDeChegadasServidorVazio  = function() {
        return this.fracaoDeChegadasServidorVazio;
    }

MetricaDeInteresse.prototype.setFracaoDeChegadasServidorVazio  = function( fracaoDeChegadasServidorVazio) {
        this.fracaoDeChegadasServidorVazio = fracaoDeChegadasServidorVazio;
    }

MetricaDeInteresse.prototype.getTempoEntreSaidas  = function() {
        var tempoDeSaidas = [];
        var tempoEntreSaidas = [];
        for (cliente of this.clientesProcessados)
            tempoDeSaidas.push(cliente.getTempoSaida());
        
        tempoDeSaidas.sort(function(a, b){return a-b});
        for (var i = 0; i < tempoDeSaidas.length - 1; i++) {
            tempoEntreSaidas.push(tempoDeSaidas[(i + 1)] - tempoDeSaidas[i]);
        }
        return tempoEntreSaidas;
    }

MetricaDeInteresse.prototype.getTrabalhoPendente  = function() {
        var listaTrabalhoPendente = [];
        for (trabalhoPendente of listaTrabalhoPendente)
            listaTrabalhoPendente.push(cliente.getTrabalhoPendente());

        return Metricas.Media(listaTrabalhoPendente);
    }

MetricaDeInteresse.prototype.getPessoasFila  = function() {
        var pessoasNaFila = [];
        var classe1 = this.clientesProcessados[0].getClasse();
        var classe2 = null;
        var listaDeltaTempo1 = [];
        var listaDeltaTempo2 = [];
        for (cliente of this.clientesProcessados) {
            if (cliente.getClasse() == classe1)
                listaDeltaTempo1.push(cliente.getDeltaTempo());
            else {
                if (classe2 == null)
                    classe2 = cliente.getClasse();
                listaDeltaTempo2.push(cliente.getDeltaTempo());
            }
        }

        pessoasNaFila[0] = Metricas.Little(classe1.getLambda(), Metricas.Media(listaDeltaTempo1));
        if (classe2)
            pessoasNaFila[1] = Metricas.Little(classe2.getLambda(), Metricas.Media(listaDeltaTempo2));

        return pessoasNaFila;
    }
