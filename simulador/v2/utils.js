Array.prototype.average = function() {

    var sum = this.reduce(function(result, currentValue) {
        return result + currentValue
    }, 0);

    return sum / this.length;

};

Array.prototype.last = function() {
    return this[this.length-1];
}