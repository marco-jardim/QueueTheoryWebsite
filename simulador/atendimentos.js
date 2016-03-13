// incluir a lib math.js

function switchQuestao(MAX_AMOSTRAS, MAX_EVENTOS, EXERCICIO, CENARIO) {
    lista_lambda = []
    lista_fila = []
    
    //###Cenário 1 ###
    if (CENARIO == 1) {
        i = 0
        mi1 = 1
        while(0.05*i < 0.9) {
            lista_lambda.push(0.05*(i+1))
            i+=1
        }
        
        if (EXERCICIO.split(".")[0] == '3') //#Se exercício 3, atendimento é fila única
            tipo_atendimento = "fila_unica"
        else if (EXERCICIO.split(".")[0] == '4') //#Se exercício 4, atendimento é fila com prioridade da classe 1 sobre a 2, SEM preempção
            tipo_atendimento = "prioridade_sem_preempcao"
        else if (EXERCICIO.split(".")[0] == '5') //#Se exercício 5, atendimento é fila com prioridade da classe 1 sobre a 2, COM preempção
            tipo_atendimento = "prioridade_com_preempcao"
        
        {lista_lambda: lista_lambda, lista_fila: lista_fila} = simulaAtendimento(MAX_AMOSTRAS, MAX_EVENTOS, tipo_atendimento, lista_lambda, "exponencial", mi1, 0, null, null)
    
    //###Cenário 2###
    } else if (CENARIO == 2) {
        i = 0.0
        mi1 = 1.0
        lambda2 = 0.2
        mi2 = 0.5
        while(0.05*i < 0.6) {
            lista_lambda.push(0.05*(i+1.0))            
            i+=1.0
        }
            
        if (EXERCICIO.split(".")[0] == '3') //#Se exercício 3, atendimento é fila única
            tipo_atendimento = "fila_unica"
        else if (EXERCICIO.split(".")[0] == '4') //#Se exercício 4, atendimento é fila com prioridade da classe 1 sobre a 2, SEM preempção
            tipo_atendimento = "prioridade_sem_preempcao"
        else if (EXERCICIO.split(".")[0] == '5') //#Se exercício 5, atendimento é fila com prioridade da classe 1 sobre a 2, COM preempção
            tipo_atendimento = "prioridade_com_preempcao"
        {lista_lambda: lista_lambda, lista_fila: lista_fila} = simulaAtendimento(MAX_AMOSTRAS, MAX_EVENTOS, tipo_atendimento, lista_lambda, "exponencial", mi1, lambda2, "exponencial", mi2)
    
    //###Cenário 3###
    } else if (CENARIO == 3) {
        i = 0.0
        mi1 = 1.0
        lambda2 = 0.2
        mi2 = 0.5
        while(0.05*i < 0.6) {
            lista_lambda.push(0.05*(i+1.0))            
            i+=1.0
        }

        if (EXERCICIO.split(".")[0] == '3') //#Se exercício 3, atendimento é fila única
            tipo_atendimento = "fila_unica" 
        else if (EXERCICIO.split(".")[0] == '4') //#Se exercício 4, atendimento é fila com prioridade da classe 1 sobre a 2, SEM preempção
            tipo_atendimento = "prioridade_sem_preempcao"
        else if (EXERCICIO.split(".")[0] == '5') //#Se exercício 5, atendimento é fila com prioridade da classe 1 sobre a 2, COM preempção
            tipo_atendimento = "prioridade_com_preempcao"  
        {lista_lambda: lista_lambda, lista_fila: lista_fila} = simulaAtendimento(MAX_AMOSTRAS, MAX_EVENTOS, tipo_atendimento, lista_lambda, "deterministica", mi1, lambda2, "deterministica", mi2)
                
    //###Cenário 4###
    } else if (CENARIO == 4) {
        lambda1 = 0.08
        mi1 = [5, 15]
        lambda2 = 0.05
        mi2 = [1, 3]
        lista_lambda.push(lambda1)
        
        if (EXERCICIO.split(".")[0] == '3') //#Se exercício 3, atendimento é fila única
            tipo_atendimento = "fila_unica"   
        else if (EXERCICIO.split(".")[0] == '4') //#Se exercício 4, atendimento é fila com prioridade da classe 1 sobre a 2, SEM preempção
            tipo_atendimento = "prioridade_sem_preempcao"
        else if (EXERCICIO.split(".")[0] == '5') //#Se exercício 5, atendimento é fila com prioridade da classe 1 sobre a 2, COM preempção
            tipo_atendimento = "prioridade_com_preempcao"
        {lista_lambda: lista_lambda, lista_fila: lista_fila} = simulaAtendimento(MAX_AMOSTRAS, MAX_EVENTOS, tipo_atendimento, lista_lambda, "uniforme", mi1, lambda2, "uniforme", mi2)
    }

    return {lista_lambda: lista_lambda, lista_fila: lista_fila}
}


function simulaAtendimento(MAX_AMOSTRAS, MAX_EVENTOS, tipo_atendimento, lista_lambda, tipoSaida1, taxaSaida1, lambda2, tipoSaida2, taxaSaida2) {
    sendo_atendido = "nenhum"
    lista_sigma = []
    lista_fila = []
    //###Atendimento do Exercício 3###
    if (tipo_atendimento == "fila_unica") {
        for (lambda1 of lista_lambda) {
            tot = 0
            for (j = 0; j < MAX_AMOSTRAS; j++) {
                fila = []
                lista_eventos = geraListaEventos(MAX_EVENTOS, lambda1, tipoSaida1, taxaSaida1, lambda2 , tipoSaida2 , taxaSaida2)
                for (e = 0; e < lista_eventos.length; e++) {
                    //console.log(prox_evento, sendo_atendido, num_fila)
                    if (lista_eventos[e] == "chegada1") { //#Se evento é uma chegada1
                        if (fila.length == 0) //Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") // #Se servidor está vazio, entra nele
                                sendo_atendido = "tipo1"
                            else //#Caso contrário, entra na fila
                                fila.push("tipo1")
                        else //Se já há alguém na fila, também entra nela
                            fila.push("tipo1")
                    } else if (lista_eventos[e] == "chegada2") //Se próximo evento é uma chegada2
                        if (fila.length == 0) //Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") //Se servidor está vazio, entra nele
                                sendo_atendido = "tipo2"
                            else //Caso contrário, entra na fila
                                fila.push("tipo2")
                        else //Se já há alguém na fila, também entra nela
                            fila.push("tipo2")
                    } else if (lista_eventos[e] == "saida1") //Se próximo evento é uma saída1
                        if (sendo_atendido == "tipo1") //#Se o servidor está atendendo tipo1, haverá a saída
                            if (fila.length > 0) //Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.shift()
                            else //se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                    } else if (lista_eventos[e] == "saida2") //Se próximo evento é uma saída2
                        if (sendo_atendido == "tipo2") //Se o servidor está atendendo tipo2, haverá a saída
                            if (fila.length >0) //Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.shift()
                            else //se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                    }
                    //console.log(lista_eventos[e], ">", sendo_atendido, fila) 
                    //#time.sleep(1)
                }
                tot = tot + fila.length
                lista_sigma.push(fila.length) //#lista a ser usada para o calculo do desvio padrão
            }

            // mathLib da lib math.js
            sigma = mathLib.std(lista_sigma) //#desvio padrão das amostras
            num_fila_medio = parseFloat(tot) / parseFloat(MAX_AMOSTRAS) //#Faz a média de clientes na fila dentre todas as amostras
            
            ic_inferior = num_fila_medio - 1.96*sigma/Math.sqrt(MAX_AMOSTRAS)//#limite inferior para o intervalo de confiança de 95%
            ic_superior = num_fila_medio + 1.96*sigma/Math.sqrt(MAX_AMOSTRAS)//#limite superior para o intervalo de confiança de 95%
            //console.log(ic_inferior, ic_superior, num_fila_medio)
            if (num_fila_medio > ic_superior || num_fila_medio < ic_inferior)
                console.log("Intervalo de confianca de 95% nao satisfeito!")
            
            lista_fila.push(num_fila_medio)
        }
                
        for (x = 0; x < lista_lambda.length; x++) //Para plotar lambda = lambda1+lambda2
            lista_lambda[x] += lambda2
    }
    
    //###Atendimento do Exercício 4###
    if (tipo_atendimento == "prioridade_sem_preempcao") {
        for (lambda1 of lista_lambda) {
            tot = 0
            for (j = 0; j < MAX_AMOSTRAS; j++) {
                fila = []
                lista_eventos = geraListaEventos(MAX_EVENTOS, lambda1, tipoSaida1, taxaSaida1, lambda2 , tipoSaida2 , taxaSaida2)
                for (e = 0; e < lista_eventos.length; e++) {
                    //console.log(prox_evento, sendo_atendido, num_fila
                    if (lista_eventos[e] == "chegada1") {//Se evento é uma chegada1
                        if (fila.length == 0) {//Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") //Se servidor está vazio, entra nele
                                sendo_atendido = "tipo1"
                            else //Caso contrário, entra na fila - por simplificação de programação, entra na primeira posição da fila, passando a frente do tipo2
                                fila.unshift("tipo1")
                        } else //Se já há alguém na fila, entra na fila por simplificação de programação, entra na primeira posição da fila, passando a frente do tipo2
                            fila.unshift("tipo1")
                    else if (lista_eventos[e] == "chegada2") {//Se próximo evento é uma chegada2
                        if (fila.length == 0) {//Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") //Se servidor está vazio, entra nele
                                sendo_atendido = "tipo2"
                            else //Caso contrário, entra no fim da fila
                                fila.push("tipo2")
                        } else //Se já há alguém na fila, também entra nela
                            fila.push("tipo2")
                    } else if (lista_eventos[e] == "saida1") {//Se próximo evento é uma saída1
                        if (sendo_atendido == "tipo1") {//Se o servidor está atendendo tipo1, haverá a saída
                            if (fila.length >0) { //Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.shift()
                            } else //se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                        }
                    } else if (lista_eventos[e] == "saida2") //Se próximo evento é uma saída2
                        if (sendo_atendido == "tipo2") //Se o servidor está atendendo tipo2, haverá a saída
                            if (fila.length >0) {//Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.shift()
                            } else //se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                    //console.log(lista_eventos[e], ">", sendo_atendido, fila)
                    //#time.sleep(1)
                }
                tot = tot + fila.length
                lista_sigma.push(fila.length) //#lista a ser usada para o calculo do desvio padrão
            }
            sigma = mathLib.std(lista_sigma) //#desvio padrão das amostras
            num_fila_medio = parseFloat(tot) / parseFloat(MAX_AMOSTRAS)//#Faz a média de clientes na fila dentre todas as amostras
            
            ic_inferior = num_fila_medio - 1.96*sigma/Math.sqrt(MAX_AMOSTRAS)//#limite inferior para o intervalo de confiança de 95%
            ic_superior = num_fila_medio + 1.96*sigma/Math.sqrt(MAX_AMOSTRAS)//#limite superior para o intervalo de confiança de 95%
            //console.log(ic_inferior, ic_superior, num_fila_medio)
            if num_fila_medio > ic_superior or num_fila_medio < ic_inferior:
                console.log("Intervalo de confianca de 95% nao satisfeito!")
            
            lista_fila.push(num_fila_medio)
        }
                
        for (x = 0; x < lista_lambda.length; x++) //Para plotar lambda = lambda1+lambda2
            lista_lambda[x] += lambda2
    }
        
    //###Atendimento do Exercício 5###
    if (tipo_atendimento == "prioridade_com_preempcao") {
        sendo_atendido = "nenhum"
        lista_fila = []
        for (lambda1 of lista_lambda) {
            tot = 0
            for (j = 0; j < MAX_AMOSTRAS; j++) {
                fila = []
                lista_eventos = geraListaEventos(MAX_EVENTOS, lambda1, tipoSaida1, taxaSaida1, lambda2 , tipoSaida2 , taxaSaida2)
                for (e = 0; e <lista_eventos.length; e++) {
                    //console.log(prox_evento, sendo_atendido, num_fila
                    if (lista_eventos[e] == "chegada1") {//Se evento é uma chegada1
                        if (fila.length == 0) {//Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") //Se servidor está vazio, entra nele
                                sendo_atendido = "tipo1"
                            else if (sendo_atendido == "tipo2") {//Se servidor está atendendo tipo2, substitui e adiciona tipo2 na fila
                                sendo_atendido = "tipo1"
                                fila.push("tipo2")
                            } else //Se servidor está atendendo tipo1, entra na fila - por simplificação de programação, entra na primeira posição da fila, passando a frente do tipo2
                                fila.unshift("tipo1")
                        } else //Se já há alguém na fila, entra na fila por simplificação de programação, entra na primeira posição da fila, passando a frente do tipo2
                            fila.unshift("tipo1")
                    } else if (lista_eventos[e] == "chegada2") {//Se próximo evento é uma chegada2
                        if (fila.length == 0) {//Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") //Se servidor está vazio, entra nele
                                sendo_atendido = "tipo2"
                            else //Caso contrário, entra no fim da fila
                                fila.push("tipo2")
                        } else //Se já há alguém na fila, também entra nela
                            fila.push("tipo2")
                    } else if (lista_eventos[e] == "saida1") {//Se próximo evento é uma saída1
                        if (sendo_atendido == "tipo1") {//Se o servidor está atendendo tipo1, haverá a saída
                            if (fila.length >0) {//Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.shift()
                            } else //se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                        }
                    } else if (lista_eventos[e] == "saida2") {//Se próximo evento é uma saída2
                        if (sendo_atendido == "tipo2") {//Se o servidor está atendendo tipo2, haverá a saída
                            if (fila.length >0) {//Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.shift()
                            } else //se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                        }
                    }
                    //console.log(lista_eventos[e], ">", sendo_atendido, fila 
                    //#time.sleep(1)
                }
                tot = tot + fila.length
                lista_sigma.push(fila.length) //#lista a ser usada para o calculo do desvio padrão
            }
            sigma = mathLib.std(lista_sigma) //#desvio padrão das amostras
            num_fila_medio = parseFloat(tot) / parseFloat(MAX_AMOSTRAS) //#Faz a média de clientes na fila dentre todas as amostras
            
            ic_inferior = num_fila_medio - 1.96*sigma/Math.sqrt(MAX_AMOSTRAS)//#limite inferior para o intervalo de confiança de 95%
            ic_superior = num_fila_medio + 1.96*sigma/Math.sqrt(MAX_AMOSTRAS)//#limite superior para o intervalo de confiança de 95%
            //console.log(ic_inferior, ic_superior, num_fila_medio)
            if (num_fila_medio > ic_superior || num_fila_medio < ic_inferior)
                console.log("Intervalo de confianca de 95% nao satisfeito!")
                
            lista_fila.push(num_fila_medio)
        }
                
        for (x = 0; x < lista_lambda.length; x++) //Para plotar lambda = lambda1+lambda2
            lista_lambda[x] += lambda2
            
    }
            
    return {lista_lambda: lista_lambda, lista_fila: lista_fila}
}