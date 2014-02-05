process.env.DEBUG = "lazystring:test";

var lazy = require('..');
var debug = require('debug')('lazystring:test');
var nulldebug = require('debug')('null');

var heavy = "lots of work to build this string";
function str() { return heavy; }

function throwing() {
  throw new Error("This does a lot of work, don't get here!");
  return str();
}

var lazyThrow = lazy(throwing);
var lazyStr = lazy(str);

function debugThrow(){ debug(lazyThrow); }
function nullDebugThrow() { nulldebug(lazyThrow); }

describe('laziness', function(){

  it('doesnt do any work when disabled', function(){
    nullDebugThrow.should.not.throw();
  });

  it('does work when enabled', function(){
    debugThrow.should.throw();
  });

});


describe('output', function(){

  it('function toString should match', function() {
    lazyStr.toString().should.equal(heavy);
  });

});
