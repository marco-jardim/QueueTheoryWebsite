Array.prototype.average = function() {
    var sum = 0;
    for (var value of this) {
    	sum += value;
    }
    return sum / this.length;
};

Array.prototype.last = function() {
    return this[this.length-1];
}