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
                }
            ]
        });
        $('#'+element).highcharts();
        return chart;
    }
};