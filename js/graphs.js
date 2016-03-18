var graphs = {
    LambdaVsAvgClientsQueue: function(lambdaData, element) {
        element = element || 'averageCustomersQueueChart';
        chart = new Highcharts.Chart({
            chart: {
                renderTo: element,
                shadow: true
            },
            title: {
                text: 'Lambda vs. Número médio de clientes na fila'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ (λ1 + λ2)'
                }
            },
            yAxis: {
                title: {
                    text: 'Número médio de clientes na fila'
                }
            },
            series: [ 
            {
                name: 'Analítico, sem prioridade',
                type: 'line',
                data: []
            },
            {
                name: 'Analítico, com prioridade, sem preemp.',
                type: 'line',
                data: []
            },
            {
                name: 'Analítico, com prioridade, com preemp.',
                type: 'line',
                data: []
            },
            {
                name: 'Simulação, sem prioridade',
                type: 'line',
                data: []
            },
            {
                name: 'Simulação, com prioridade, sem preemp.',
                type: 'line',
                data: []
            },
            {
                name: 'Simulação, com prioridade, com preemp.',
                type: 'line',
                data: []
            }
            ]
        });
        $('#'+element).highcharts();
        return chart;
    },

    LambdaVsAvgWaitQueue: function(lambdaData, element) {
        element = element || 'averageWaitQueueChart';
        chart = new Highcharts.Chart({
            chart: {
                renderTo: element,
                shadow: true
            },
            title: {
                text: 'Lambda vs. Tempo médio de espera na fila'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ (λ1 + λ2)'
                }
            },
            yAxis: {
                title: {
                    text: 'Tempo médio de espera na fila'
                }
            },
            series: [ 
            {
                name: 'Analítico, sem prioridade',
                type: 'line',
                data: []
            },
            {
                name: 'Analítico, com prioridade, sem preemp.',
                type: 'line',
                data: []
            },
            {
                name: 'Analítico, com prioridade, com preemp.',
                type: 'line',
                data: []
            },
            {
                name: 'Simulação, sem prioridade',
                type: 'line',
                data: []
            },
            {
                name: 'Simulação, com prioridade, sem preemp.',
                type: 'line',
                data: []
            },
            {
                name: 'Simulação, com prioridade, com preemp.',
                type: 'line',
                data: []
            }
            ]
        });
        $('#'+element).highcharts();
        return chart;
    },

    LambdaVsPasta: function(lambdaData) {
        element = 'averageTimePastaChart';
        chart = new Highcharts.Chart({
            chart: {
                type: 'column',
                renderTo: element,
                shadow: true
            },
            title: {
                text: 'Lambda vs. Fração de tempo do servidor vazio'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ (λ1 + λ2)'
                }
            },
            yAxis: {
                title: {
                    text: 'Fração'
                }
            },
            series: [ 
            {
                name: 'Sistema está vazio',
                data: []
            },
            {
                name: 'Chegadas encontram o sistema vazio',
                data: []
            },
            {
                name: 'Sistema está vazio (chegadas tempo determ.)',
                data: []
            },
            {
                name: 'Chegadas encontram o sistema vazio (chegadas tempo determ.)',
                data: []
            }
            ]
        });
        $('#'+element).highcharts();
        return chart;
    },

    LambdaVsPendingWork: function(lambdaData, element) {
        element = element || 'averagePendingWorkChart';
        chart = new Highcharts.Chart({
            chart: {
                type: 'column',
                renderTo: element,
                shadow: true
            },
            title: {
                text: 'Lambda vs. Trabalho pendente médio'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ (λ1 + λ2)'
                }
            },
            yAxis: {
                title: {
                    text: 'Trabalho pendente médio'
                }
            },
            series: [ 
            {
                name: 'Trab. pendente, sem prioridade',
                data: []
            },
            {
                name: 'Trab. pendente, com prioridade, sem preemp.',
                data: []
            },
            {
                name: 'Trab. pendente, com prioridade, com preemp.',
                data: []
            }
            ]
        });
        $('#'+element).highcharts();
        return chart;
    },

    LambdaVsCustomersEachQueue: function(lambdaData, element) {
        element = element || 'averageCustomersEachQueueChart';
        chart = new Highcharts.Chart({
            chart: {
                type: 'column',
                renderTo: element,
                shadow: true
            },
            title: {
                text: 'Lambda vs. Trabalho pendente médio'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ (λ1 + λ2)'
                }
            },
            yAxis: {
                title: {
                    text: 'Trabalho pendente médio'
                }
            },
            series: [ 
            {
                name: 'Nº clientes fila 1, sem prioridade',
                data: []
            },
            {
                name: 'Nº clientes fila 2, sem prioridade',
                data: []
            },
            {
                name: 'Nº clientes fila 1, sem preemp.',
                data: []
            },
            {
                name: 'Nº clientes fila 2, sem preemp.',
                data: []
            },
            {
                name: 'Nº clientes fila 1, com preemp.',
                data: []
            },
            {
                name: 'Nº clientes fila 2, com preemp.',
                data: []
            },
            ]
        });
        $('#'+element).highcharts();
        return chart;
    },

    CDF: function(maxValue, element) {
        element = element || 'cdfChart';
        chart = new Highcharts.Chart({
            chart: {
                type: 'spline',
                renderTo: element,
                shadow: true
                //inverted: true
            },
            title: {
                text: 'CDF'
            },
            xAxis: {
                //reversed: true,
                //categories: xData,
                title:{
                    text: 'X'
                },
                max: maxValue
            },
            yAxis: {
                //reversed: true,
                title: {
                    text: 'Y'
                }
            },
            series: [
                {
                    name: 'Analítico',
                    type: 'line',
                    data: []
                }
            ]
        });
        $('#'+element).highcharts();
        return chart;
    },
};
