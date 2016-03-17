
function Random() {
}


    Random.prototype.Exponencial( lambda) {
        return Math.log(1-Math.random())/(-lambda);
    }

    Random.prototype.Deterministico( lambda) {
        return 1/lambda;
    }

    Random.prototype.Uniforme( a,  b) {
        return Math.random() * (b - a) + a;
    }