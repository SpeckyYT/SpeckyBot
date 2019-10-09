"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csMark = csMark;

var _csFlip = require("./csFlip");

function csMark(w, j) {
  // mark w[j]
  w[j] = (0, _csFlip.csFlip)(w[j]);
}