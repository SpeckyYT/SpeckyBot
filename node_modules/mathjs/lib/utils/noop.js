"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noBignumber = noBignumber;
exports.noFraction = noFraction;
exports.noMatrix = noMatrix;
exports.noIndexClass = noIndexClass;
exports.noSubset = noSubset;

function noBignumber() {
  throw new Error('No "bignumber" implementation available');
}

function noFraction() {
  throw new Error('No "fraction" implementation available');
}

function noMatrix() {
  throw new Error('No "matrix" implementation available');
}

function noIndexClass() {
  throw new Error('No "Index" implementation available');
}

function noSubset() {
  throw new Error('No "matrix" implementation available');
}