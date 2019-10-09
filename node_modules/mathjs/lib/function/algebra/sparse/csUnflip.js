"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csUnflip = csUnflip;

var _csFlip = require("./csFlip");

function csUnflip(i) {
  // flip the value if it is negative
  return i < 0 ? (0, _csFlip.csFlip)(i) : i;
}