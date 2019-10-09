"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csReach = csReach;

var _csMarked = require("./csMarked");

var _csMark = require("./csMark");

var _csDfs = require("./csDfs");

function csReach(g, b, k, xi, pinv) {
  // g arrays
  var gptr = g._ptr;
  var gsize = g._size; // b arrays

  var bindex = b._index;
  var bptr = b._ptr; // columns

  var n = gsize[1]; // vars

  var p, p0, p1; // initialize top

  var top = n; // loop column indeces in B

  for (p0 = bptr[k], p1 = bptr[k + 1], p = p0; p < p1; p++) {
    // node i
    var i = bindex[p]; // check node i is marked

    if (!(0, _csMarked.csMarked)(gptr, i)) {
      // start a dfs at unmarked node i
      top = (0, _csDfs.csDfs)(i, g, top, xi, pinv);
    }
  } // loop columns from top -> n - 1


  for (p = top; p < n; p++) {
    // restore G
    (0, _csMark.csMark)(gptr, xi[p]);
  }

  return top;
}