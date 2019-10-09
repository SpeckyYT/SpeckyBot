"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.toEngineering = toEngineering;
exports.toExponential = toExponential;
exports.toFixed = toFixed;

var _object = require("../object");

function format(value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  } // handle special cases


  if (!value.isFinite()) {
    return value.isNaN() ? 'NaN' : value.gt(0) ? 'Infinity' : '-Infinity';
  } // default values for options


  var notation = 'auto';
  var precision;

  if (options !== undefined) {
    // determine notation from options
    if (options.notation) {
      notation = options.notation;
    } // determine precision from options


    if (typeof options === 'number') {
      precision = options;
    } else if (options.precision) {
      precision = options.precision;
    }
  } // handle the various notations


  switch (notation) {
    case 'fixed':
      return toFixed(value, precision);

    case 'exponential':
      return toExponential(value, precision);

    case 'engineering':
      return toEngineering(value, precision);

    case 'auto':
      {
        // TODO: clean up some day. Deprecated since: 2018-01-24
        // @deprecated upper and lower are replaced with upperExp and lowerExp since v4.0.0
        if (options && options.exponential && (options.exponential.lower !== undefined || options.exponential.upper !== undefined)) {
          var fixedOptions = (0, _object.mapObject)(options, function (x) {
            return x;
          });
          fixedOptions.exponential = undefined;

          if (options.exponential.lower !== undefined) {
            fixedOptions.lowerExp = Math.round(Math.log(options.exponential.lower) / Math.LN10);
          }

          if (options.exponential.upper !== undefined) {
            fixedOptions.upperExp = Math.round(Math.log(options.exponential.upper) / Math.LN10);
          }

          console.warn('Deprecation warning: Formatting options exponential.lower and exponential.upper ' + '(minimum and maximum value) ' + 'are replaced with exponential.lowerExp and exponential.upperExp ' + '(minimum and maximum exponent) since version 4.0.0. ' + 'Replace ' + JSON.stringify(options) + ' with ' + JSON.stringify(fixedOptions));
          return format(value, fixedOptions);
        } // determine lower and upper bound for exponential notation.
        // TODO: implement support for upper and lower to be BigNumbers themselves


        var lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
        var upperExp = options && options.upperExp !== undefined ? options.upperExp : 5; // handle special case zero

        if (value.isZero()) return '0'; // determine whether or not to output exponential notation

        var str;
        var rounded = value.toSignificantDigits(precision);
        var exp = rounded.e;

        if (exp >= lowerExp && exp < upperExp) {
          // normal number notation
          str = rounded.toFixed();
        } else {
          // exponential notation
          str = toExponential(value, precision);
        } // remove trailing zeros after the decimal point


        return str.replace(/((\.\d*?)(0+))($|e)/, function () {
          var digits = arguments[2];
          var e = arguments[4];
          return digits !== '.' ? digits + e : e;
        });
      }

    default:
      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
  }
}
/**
 * Format a BigNumber in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
 * @param {BigNumber | string} value
 * @param {number} [precision]        Optional number of significant figures to return.
 */


function toEngineering(value, precision) {
  // find nearest lower multiple of 3 for exponent
  var e = value.e;
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3; // find difference in exponents, and calculate the value without exponent

  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
  var valueStr = valueWithoutExp.toPrecision(precision);

  if (valueStr.indexOf('e') !== -1) {
    valueStr = valueWithoutExp.toString();
  }

  return valueStr + 'e' + (e >= 0 ? '+' : '') + newExp.toString();
}
/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {BigNumber} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 * @returns {string} str
 */


function toExponential(value, precision) {
  if (precision !== undefined) {
    return value.toExponential(precision - 1); // Note the offset of one
  } else {
    return value.toExponential();
  }
}
/**
 * Format a number with fixed notation.
 * @param {BigNumber} value
 * @param {number} [precision=undefined] Optional number of decimals after the
 *                                       decimal point. Undefined by default.
 */


function toFixed(value, precision) {
  return value.toFixed(precision);
}