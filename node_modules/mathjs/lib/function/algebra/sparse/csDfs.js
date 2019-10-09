"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csDfs = csDfs;

var _csMarked = require("./csMarked");

var _csMark = require("./csMark");

var _csUnflip = require("./csUnflip");

function csDfs(j, g, top, xi, pinv) {
  // g arrays
  var index = g._index;
  var ptr = g._ptr;
  var size = g._size; // columns

  var n = size[1]; // vars

  var i, p, p2; // initialize head

  var head = 0; // initialize the recursion stack

  xi[0] = j; // loop

  while (head >= 0) {
    // get j from the top of the recursion stack
    j = xi[head]; // apply permutation vector

    var jnew = pinv ? pinv[j] : j; // check node j is marked

    if (!(0, _csMarked.csMarked)(ptr, j)) {
      // mark node j as visited
      (0, _csMark.csMark)(ptr, j); // update stack (last n entries in xi)

      xi[n + head] = jnew < 0 ? 0 : (0, _csUnflip.csUnflip)(ptr[jnew]);
    } // node j done if no unvisited neighbors


    var done = 1; // examine all neighbors of j, stack (last n entries in xi)

    for (p = xi[n + head], p2 = jnew < 0 ? 0 : (0, _csUnflip.csUnflip)(ptr[jnew + 1]); p < p2; p++) {
      // consider neighbor node i
      i = index[p]; // check we have visited node i, skip it

      if ((0, _csMarked.csMarked)(ptr, i)) {
        continue;
      } // pause depth-first search of node j, update stack (last n entries in xi)


      xi[n + head] = p; // start dfs at node i

      xi[++head] = i; // node j is not done

      done = 0; // break, to start dfs(i)

      break;
    } // check depth-first search at node j is done


    if (done) {
      // remove j from the recursion stack
      head--; // and place in the output stack

      xi[--top] = j;
    }
  }

  return top;
}