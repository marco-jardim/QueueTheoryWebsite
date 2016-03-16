var graphs = {
    LambdaVsAvgClientsQueue: function(lambdaData, element) {
        element = element || 'averageCustomersQueueChart';
        chart = new Highcharts.Chart({
            chart: {
                renderTo: element,
                shadow: true
            },
            title: {
                text: 'Lambda1 vs. Número médio de clientes na fila'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ (Lambda1)'
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
                text: 'Lambda1 vs. Tempo médio de espera na fila'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ (Lambda1)'
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
    }
};