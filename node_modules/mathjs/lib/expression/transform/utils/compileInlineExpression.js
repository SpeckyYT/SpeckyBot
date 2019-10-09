"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileInlineExpression = compileInlineExpression;

var _is = require("../../../utils/is");

function compileInlineExpression(expression, math, scope) {
  // find an undefined symbol
  var symbol = expression.filter(function (node) {
    return (0, _is.isSymbolNode)(node) && !(node.name in math) && !(node.name in scope);
  })[0];

  if (!symbol) {
    throw new Error('No undefined variable found in inline expression "' + expression + '"');
  } // create a test function for this equation


  var name = symbol.name; // variable name

  var subScope = Object.create(scope);
  var eq = expression.compile();
  return function inlineExpression(x) {
    subScope[name] = x;
    return eq.evaluate(subScope);
  };
}