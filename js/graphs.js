var graphs = {
    LambdaVsAvgClientsQueue: function(lambdaData, avgCustomersData) {
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
            series: [ {
                name: 'Avg. number of customers in queue',
                type: 'line',
                data: avgCustomersData
            }]
        });
    },

    LambdaVsAvgWaitQueue: function(lambdaData, avgWaitData) {
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
            series: [ {
                name: 'Avg. wait time in queue',
                type: 'line',
                data: avgWaitData
            }]
        });
    }
};