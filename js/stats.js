var Stats = {
    combination: function(high, low){
        return (this.factorial(high) / (this.factorial(low) * this.factorial(high - low)));
    },
    power: function(base, exponent){
        return Math.pow(base, exponent);
    },
    root: function(number, nRoot){
        return Math.pow(number, 1 / nRoot);
    },
    absolute: function(number){
        return Math.abs(number);
    },
    factorial: function(n){
        var f = [];
        if (n === 0 || n === 1){
            return 1;
        }else{
            f[1] = 1;
            for(var i=2; i<=n; i++){
                f[i] = f[i-1] * i;
            }
        }
    return f[n]; 
    },
    round: function(floatValue, decimals){
        return (Math.round(floatValue * Math.pow(10, decimals)) / Math.pow(10, decimals));
    }
};