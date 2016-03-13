var graphs = {
    LambdaVsAvgClientsQueue: function(lambdaData, avgCustomersDataAnalytic, avgCustomersDataSimulation) {
        $('#averageCustomersQueueChart').highcharts({
            chart: {
                shadow: true
            },
            title: {
                text: 'Lambda vs. Average customers in queue'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ'
                }
            },
            yAxis: {
                title: {
                    text: 'Avg. number of customers in queue'
                }
            },
            series: [ 
                {
                    name: 'Avg. number of customers in queue (analytic)',
                    type: 'line',
                    data: avgCustomersDataAnalytic
                },
                {
                    name: 'Avg. number of customers in queue (simulation)',
                    type: 'line',
                    data: avgCustomersDataSimulation
                }
            ]
        });
    },

    LambdaVsAvgWaitQueue: function(lambdaData, avgWaitDataAnalytic, avgWaitDataSimulation) {
        $('#averageWaitQueueChart').highcharts({
            chart: {
                shadow: true
            },
            title: {
                text: 'Lambda vs. Average wait time in queue'
            },
            xAxis: {
                categories: lambdaData,
                title:{
                    text:'λ'
                }
            },
            yAxis: {
                title: {
                    text: 'Avg. wait time in queue'
                }
            },
            series: [
                {
                    name: 'Avg. wait time in queue (analytic)',
                    type: 'line',
                    data: avgWaitDataAnalytic
                },
                {
                    name: 'Avg. wait time in queue (simulation)',
                    type: 'line',
                    data: avgWaitDataSimulation
                }
            ]
        });
    }
};