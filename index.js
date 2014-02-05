
function LazyString(fn) {
  this.fn = fn;
}

LazyString.prototype.toString = function() {
  return this.fn().toString();
}

module.exports = function(fn) {
  return new LazyString(fn);
}
