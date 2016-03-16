function Queue()
{
    this.array = [];

    this.push = function(newElement)
    {
        this.array.push(newElement);
        this.array.sort(function(a, b){return a.eventStartTime- b.eventStartTime});
    };

    this.pop = function()
    {
        var served = this.array[0];
        this.array.splice(0,1);
        return served;
    };

    this.emptyQueue = function()
    {
        return (this.array.length === 0);
    }
}

function addEventToQueue(_type,_eventStartTime)
{
    var arrival = {type:"", eventStartTime:0};

    arrival.type = _type;
    arrival.eventStartTime = _eventStartTime;

    return arrival;
}

function littlesLaw(lambda, mu)
{
  var rho = lambda/mu;

    return rho/(1-rho);
}

function confidenceInterval(standardDeviation,sampleMean,sampleSize)
{
    var interval = {lowEndPoint:0,highEndPoint: 0};

    interval.lowEndPoint = sampleMean - 1.96*(standardDeviation/Math.sqrt(sampleSize));
    interval.highEndPoint = sampleMean + 1.96*(standardDeviation/Math.sqrt(sampleSize));

    return interval;
}

function runQueue(lambda, mu, varyingLambda, lambda1, lambda2, simulationTotalRounds, simulationTotalTime)
{
    var randomNumbersGenerator = new Random();

    var roundsCounter = 1;

    var meanPersonsOnSystem = 0;
    var meanTimeWaiting = 0;
    var meanPersonsPerRound = [];
    var meanTimeWaitingPerRound = [];

    for(; roundsCounter <= simulationTotalRounds; roundsCounter++)
    {
        var simulationTime = 0;
        var simulationQueue = new Queue();
        var personsCounter = 0;
        var personsServed = 0;

        var arrivalTime = randomNumbersGenerator.exponential(lambda);;
        var serviceEndTime = simulationTotalTime;
        var lastEventTime = 0;
        var areaUnderPersonsChart = 0;

        arrivalTime = randomNumbersGenerator.exponential(lambda);
        simulationQueue.push(new addEventToQueue("Arrival",arrivalTime));

        while (simulationTime <= simulationTotalTime && !simulationQueue.emptyQueue())
        {
            var event = simulationQueue.pop();

            if (event.type === "Arrival")
            {
                simulationTime = arrivalTime;
                console.log("Comeco do servico:" + event.eventStartTime + " Fim do servico:" + arrivalTime);

                areaUnderPersonsChart += personsCounter * (simulationTime - lastEventTime);
                personsCounter++;
                lastEventTime = simulationTime;
                arrivalTime = simulationTime + randomNumbersGenerator.exponential(lambda);
                simulationQueue.push(new addEventToQueue("Arrival", arrivalTime));

                if (personsCounter === 1)
                {
                    serviceEndTime = simulationTime + randomNumbersGenerator.exponential(mu);
                    simulationQueue.push(new addEventToQueue("Departure", serviceEndTime));
                }
            }
            else if (event.type === "Departure")
            {
                simulationTime = serviceEndTime;
                meanTimeWaitingPerRound.push(event.eventStartTime - lastEventTime);
                areaUnderPersonsChart += personsCounter * (simulationTime - lastEventTime);
                personsCounter--;
                lastEventTime = simulationTime;
                personsServed++;

                if (personsCounter > 0)
                {
                    serviceEndTime = simulationTime + randomNumbersGenerator.exponential(mu);
                    simulationQueue.push(new addEventToQueue("Departure", serviceEndTime));
                }
            }
        }

        meanPersonsPerRound.push(areaUnderPersonsChart/simulationTotalTime);
    }

    // Calculando medidas de interesse
    for(var i = 0; i < meanPersonsPerRound.length; i++)
    {
        meanPersonsOnSystem += (meanPersonsPerRound[i])/simulationTotalRounds;
    }

    for(var i = 0; i < meanTimeWaitingPerRound.length; i++)
    {
        meanTimeWaiting += (meanTimeWaitingPerRound[i])/simulationTotalRounds;
    }

    var analyticUtilisation = lambda/mu;
    var personsOnSystemVariance = 0;
    for(var i = 0; i < meanPersonsPerRound.length; i++)
    {
        personsOnSystemVariance += Math.pow(meanPersonsPerRound[i]-meanPersonsOnSystem,2)/Math.max(meanPersonsPerRound.length-1,1);
    }
    var personsOnSystemStandardDeviation = Math.sqrt(personsOnSystemVariance);
    var confidenceIntervalEndPoints = confidenceInterval(personsOnSystemStandardDeviation,meanPersonsOnSystem,meanPersonsPerRound.length);
    var analyticMeanPersonsOnSystem = littlesLaw(lambda,mu);

    return { meanPersonsOnSystem: meanPersonsOnSystem, meanTimeWaiting:meanTimeWaiting, confidenceInterval:confidenceIntervalEndPoints }
}