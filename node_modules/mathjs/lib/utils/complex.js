"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complexEquals = complexEquals;

var _number = require("./number");

function complexEquals(x, y, epsilon) {
  return (0, _number.nearlyEqual)(x.re, y.re, epsilon) && (0, _number.nearlyEqual)(x.im, y.im, epsilon);
}