function processingSimulation(MAX_AMOSTRAS, MAX_EVENTOS, num_exercicio, cenario) {
		lista_lambda = []
    lista_fila = []
    fila = []
    num_fila = 0
    sendo_atendido = 0
    sendo_atendido1 = 0 //REMOVER VARIAVEL APOS VERIFICAR CODIGO
    sendo_atendido2 = 0 //REMOVER VARIAVEL APOS VERIFICAR CODIGO
		prox_evento = ""

    //'''Exercício 3'''
    //###Cenário 1###
    if (num_exercicio == 3 && cenario == 1) {
        i = 0
        mi1 = 1
        while(0.05*i < 0.9) {
            lista_lambda.push(0.05*(i+1))
            i+=1
        }

        for (lambda1 of lista_lambda) {
            //console.log(lambda1)
            //console.log("==========")
            tot = 0
            for (j = 0; j < MAX_AMOSTRAS; j++) {
                fila = []
                lista_eventos = geraListaEventos(MAX_EVENTOS, lambda1, "exponencial", mi1)
                for (evento of lista_eventos) {
                    //console.log(prox_evento, sendo_atendido1, num_fila)
                    if (evento == "chegada") { //#Se próximo evento é uma chegada
                        if (fila.length == 0) { // #Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") { //} #Se servidor está vazio, entra nele
                                sendo_atendido = "tipo1"
                            } else { //#Caso contrário, entra na fila
                                fila.push("tipo1")
                            }
                        } else { //#Se já há alguém na fila, também entra nela
                            fila.push("tipo1")
                        }
                    } else if (evento == "saida") {//#Se próximo evento é uma saída
                        if (sendo_atendido != "nenhum") { //#Se o servidor está cheio, verifica fila
                            if (fila.length > 0) { // #Se há alguém na fila, sai um do servidor e outro da fila toma o seu lugar. Na prática, apenas a fila é decrementada:
                                fila.pop(0)
                            } else { //#Se não há ninguém na fila, o próprio cliente no servidor sai
                                sendo_atendido = "nenhum"
                            }
                        }
                    }
                }
                tot = tot + fila.length
            }
            num_fila_medio = parseFloat(tot) / parseFloat(MAX_AMOSTRAS)
            lista_fila.push(num_fila_medio)
        }
    }

    //###Cenário 2###
    else if (num_exercicio == 3 && cenario == 2) {
        i = 0
        mi1 = 1
        lambda2 = 0.2
        mi2 = 0.5
        while(0.05*i < 0.6) {
            lista_lambda.push(0.05*(i+1))
            i+=1
        }

        for (lambda1 of lista_lambda) {
            tot = 0
            for (j = 0; j < MAX_AMOSTRAS; j++) {
                fila = []
                lista_eventos = geraListaEventos(MAX_EVENTOS, lambda1, "exponencial", mi1, lambda2 , "exponencial" , mi2)
                //if lambda1 >= 0.6 and j == 0:
                    //print lista_eventos.count("chegada1")
                for (evento of lista_eventos) {
                    //console.log(prox_evento, sendo_atendido, num_fila);
                    if (evento == "chegada1") { //#Se próximo evento é uma chegada1
                        if (fila.length == 0) { //#Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") { //#Se servidor está vazio, entra nele
                                sendo_atendido = "tipo1"
                            } else { //#Caso contrário, entra na fila
                                fila.push("tipo1")
                            }
                        } else { //#Se já há alguém na fila, também entra nela
                            fila.push("tipo1")
                        }
                    } else if (evento == "chegada2") { //#Se próximo evento é uma chegada2
                        if (len(fila) == 0) {//#Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") { // #Se servidor está vazio, entra nele
                                sendo_atendido = "tipo2"
                            } else { //#Caso contrário, entra na fila
                                fila.push("tipo2")
                            }
                        } else { // #Se já há alguém na fila, também entra nela
                            fila.push("tipo2")
                        }
                    } else if (evento == "saida1") { //#Se próximo evento é uma saída1
                        if (sendo_atendido == "tipo1") { //#Se o servidor está atendendo tipo1, haverá a saída
                            if (fila.length >0) { //#Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.pop(0)
                            } else { //#se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                            }
                        }
                    } else if (evento == "saida2") { //#Se próximo evento é uma saída2
                        if (sendo_atendido == "tipo2") {//#Se o servidor está atendendo tipo2, haverá a saída
                            if (fila.length >0) {//#Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.pop(0)
                            } else { //#se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                            }
                        }
                    }

                }

                tot = tot + len(fila)

            		num_fila_medio = float(tot) / float(MAX_AMOSTRAS)
            		lista_fila.push(num_fila_medio)
	        	}
				}

        for (x = 0; x < lista_lambda.length; x++) { //#Para plotar lambda = lambda1+lambda2
                lista_lambda[x] += lambda2
        }
    }

    //###Cenário 3###
    else if (num_exercicio == 3 && cenario == 3) {
        i = 0
        mi1 = 1
        lambda2 = 0.2
        mi2 = 0.5
        while(0.05*i < 0.6) {
            lista_lambda.push(0.05*(i+1))
            i+=1
        }

        for (lambda1 in lista_lambda) {
            tot = 0
            for (j = 0; j < MAX_AMOSTRAS; j++) {
                fila = []
                lista_eventos = geraListaEventos(MAX_EVENTOS, lambda1, "exponencial", mi1, lambda2 , "exponencial" , mi2)
                //#if lambda1 >= 0.6 and j == 0:
                    //#print lista_eventos.count("chegada1")
                for (evento of lista_eventos) {
                    //console.log(prox_evento, sendo_atendido, num_fila)
                    if (evento == "chegada1") {//#Se próximo evento é uma chegada1
                        if (fila.length == 0) { //#Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") { //#Se servidor está vazio, entra nele
                                sendo_atendido = "tipo1"
                            } else { //#Caso contrário, entra na fila
                                fila.push("tipo1")
                            }
                        } else { //#Se já há alguém na fila, também entra nela
                            fila.push("tipo1")
                        }
                    } else if (evento == "chegada2") { //#Se próximo evento é uma chegada2
                        if (fila.length == 0) { //#Verifica fila. Se não há ninguém, verifica servidor
                            if (sendo_atendido == "nenhum") { //#Se servidor está vazio, entra nele
                                sendo_atendido = "tipo2"
                            } else { //#Caso contrário, entra na fila
                                fila.push("tipo2")
                            }
                        } else { //#Se já há alguém na fila, também entra nela
                            fila.push("tipo2")
                        }
                    } else if (evento == "saida1") { //#Se próximo evento é uma saída1
                        if (sendo_atendido == "tipo1") {//#Se o servidor está atendendo tipo1, haverá a saída
                            if (fila.length >0) { // #Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.pop(0)
                            } else { //#se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                            }
                        }
                    } else if (evento == "saida2") {//#Se próximo evento é uma saída2
                        if (sendo_atendido == "tipo2") { //#Se o servidor está atendendo tipo2, haverá a saída
                            if (fila.length >0) { //#Se há alguém na fila, substitui no servidor e sai da fila
                                sendo_atendido = fila[0]
                                fila.pop(0)
                            } else { //#se não há alguém na fila, só sai do servidor
                                sendo_atendido = "nenhum"
                            }
                        }
                    }
                }

                tot = tot + fila.length
            }
            num_fila_medio = float(tot) / float(MAX_AMOSTRAS)//#Faz a média de clientes na fila
            lista_fila.push(num_fila_medio)
        }
    }

    //###Cenário 4###
    else if (num_exercicio == 3 && cenario == 4) {
        i = 0
        lambda1 = 0.08
        mi1 = [5, 15]
        lambda2 = 0.05
        mi2 = [1, 3]
        lista_lambda.push(lambda1)

        for (lambda1 of lista_lambda) {
            tot = 0
            for (j = 0; j < MAX_AMOSTRAS; j++) {
                num_fila = 0
                lista_eventos = geraListaEventos(MAX_EVENTOS, lambda1, "uniforme", mi1, lambda2 , "uniforme" , mi2)
                if (j == 0) {
                    //console.log(lista_eventos.count("chegada"), lista_eventos.count("saida"))
                }
                //#if lambda1 >= 0.6:
                //#    print lista_eventos.count("chegada"), lista_eventos.count("saida")
                for (evento of lista_eventos)
                    //console.log(prox_evento, sendo_atendido, num_fila)
                    if (evento == "chegada"){ //#Se o evento é uma chegada
                        if (num_fila == 0) {//#Verifica a fila. Se Não há ninguém, verifca os servidores
                            if (sendo_atendido1 == 0) { //#Se o servidor 1 está vazio, entra nele
                                sendo_atendido1 = 1
                            } else if (sendo_atendido2 == 0) {  //#Se não, se o servidor 2 está vazio, entra nele
                                sendo_atendido1 = 1
                            } else { //#Se não há servidor vazio, entra na fila
                                num_fila+=1
                            }
                        } else { //#Se já tinha alguém na fila, entra na fila também
                            num_fila+=1
                        }
                    } else if (evento == "saida1") { //#Se o evento é uma saída do servidor1
                        if (sendo_atendido1 != 0) { //#Verifica se há alguém no servidor 1 (trata o caso de uma saída1 ser gerada e o servidor estar vazio)
                            if (num_fila > 0) { //#Se o servidor está cheio, verifica fila. Se está cheia, remove um
                                num_fila-=1
                            } else { //#Se está vazia, remove o outro
                                sendo_atendido1 = 0
                            }
                        }
                    } else if (evento == "saida2") { //#análogo à saída 1
                        if (sendo_atendido2 != 0) {
                            if (num_fila > 0) {
                                num_fila-=1
                            }
                            else {
                                sendo_atendido2 = 0
                            }
                        }
                    }

                tot = tot + num_fila
            }
            num_fila_medio = float(tot) / float(MAX_AMOSTRAS) //#Faz a média de clientes na fila
            lista_fila.push(num_fila_medio)
        }
    }

    return {lista_lambda: lista_lambda, lista_fila: lista_fila}
}
