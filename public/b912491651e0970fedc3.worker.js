/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/node-vibrant/lib/pipeline/index.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@vibrant/color/lib/converter.js":
/*!******************************************************!*\
  !*** ./node_modules/@vibrant/color/lib/converter.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELTAE94_DIFF_STATUS = {
  NA: 0,
  PERFECT: 1,
  CLOSE: 2,
  GOOD: 10,
  SIMILAR: 50
};

function hexToRgb(hex) {
  var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m === null ? null : [m[1], m[2], m[3]].map(function (s) {
    return parseInt(s, 16);
  });
}

exports.hexToRgb = hexToRgb;

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
}

exports.rgbToHex = rgbToHex;

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h;
  var s;
  var l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
}

exports.rgbToHsl = rgbToHsl;

function hslToRgb(h, s, l) {
  var r;
  var g;
  var b;

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  if (s === 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

exports.hslToRgb = hslToRgb;

function rgbToXyz(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.005) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.005) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.005) / 1.055, 2.4) : b / 12.92;
  r *= 100;
  g *= 100;
  b *= 100;
  var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x, y, z];
}

exports.rgbToXyz = rgbToXyz;

function xyzToCIELab(x, y, z) {
  var REF_X = 95.047;
  var REF_Y = 100;
  var REF_Z = 108.883;
  x /= REF_X;
  y /= REF_Y;
  z /= REF_Z;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  var L = 116 * y - 16;
  var a = 500 * (x - y);
  var b = 200 * (y - z);
  return [L, a, b];
}

exports.xyzToCIELab = xyzToCIELab;

function rgbToCIELab(r, g, b) {
  var _a = rgbToXyz(r, g, b),
      x = _a[0],
      y = _a[1],
      z = _a[2];

  return xyzToCIELab(x, y, z);
}

exports.rgbToCIELab = rgbToCIELab;

function deltaE94(lab1, lab2) {
  var WEIGHT_L = 1;
  var WEIGHT_C = 1;
  var WEIGHT_H = 1;
  var L1 = lab1[0],
      a1 = lab1[1],
      b1 = lab1[2];
  var L2 = lab2[0],
      a2 = lab2[1],
      b2 = lab2[2];
  var dL = L1 - L2;
  var da = a1 - a2;
  var db = b1 - b2;
  var xC1 = Math.sqrt(a1 * a1 + b1 * b1);
  var xC2 = Math.sqrt(a2 * a2 + b2 * b2);
  var xDL = L2 - L1;
  var xDC = xC2 - xC1;
  var xDE = Math.sqrt(dL * dL + da * da + db * db);
  var xDH = Math.sqrt(xDE) > Math.sqrt(Math.abs(xDL)) + Math.sqrt(Math.abs(xDC)) ? Math.sqrt(xDE * xDE - xDL * xDL - xDC * xDC) : 0;
  var xSC = 1 + 0.045 * xC1;
  var xSH = 1 + 0.015 * xC1;
  xDL /= WEIGHT_L;
  xDC /= WEIGHT_C * xSC;
  xDH /= WEIGHT_H * xSH;
  return Math.sqrt(xDL * xDL + xDC * xDC + xDH * xDH);
}

exports.deltaE94 = deltaE94;

function rgbDiff(rgb1, rgb2) {
  var lab1 = rgbToCIELab.apply(undefined, rgb1);
  var lab2 = rgbToCIELab.apply(undefined, rgb2);
  return deltaE94(lab1, lab2);
}

exports.rgbDiff = rgbDiff;

function hexDiff(hex1, hex2) {
  var rgb1 = hexToRgb(hex1);
  var rgb2 = hexToRgb(hex2);
  return rgbDiff(rgb1, rgb2);
}

exports.hexDiff = hexDiff;

function getColorDiffStatus(d) {
  if (d < exports.DELTAE94_DIFF_STATUS.NA) return 'N/A'; // Not perceptible by human eyes

  if (d <= exports.DELTAE94_DIFF_STATUS.PERFECT) return 'Perfect'; // Perceptible through close observation

  if (d <= exports.DELTAE94_DIFF_STATUS.CLOSE) return 'Close'; // Perceptible at a glance

  if (d <= exports.DELTAE94_DIFF_STATUS.GOOD) return 'Good'; // Colors are more similar than opposite

  if (d < exports.DELTAE94_DIFF_STATUS.SIMILAR) return 'Similar';
  return 'Wrong';
}

exports.getColorDiffStatus = getColorDiffStatus;

/***/ }),

/***/ "./node_modules/@vibrant/color/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@vibrant/color/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var converter_1 = __webpack_require__(/*! ./converter */ "./node_modules/@vibrant/color/lib/converter.js");

var Swatch =
/** @class */
function () {
  function Swatch(rgb, population) {
    this._rgb = rgb;
    this._population = population;
  }

  Swatch.applyFilters = function (colors, filters) {
    return filters.length > 0 ? colors.filter(function (_a) {
      var r = _a.r,
          g = _a.g,
          b = _a.b;

      for (var j = 0; j < filters.length; j++) {
        if (!filters[j](r, g, b, 255)) return false;
      }

      return true;
    }) : colors;
  };

  Swatch.clone = function (swatch) {
    return new Swatch(swatch._rgb, swatch._population);
  };

  Object.defineProperty(Swatch.prototype, "r", {
    get: function () {
      return this._rgb[0];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Swatch.prototype, "g", {
    get: function () {
      return this._rgb[1];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Swatch.prototype, "b", {
    get: function () {
      return this._rgb[2];
    },
    enumerable: true,
    configurable: true
  });

  Swatch.prototype.getRgb = function () {
    return this._rgb;
  };

  Swatch.prototype.getHsl = function () {
    if (!this._hsl) {
      var _a = this._rgb,
          r = _a[0],
          g = _a[1],
          b = _a[2];
      this._hsl = converter_1.rgbToHsl(r, g, b);
    }

    return this._hsl;
  };

  Swatch.prototype.getPopulation = function () {
    return this._population;
  };

  Swatch.prototype.getHex = function () {
    if (!this._hex) {
      var _a = this._rgb,
          r = _a[0],
          g = _a[1],
          b = _a[2];
      this._hex = converter_1.rgbToHex(r, g, b);
    }

    return this._hex;
  };

  Swatch.prototype.getYiq = function () {
    if (!this._yiq) {
      var rgb = this._rgb;
      this._yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    }

    return this._yiq;
  };

  Swatch.prototype.getTitleTextColor = function () {
    return this.getYiq() < 200 ? '#fff' : '#000';
  };

  Swatch.prototype.getBodyTextColor = function () {
    return this.getYiq() < 150 ? '#fff' : '#000';
  };

  return Swatch;
}();

exports.Swatch = Swatch;

/***/ }),

/***/ "./node_modules/@vibrant/core/lib/pipeline/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@vibrant/core/lib/pipeline/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var image_1 = __webpack_require__(/*! @vibrant/image */ "./node_modules/@vibrant/image/lib/index.js");

var Bluebird = __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js");

var Stage =
/** @class */
function () {
  function Stage(pipeline) {
    this.pipeline = pipeline;
    this._map = {};
  }

  Stage.prototype.names = function () {
    return Object.keys(this._map);
  };

  Stage.prototype.has = function (name) {
    return !!this._map[name];
  };

  Stage.prototype.get = function (name) {
    return this._map[name];
  };

  Stage.prototype.register = function (name, stageFn) {
    this._map[name] = stageFn;
    return this.pipeline;
  };

  return Stage;
}();

exports.Stage = Stage;

var BasicPipeline =
/** @class */
function () {
  function BasicPipeline() {
    this.filter = new Stage(this);
    this.quantizer = new Stage(this);
    this.generator = new Stage(this);
  }

  BasicPipeline.prototype._buildProcessTasks = function (_a) {
    var _this = this;

    var filters = _a.filters,
        quantizer = _a.quantizer,
        generators = _a.generators; // Support wildcard for generators

    if (generators.length === 1 && generators[0] === '*') {
      generators = this.generator.names();
    }

    return {
      filters: filters.map(function (f) {
        return createTask(_this.filter, f);
      }),
      quantizer: createTask(this.quantizer, quantizer),
      generators: generators.map(function (g) {
        return createTask(_this.generator, g);
      })
    };

    function createTask(stage, o) {
      var name, options;

      if (typeof o === 'string') {
        name = o;
      } else {
        name = o.name;
        options = o.options;
      }

      return {
        name: name,
        fn: stage.get(name),
        options: options
      };
    }
  };

  BasicPipeline.prototype.process = function (imageData, opts) {
    var _this = this;

    var _a = this._buildProcessTasks(opts),
        filters = _a.filters,
        quantizer = _a.quantizer,
        generators = _a.generators;

    return this._filterColors(filters, imageData).then(function (imageData) {
      return _this._generateColors(quantizer, imageData);
    }).then(function (colors) {
      return {
        colors: colors,
        palettes: _this._generatePalettes(generators, colors)
      };
    }).props();
  };

  BasicPipeline.prototype._filterColors = function (filters, imageData) {
    return Bluebird.resolve(image_1.applyFilters(imageData, filters.map(function (_a) {
      var fn = _a.fn;
      return fn;
    })));
  };

  BasicPipeline.prototype._generateColors = function (quantizer, imageData) {
    return Bluebird.resolve(quantizer.fn(imageData.data, quantizer.options));
  };

  BasicPipeline.prototype._generatePalettes = function (generators, colors) {
    return Bluebird.props(generators.reduce(function (promises, _a) {
      var name = _a.name,
          fn = _a.fn,
          options = _a.options;
      promises[name] = Bluebird.resolve(fn(colors, options));
      return promises;
    }, {}));
  };

  return BasicPipeline;
}();

exports.BasicPipeline = BasicPipeline;

/***/ }),

/***/ "./node_modules/@vibrant/core/lib/pipeline/worker/host.js":
/*!****************************************************************!*\
  !*** ./node_modules/@vibrant/core/lib/pipeline/worker/host.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var worker_1 = __webpack_require__(/*! @vibrant/worker/lib/worker */ "./node_modules/@vibrant/worker/lib/worker.js");

function runPipelineInWorker(self, pipeline) {
  worker_1.default(self, function (imageData, opts) {
    return pipeline.process(imageData, opts);
  });
}

exports.default = runPipelineInWorker;

/***/ }),

/***/ "./node_modules/@vibrant/generator-default/lib/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@vibrant/generator-default/lib/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var color_1 = __webpack_require__(/*! @vibrant/color */ "./node_modules/@vibrant/color/lib/index.js");

var converter_1 = __webpack_require__(/*! @vibrant/color/lib/converter */ "./node_modules/@vibrant/color/lib/converter.js");

var defaults = __webpack_require__(/*! lodash/defaults */ "./node_modules/lodash/defaults.js");

var DefaultOpts = {
  targetDarkLuma: 0.26,
  maxDarkLuma: 0.45,
  minLightLuma: 0.55,
  targetLightLuma: 0.74,
  minNormalLuma: 0.3,
  targetNormalLuma: 0.5,
  maxNormalLuma: 0.7,
  targetMutesSaturation: 0.3,
  maxMutesSaturation: 0.4,
  targetVibrantSaturation: 1.0,
  minVibrantSaturation: 0.35,
  weightSaturation: 3,
  weightLuma: 6.5,
  weightPopulation: 0.5
};

function _findMaxPopulation(swatches) {
  var p = 0;
  swatches.forEach(function (s) {
    p = Math.max(p, s.getPopulation());
  });
  return p;
}

function _isAlreadySelected(palette, s) {
  return palette.Vibrant === s || palette.DarkVibrant === s || palette.LightVibrant === s || palette.Muted === s || palette.DarkMuted === s || palette.LightMuted === s;
}

function _createComparisonValue(saturation, targetSaturation, luma, targetLuma, population, maxPopulation, opts) {
  function weightedMean() {
    var values = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }

    var sum = 0;
    var weightSum = 0;

    for (var i = 0; i < values.length; i += 2) {
      var value = values[i];
      var weight = values[i + 1];
      sum += value * weight;
      weightSum += weight;
    }

    return sum / weightSum;
  }

  function invertDiff(value, targetValue) {
    return 1 - Math.abs(value - targetValue);
  }

  return weightedMean(invertDiff(saturation, targetSaturation), opts.weightSaturation, invertDiff(luma, targetLuma), opts.weightLuma, population / maxPopulation, opts.weightPopulation);
}

function _findColorVariation(palette, swatches, maxPopulation, targetLuma, minLuma, maxLuma, targetSaturation, minSaturation, maxSaturation, opts) {
  var max = null;
  var maxValue = 0;
  swatches.forEach(function (swatch) {
    var _a = swatch.getHsl(),
        s = _a[1],
        l = _a[2];

    if (s >= minSaturation && s <= maxSaturation && l >= minLuma && l <= maxLuma && !_isAlreadySelected(palette, swatch)) {
      var value = _createComparisonValue(s, targetSaturation, l, targetLuma, swatch.getPopulation(), maxPopulation, opts);

      if (max === null || value > maxValue) {
        max = swatch;
        maxValue = value;
      }
    }
  });
  return max;
}

function _generateVariationColors(swatches, maxPopulation, opts) {
  var palette = {}; // mVibrantSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,
  //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);

  palette.Vibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts); // mLightVibrantSwatch = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,
  //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);

  palette.LightVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts); // mDarkVibrantSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,
  //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f);

  palette.DarkVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts); // mMutedSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,
  //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);

  palette.Muted = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts); // mLightMutedColor = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,
  //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);

  palette.LightMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts); // mDarkMutedSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,
  //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION);

  palette.DarkMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
  return palette;
}

function _generateEmptySwatches(palette, maxPopulation, opts) {
  if (palette.Vibrant === null && palette.DarkVibrant !== null) {
    var _a = palette.DarkVibrant.getHsl(),
        h = _a[0],
        s = _a[1],
        l = _a[2];

    l = opts.targetNormalLuma;
    palette.Vibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
  }

  if (palette.DarkVibrant === null && palette.Vibrant !== null) {
    var _b = palette.Vibrant.getHsl(),
        h = _b[0],
        s = _b[1],
        l = _b[2];

    l = opts.targetDarkLuma;
    palette.DarkVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
  }
}

var DefaultGenerator = function (swatches, opts) {
  opts = defaults({}, opts, DefaultOpts);

  var maxPopulation = _findMaxPopulation(swatches);

  var palette = _generateVariationColors(swatches, maxPopulation, opts);

  _generateEmptySwatches(palette, maxPopulation, opts);

  return palette;
};

exports.default = DefaultGenerator;

/***/ }),

/***/ "./node_modules/@vibrant/image/lib/histogram.js":
/*!******************************************************!*\
  !*** ./node_modules/@vibrant/image/lib/histogram.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Histogram =
/** @class */
function () {
  function Histogram(pixels, opts) {
    this.pixels = pixels;
    this.opts = opts;
    var sigBits = opts.sigBits;

    var getColorIndex = function (r, g, b) {
      return (r << 2 * sigBits) + (g << sigBits) + b;
    };

    this.getColorIndex = getColorIndex;
    var rshift = 8 - sigBits;
    var hn = 1 << 3 * sigBits;
    var hist = new Uint32Array(hn);
    var rmax;
    var rmin;
    var gmax;
    var gmin;
    var bmax;
    var bmin;
    var r;
    var g;
    var b;
    var a;
    rmax = gmax = bmax = 0;
    rmin = gmin = bmin = Number.MAX_VALUE;
    var n = pixels.length / 4;
    var i = 0;

    while (i < n) {
      var offset = i * 4;
      i++;
      r = pixels[offset + 0];
      g = pixels[offset + 1];
      b = pixels[offset + 2];
      a = pixels[offset + 3]; // Ignored pixels' alpha is marked as 0 in filtering stage

      if (a === 0) continue;
      r = r >> rshift;
      g = g >> rshift;
      b = b >> rshift;
      var index = getColorIndex(r, g, b);
      hist[index] += 1;
      if (r > rmax) rmax = r;
      if (r < rmin) rmin = r;
      if (g > gmax) gmax = g;
      if (g < gmin) gmin = g;
      if (b > bmax) bmax = b;
      if (b < bmin) bmin = b;
    }

    this._colorCount = hist.reduce(function (total, c) {
      return c > 0 ? total + 1 : total;
    }, 0);
    this.hist = hist;
    this.rmax = rmax;
    this.rmin = rmin;
    this.gmax = gmax;
    this.gmin = gmin;
    this.bmax = bmax;
    this.bmin = bmin;
  }

  Object.defineProperty(Histogram.prototype, "colorCount", {
    get: function () {
      return this._colorCount;
    },
    enumerable: true,
    configurable: true
  });
  return Histogram;
}();

exports.default = Histogram;

/***/ }),

/***/ "./node_modules/@vibrant/image/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@vibrant/image/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ImageBase =
/** @class */
function () {
  function ImageBase() {}

  ImageBase.prototype.scaleDown = function (opts) {
    var width = this.getWidth();
    var height = this.getHeight();
    var ratio = 1;

    if (opts.maxDimension > 0) {
      var maxSide = Math.max(width, height);
      if (maxSide > opts.maxDimension) ratio = opts.maxDimension / maxSide;
    } else {
      ratio = 1 / opts.quality;
    }

    if (ratio < 1) this.resize(width * ratio, height * ratio, ratio);
  };

  return ImageBase;
}();

exports.ImageBase = ImageBase;

function applyFilters(imageData, filters) {
  if (filters.length > 0) {
    var pixels = imageData.data;
    var n = pixels.length / 4;
    var offset = void 0,
        r = void 0,
        g = void 0,
        b = void 0,
        a = void 0;

    for (var i = 0; i < n; i++) {
      offset = i * 4;
      r = pixels[offset + 0];
      g = pixels[offset + 1];
      b = pixels[offset + 2];
      a = pixels[offset + 3]; // Mark ignored colorj

      for (var j = 0; j < filters.length; j++) {
        if (!filters[j](r, g, b, a)) {
          pixels[offset + 3] = 0;
          break;
        }
      }
    }
  }

  return imageData;
}

exports.applyFilters = applyFilters;

/***/ }),

/***/ "./node_modules/@vibrant/quantizer-mmcq/lib/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@vibrant/quantizer-mmcq/lib/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var color_1 = __webpack_require__(/*! @vibrant/color */ "./node_modules/@vibrant/color/lib/index.js");

var vbox_1 = __webpack_require__(/*! ./vbox */ "./node_modules/@vibrant/quantizer-mmcq/lib/vbox.js");

var pqueue_1 = __webpack_require__(/*! ./pqueue */ "./node_modules/@vibrant/quantizer-mmcq/lib/pqueue.js");

var fractByPopulations = 0.75;

function _splitBoxes(pq, target) {
  var lastSize = pq.size();

  while (pq.size() < target) {
    var vbox = pq.pop();

    if (vbox && vbox.count() > 0) {
      var _a = vbox.split(),
          vbox1 = _a[0],
          vbox2 = _a[1];

      pq.push(vbox1);
      if (vbox2 && vbox2.count() > 0) pq.push(vbox2); // No more new boxes, converged

      if (pq.size() === lastSize) {
        break;
      } else {
        lastSize = pq.size();
      }
    } else {
      break;
    }
  }
}

var MMCQ = function (pixels, opts) {
  if (pixels.length === 0 || opts.colorCount < 2 || opts.colorCount > 256) {
    throw new Error('Wrong MMCQ parameters');
  }

  var vbox = vbox_1.default.build(pixels);
  var colorCount = vbox.histogram.colorCount;
  var pq = new pqueue_1.default(function (a, b) {
    return a.count() - b.count();
  });
  pq.push(vbox); // first set of colors, sorted by population

  _splitBoxes(pq, fractByPopulations * opts.colorCount); // Re-order


  var pq2 = new pqueue_1.default(function (a, b) {
    return a.count() * a.volume() - b.count() * b.volume();
  });
  pq2.contents = pq.contents; // next set - generate the median cuts using the (npix * vol) sorting.

  _splitBoxes(pq2, opts.colorCount - pq2.size()); // calculate the actual colors


  return generateSwatches(pq2);
};

function generateSwatches(pq) {
  var swatches = [];

  while (pq.size()) {
    var v = pq.pop();
    var color = v.avg();
    var r = color[0],
        g = color[1],
        b = color[2];
    swatches.push(new color_1.Swatch(color, v.count()));
  }

  return swatches;
}

exports.default = MMCQ;

/***/ }),

/***/ "./node_modules/@vibrant/quantizer-mmcq/lib/pqueue.js":
/*!************************************************************!*\
  !*** ./node_modules/@vibrant/quantizer-mmcq/lib/pqueue.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var PQueue =
/** @class */
function () {
  function PQueue(comparator) {
    this._comparator = comparator;
    this.contents = [];
    this._sorted = false;
  }

  PQueue.prototype._sort = function () {
    if (!this._sorted) {
      this.contents.sort(this._comparator);
      this._sorted = true;
    }
  };

  PQueue.prototype.push = function (item) {
    this.contents.push(item);
    this._sorted = false;
  };

  PQueue.prototype.peek = function (index) {
    this._sort();

    index = typeof index === 'number' ? index : this.contents.length - 1;
    return this.contents[index];
  };

  PQueue.prototype.pop = function () {
    this._sort();

    return this.contents.pop();
  };

  PQueue.prototype.size = function () {
    return this.contents.length;
  };

  PQueue.prototype.map = function (mapper) {
    this._sort();

    return this.contents.map(mapper);
  };

  return PQueue;
}();

exports.default = PQueue;

/***/ }),

/***/ "./node_modules/@vibrant/quantizer-mmcq/lib/vbox.js":
/*!**********************************************************!*\
  !*** ./node_modules/@vibrant/quantizer-mmcq/lib/vbox.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var histogram_1 = __webpack_require__(/*! @vibrant/image/lib/histogram */ "./node_modules/@vibrant/image/lib/histogram.js");

var SIGBITS = 5;
var RSHIFT = 8 - SIGBITS;

var VBox =
/** @class */
function () {
  function VBox(r1, r2, g1, g2, b1, b2, histogram) {
    this.histogram = histogram;
    this._volume = -1;
    this._count = -1; // NOTE: dimension will be mutated by split operation.
    //       It must be specified explicitly, not from histogram

    this.dimension = {
      r1: r1,
      r2: r2,
      g1: g1,
      g2: g2,
      b1: b1,
      b2: b2
    };
  }

  VBox.build = function (pixels) {
    var h = new histogram_1.default(pixels, {
      sigBits: SIGBITS
    });
    var rmin = h.rmin,
        rmax = h.rmax,
        gmin = h.gmin,
        gmax = h.gmax,
        bmin = h.bmin,
        bmax = h.bmax;
    return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, h);
  };

  VBox.prototype.invalidate = function () {
    this._volume = this._count = -1;
    this._avg = null;
  };

  VBox.prototype.volume = function () {
    if (this._volume < 0) {
      var _a = this.dimension,
          r1 = _a.r1,
          r2 = _a.r2,
          g1 = _a.g1,
          g2 = _a.g2,
          b1 = _a.b1,
          b2 = _a.b2;
      this._volume = (r2 - r1 + 1) * (g2 - g1 + 1) * (b2 - b1 + 1);
    }

    return this._volume;
  };

  VBox.prototype.count = function () {
    if (this._count < 0) {
      var _a = this.histogram,
          hist = _a.hist,
          getColorIndex = _a.getColorIndex;
      var _b = this.dimension,
          r1 = _b.r1,
          r2 = _b.r2,
          g1 = _b.g1,
          g2 = _b.g2,
          b1 = _b.b1,
          b2 = _b.b2;
      var c = 0;

      for (var r = r1; r <= r2; r++) {
        for (var g = g1; g <= g2; g++) {
          for (var b = b1; b <= b2; b++) {
            var index = getColorIndex(r, g, b);
            c += hist[index];
          }
        }
      }

      this._count = c;
    }

    return this._count;
  };

  VBox.prototype.clone = function () {
    var histogram = this.histogram;
    var _a = this.dimension,
        r1 = _a.r1,
        r2 = _a.r2,
        g1 = _a.g1,
        g2 = _a.g2,
        b1 = _a.b1,
        b2 = _a.b2;
    return new VBox(r1, r2, g1, g2, b1, b2, histogram);
  };

  VBox.prototype.avg = function () {
    if (!this._avg) {
      var _a = this.histogram,
          hist = _a.hist,
          getColorIndex = _a.getColorIndex;
      var _b = this.dimension,
          r1 = _b.r1,
          r2 = _b.r2,
          g1 = _b.g1,
          g2 = _b.g2,
          b1 = _b.b1,
          b2 = _b.b2;
      var ntot = 0;
      var mult = 1 << 8 - SIGBITS;
      var rsum = void 0;
      var gsum = void 0;
      var bsum = void 0;
      rsum = gsum = bsum = 0;

      for (var r = r1; r <= r2; r++) {
        for (var g = g1; g <= g2; g++) {
          for (var b = b1; b <= b2; b++) {
            var index = getColorIndex(r, g, b);
            var h = hist[index];
            ntot += h;
            rsum += h * (r + 0.5) * mult;
            gsum += h * (g + 0.5) * mult;
            bsum += h * (b + 0.5) * mult;
          }
        }
      }

      if (ntot) {
        this._avg = [~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot)];
      } else {
        this._avg = [~~(mult * (r1 + r2 + 1) / 2), ~~(mult * (g1 + g2 + 1) / 2), ~~(mult * (b1 + b2 + 1) / 2)];
      }
    }

    return this._avg;
  };

  VBox.prototype.contains = function (rgb) {
    var r = rgb[0],
        g = rgb[1],
        b = rgb[2];
    var _a = this.dimension,
        r1 = _a.r1,
        r2 = _a.r2,
        g1 = _a.g1,
        g2 = _a.g2,
        b1 = _a.b1,
        b2 = _a.b2;
    r >>= RSHIFT;
    g >>= RSHIFT;
    b >>= RSHIFT;
    return r >= r1 && r <= r2 && g >= g1 && g <= g2 && b >= b1 && b <= b2;
  };

  VBox.prototype.split = function () {
    var _a = this.histogram,
        hist = _a.hist,
        getColorIndex = _a.getColorIndex;
    var _b = this.dimension,
        r1 = _b.r1,
        r2 = _b.r2,
        g1 = _b.g1,
        g2 = _b.g2,
        b1 = _b.b1,
        b2 = _b.b2;
    var count = this.count();
    if (!count) return [];
    if (count === 1) return [this.clone()];
    var rw = r2 - r1 + 1;
    var gw = g2 - g1 + 1;
    var bw = b2 - b1 + 1;
    var maxw = Math.max(rw, gw, bw);
    var accSum = null;
    var sum;
    var total;
    sum = total = 0;
    var maxd = null;

    if (maxw === rw) {
      maxd = 'r';
      accSum = new Uint32Array(r2 + 1);

      for (var r = r1; r <= r2; r++) {
        sum = 0;

        for (var g = g1; g <= g2; g++) {
          for (var b = b1; b <= b2; b++) {
            var index = getColorIndex(r, g, b);
            sum += hist[index];
          }
        }

        total += sum;
        accSum[r] = total;
      }
    } else if (maxw === gw) {
      maxd = 'g';
      accSum = new Uint32Array(g2 + 1);

      for (var g = g1; g <= g2; g++) {
        sum = 0;

        for (var r = r1; r <= r2; r++) {
          for (var b = b1; b <= b2; b++) {
            var index = getColorIndex(r, g, b);
            sum += hist[index];
          }
        }

        total += sum;
        accSum[g] = total;
      }
    } else {
      maxd = 'b';
      accSum = new Uint32Array(b2 + 1);

      for (var b = b1; b <= b2; b++) {
        sum = 0;

        for (var r = r1; r <= r2; r++) {
          for (var g = g1; g <= g2; g++) {
            var index = getColorIndex(r, g, b);
            sum += hist[index];
          }
        }

        total += sum;
        accSum[b] = total;
      }
    }

    var splitPoint = -1;
    var reverseSum = new Uint32Array(accSum.length);

    for (var i = 0; i < accSum.length; i++) {
      var d = accSum[i];
      if (splitPoint < 0 && d > total / 2) splitPoint = i;
      reverseSum[i] = total - d;
    }

    var vbox = this;

    function doCut(d) {
      var dim1 = d + '1';
      var dim2 = d + '2';
      var d1 = vbox.dimension[dim1];
      var d2 = vbox.dimension[dim2];
      var vbox1 = vbox.clone();
      var vbox2 = vbox.clone();
      var left = splitPoint - d1;
      var right = d2 - splitPoint;

      if (left <= right) {
        d2 = Math.min(d2 - 1, ~~(splitPoint + right / 2));
        d2 = Math.max(0, d2);
      } else {
        d2 = Math.max(d1, ~~(splitPoint - 1 - left / 2));
        d2 = Math.min(vbox.dimension[dim2], d2);
      }

      while (!accSum[d2]) d2++;

      var c2 = reverseSum[d2];

      while (!c2 && accSum[d2 - 1]) c2 = reverseSum[--d2];

      vbox1.dimension[dim2] = d2;
      vbox2.dimension[dim1] = d2 + 1;
      return [vbox1, vbox2];
    }

    return doCut(maxd);
  };

  return VBox;
}();

exports.default = VBox;

/***/ }),

/***/ "./node_modules/@vibrant/worker/lib/worker.js":
/*!****************************************************!*\
  !*** ./node_modules/@vibrant/worker/lib/worker.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Bluebird = __webpack_require__(/*! bluebird */ "./node_modules/bluebird/js/browser/bluebird.js");

function runInWorker(self, fn) {
  self.onmessage = function (event) {
    var data = event.data;
    var id = data.id,
        payload = data.payload;
    var response;
    Bluebird.resolve(fn.apply(void 0, payload)).then(function (ret) {
      self.postMessage({
        id: id,
        type: 'return',
        payload: ret
      });
    }).catch(function (e) {
      self.postMessage({
        id: id,
        type: 'error',
        payload: e.message
      });
    });
  };
}

exports.default = runInWorker;

/***/ }),

/***/ "./node_modules/bluebird/js/browser/bluebird.js":
/*!******************************************************!*\
  !*** ./node_modules/bluebird/js/browser/bluebird.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2018 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

/**
 * bluebird build version 3.5.3
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function (e) {
  if (true) module.exports = e();else { var f; }
}(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof _dereq_ == "function" && _dereq_;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }

        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }

      return n[o].exports;
    }

    var i = typeof _dereq_ == "function" && _dereq_;

    for (var o = 0; o < r.length; o++) s(r[o]);

    return s;
  }({
    1: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise) {
        var SomePromiseArray = Promise._SomePromiseArray;

        function any(promises) {
          var ret = new SomePromiseArray(promises);
          var promise = ret.promise();
          ret.setHowMany(1);
          ret.setUnwrap();
          ret.init();
          return promise;
        }

        Promise.any = function (promises) {
          return any(promises);
        };

        Promise.prototype.any = function () {
          return any(this);
        };
      };
    }, {}],
    2: [function (_dereq_, module, exports) {
      "use strict";

      var firstLineError;

      try {
        throw new Error();
      } catch (e) {
        firstLineError = e;
      }

      var schedule = _dereq_("./schedule");

      var Queue = _dereq_("./queue");

      var util = _dereq_("./util");

      function Async() {
        this._customScheduler = false;
        this._isTickUsed = false;
        this._lateQueue = new Queue(16);
        this._normalQueue = new Queue(16);
        this._haveDrainedQueues = false;
        this._trampolineEnabled = true;
        var self = this;

        this.drainQueues = function () {
          self._drainQueues();
        };

        this._schedule = schedule;
      }

      Async.prototype.setScheduler = function (fn) {
        var prev = this._schedule;
        this._schedule = fn;
        this._customScheduler = true;
        return prev;
      };

      Async.prototype.hasCustomScheduler = function () {
        return this._customScheduler;
      };

      Async.prototype.enableTrampoline = function () {
        this._trampolineEnabled = true;
      };

      Async.prototype.disableTrampolineIfNecessary = function () {
        if (util.hasDevTools) {
          this._trampolineEnabled = false;
        }
      };

      Async.prototype.haveItemsQueued = function () {
        return this._isTickUsed || this._haveDrainedQueues;
      };

      Async.prototype.fatalError = function (e, isNode) {
        if (isNode) {
          process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
          process.exit(2);
        } else {
          this.throwLater(e);
        }
      };

      Async.prototype.throwLater = function (fn, arg) {
        if (arguments.length === 1) {
          arg = fn;

          fn = function () {
            throw arg;
          };
        }

        if (typeof setTimeout !== "undefined") {
          setTimeout(function () {
            fn(arg);
          }, 0);
        } else try {
          this._schedule(function () {
            fn(arg);
          });
        } catch (e) {
          throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
        }
      };

      function AsyncInvokeLater(fn, receiver, arg) {
        this._lateQueue.push(fn, receiver, arg);

        this._queueTick();
      }

      function AsyncInvoke(fn, receiver, arg) {
        this._normalQueue.push(fn, receiver, arg);

        this._queueTick();
      }

      function AsyncSettlePromises(promise) {
        this._normalQueue._pushOne(promise);

        this._queueTick();
      }

      if (!util.hasDevTools) {
        Async.prototype.invokeLater = AsyncInvokeLater;
        Async.prototype.invoke = AsyncInvoke;
        Async.prototype.settlePromises = AsyncSettlePromises;
      } else {
        Async.prototype.invokeLater = function (fn, receiver, arg) {
          if (this._trampolineEnabled) {
            AsyncInvokeLater.call(this, fn, receiver, arg);
          } else {
            this._schedule(function () {
              setTimeout(function () {
                fn.call(receiver, arg);
              }, 100);
            });
          }
        };

        Async.prototype.invoke = function (fn, receiver, arg) {
          if (this._trampolineEnabled) {
            AsyncInvoke.call(this, fn, receiver, arg);
          } else {
            this._schedule(function () {
              fn.call(receiver, arg);
            });
          }
        };

        Async.prototype.settlePromises = function (promise) {
          if (this._trampolineEnabled) {
            AsyncSettlePromises.call(this, promise);
          } else {
            this._schedule(function () {
              promise._settlePromises();
            });
          }
        };
      }

      function _drainQueue(queue) {
        while (queue.length() > 0) {
          _drainQueueStep(queue);
        }
      }

      function _drainQueueStep(queue) {
        var fn = queue.shift();

        if (typeof fn !== "function") {
          fn._settlePromises();
        } else {
          var receiver = queue.shift();
          var arg = queue.shift();
          fn.call(receiver, arg);
        }
      }

      Async.prototype._drainQueues = function () {
        _drainQueue(this._normalQueue);

        this._reset();

        this._haveDrainedQueues = true;

        _drainQueue(this._lateQueue);
      };

      Async.prototype._queueTick = function () {
        if (!this._isTickUsed) {
          this._isTickUsed = true;

          this._schedule(this.drainQueues);
        }
      };

      Async.prototype._reset = function () {
        this._isTickUsed = false;
      };

      module.exports = Async;
      module.exports.firstLineError = firstLineError;
    }, {
      "./queue": 26,
      "./schedule": 29,
      "./util": 36
    }],
    3: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL, tryConvertToPromise, debug) {
        var calledBind = false;

        var rejectThis = function (_, e) {
          this._reject(e);
        };

        var targetRejected = function (e, context) {
          context.promiseRejectionQueued = true;

          context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
        };

        var bindingResolved = function (thisArg, context) {
          if ((this._bitField & 50397184) === 0) {
            this._resolveCallback(context.target);
          }
        };

        var bindingRejected = function (e, context) {
          if (!context.promiseRejectionQueued) this._reject(e);
        };

        Promise.prototype.bind = function (thisArg) {
          if (!calledBind) {
            calledBind = true;
            Promise.prototype._propagateFrom = debug.propagateFromFunction();
            Promise.prototype._boundValue = debug.boundValueFunction();
          }

          var maybePromise = tryConvertToPromise(thisArg);
          var ret = new Promise(INTERNAL);

          ret._propagateFrom(this, 1);

          var target = this._target();

          ret._setBoundTo(maybePromise);

          if (maybePromise instanceof Promise) {
            var context = {
              promiseRejectionQueued: false,
              promise: ret,
              target: target,
              bindingPromise: maybePromise
            };

            target._then(INTERNAL, targetRejected, undefined, ret, context);

            maybePromise._then(bindingResolved, bindingRejected, undefined, ret, context);

            ret._setOnCancel(maybePromise);
          } else {
            ret._resolveCallback(target);
          }

          return ret;
        };

        Promise.prototype._setBoundTo = function (obj) {
          if (obj !== undefined) {
            this._bitField = this._bitField | 2097152;
            this._boundTo = obj;
          } else {
            this._bitField = this._bitField & ~2097152;
          }
        };

        Promise.prototype._isBound = function () {
          return (this._bitField & 2097152) === 2097152;
        };

        Promise.bind = function (thisArg, value) {
          return Promise.resolve(value).bind(thisArg);
        };
      };
    }, {}],
    4: [function (_dereq_, module, exports) {
      "use strict";

      var old;
      if (typeof Promise !== "undefined") old = Promise;

      function noConflict() {
        try {
          if (Promise === bluebird) Promise = old;
        } catch (e) {}

        return bluebird;
      }

      var bluebird = _dereq_("./promise")();

      bluebird.noConflict = noConflict;
      module.exports = bluebird;
    }, {
      "./promise": 22
    }],
    5: [function (_dereq_, module, exports) {
      "use strict";

      var cr = Object.create;

      if (cr) {
        var callerCache = cr(null);
        var getterCache = cr(null);
        callerCache[" size"] = getterCache[" size"] = 0;
      }

      module.exports = function (Promise) {
        var util = _dereq_("./util");

        var canEvaluate = util.canEvaluate;
        var isIdentifier = util.isIdentifier;
        var getMethodCaller;
        var getGetter;

        if (false) { var getCompiled, makeGetter, makeMethodCaller; }

        function ensureMethod(obj, methodName) {
          var fn;
          if (obj != null) fn = obj[methodName];

          if (typeof fn !== "function") {
            var message = "Object " + util.classString(obj) + " has no method '" + util.toString(methodName) + "'";
            throw new Promise.TypeError(message);
          }

          return fn;
        }

        function caller(obj) {
          var methodName = this.pop();
          var fn = ensureMethod(obj, methodName);
          return fn.apply(obj, this);
        }

        Promise.prototype.call = function (methodName) {
          var args = [].slice.call(arguments, 1);
          ;

          if (false) { var maybeCaller; }

          args.push(methodName);
          return this._then(caller, undefined, undefined, args, undefined);
        };

        function namedGetter(obj) {
          return obj[this];
        }

        function indexedGetter(obj) {
          var index = +this;
          if (index < 0) index = Math.max(0, index + obj.length);
          return obj[index];
        }

        Promise.prototype.get = function (propertyName) {
          var isIndex = typeof propertyName === "number";
          var getter;

          if (!isIndex) {
            if (canEvaluate) {
              var maybeGetter = getGetter(propertyName);
              getter = maybeGetter !== null ? maybeGetter : namedGetter;
            } else {
              getter = namedGetter;
            }
          } else {
            getter = indexedGetter;
          }

          return this._then(getter, undefined, undefined, propertyName, undefined);
        };
      };
    }, {
      "./util": 36
    }],
    6: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, apiRejection, debug) {
        var util = _dereq_("./util");

        var tryCatch = util.tryCatch;
        var errorObj = util.errorObj;
        var async = Promise._async;

        Promise.prototype["break"] = Promise.prototype.cancel = function () {
          if (!debug.cancellation()) return this._warn("cancellation is disabled");
          var promise = this;
          var child = promise;

          while (promise._isCancellable()) {
            if (!promise._cancelBy(child)) {
              if (child._isFollowing()) {
                child._followee().cancel();
              } else {
                child._cancelBranched();
              }

              break;
            }

            var parent = promise._cancellationParent;

            if (parent == null || !parent._isCancellable()) {
              if (promise._isFollowing()) {
                promise._followee().cancel();
              } else {
                promise._cancelBranched();
              }

              break;
            } else {
              if (promise._isFollowing()) promise._followee().cancel();

              promise._setWillBeCancelled();

              child = promise;
              promise = parent;
            }
          }
        };

        Promise.prototype._branchHasCancelled = function () {
          this._branchesRemainingToCancel--;
        };

        Promise.prototype._enoughBranchesHaveCancelled = function () {
          return this._branchesRemainingToCancel === undefined || this._branchesRemainingToCancel <= 0;
        };

        Promise.prototype._cancelBy = function (canceller) {
          if (canceller === this) {
            this._branchesRemainingToCancel = 0;

            this._invokeOnCancel();

            return true;
          } else {
            this._branchHasCancelled();

            if (this._enoughBranchesHaveCancelled()) {
              this._invokeOnCancel();

              return true;
            }
          }

          return false;
        };

        Promise.prototype._cancelBranched = function () {
          if (this._enoughBranchesHaveCancelled()) {
            this._cancel();
          }
        };

        Promise.prototype._cancel = function () {
          if (!this._isCancellable()) return;

          this._setCancelled();

          async.invoke(this._cancelPromises, this, undefined);
        };

        Promise.prototype._cancelPromises = function () {
          if (this._length() > 0) this._settlePromises();
        };

        Promise.prototype._unsetOnCancel = function () {
          this._onCancelField = undefined;
        };

        Promise.prototype._isCancellable = function () {
          return this.isPending() && !this._isCancelled();
        };

        Promise.prototype.isCancellable = function () {
          return this.isPending() && !this.isCancelled();
        };

        Promise.prototype._doInvokeOnCancel = function (onCancelCallback, internalOnly) {
          if (util.isArray(onCancelCallback)) {
            for (var i = 0; i < onCancelCallback.length; ++i) {
              this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
            }
          } else if (onCancelCallback !== undefined) {
            if (typeof onCancelCallback === "function") {
              if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());

                if (e === errorObj) {
                  this._attachExtraTrace(e.e);

                  async.throwLater(e.e);
                }
              }
            } else {
              onCancelCallback._resultCancelled(this);
            }
          }
        };

        Promise.prototype._invokeOnCancel = function () {
          var onCancelCallback = this._onCancel();

          this._unsetOnCancel();

          async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
        };

        Promise.prototype._invokeInternalOnCancel = function () {
          if (this._isCancellable()) {
            this._doInvokeOnCancel(this._onCancel(), true);

            this._unsetOnCancel();
          }
        };

        Promise.prototype._resultCancelled = function () {
          this.cancel();
        };
      };
    }, {
      "./util": 36
    }],
    7: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (NEXT_FILTER) {
        var util = _dereq_("./util");

        var getKeys = _dereq_("./es5").keys;

        var tryCatch = util.tryCatch;
        var errorObj = util.errorObj;

        function catchFilter(instances, cb, promise) {
          return function (e) {
            var boundTo = promise._boundValue();

            predicateLoop: for (var i = 0; i < instances.length; ++i) {
              var item = instances[i];

              if (item === Error || item != null && item.prototype instanceof Error) {
                if (e instanceof item) {
                  return tryCatch(cb).call(boundTo, e);
                }
              } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);

                if (matchesPredicate === errorObj) {
                  return matchesPredicate;
                } else if (matchesPredicate) {
                  return tryCatch(cb).call(boundTo, e);
                }
              } else if (util.isObject(e)) {
                var keys = getKeys(item);

                for (var j = 0; j < keys.length; ++j) {
                  var key = keys[j];

                  if (item[key] != e[key]) {
                    continue predicateLoop;
                  }
                }

                return tryCatch(cb).call(boundTo, e);
              }
            }

            return NEXT_FILTER;
          };
        }

        return catchFilter;
      };
    }, {
      "./es5": 13,
      "./util": 36
    }],
    8: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise) {
        var longStackTraces = false;
        var contextStack = [];

        Promise.prototype._promiseCreated = function () {};

        Promise.prototype._pushContext = function () {};

        Promise.prototype._popContext = function () {
          return null;
        };

        Promise._peekContext = Promise.prototype._peekContext = function () {};

        function Context() {
          this._trace = new Context.CapturedTrace(peekContext());
        }

        Context.prototype._pushContext = function () {
          if (this._trace !== undefined) {
            this._trace._promiseCreated = null;
            contextStack.push(this._trace);
          }
        };

        Context.prototype._popContext = function () {
          if (this._trace !== undefined) {
            var trace = contextStack.pop();
            var ret = trace._promiseCreated;
            trace._promiseCreated = null;
            return ret;
          }

          return null;
        };

        function createContext() {
          if (longStackTraces) return new Context();
        }

        function peekContext() {
          var lastIndex = contextStack.length - 1;

          if (lastIndex >= 0) {
            return contextStack[lastIndex];
          }

          return undefined;
        }

        Context.CapturedTrace = null;
        Context.create = createContext;

        Context.deactivateLongStackTraces = function () {};

        Context.activateLongStackTraces = function () {
          var Promise_pushContext = Promise.prototype._pushContext;
          var Promise_popContext = Promise.prototype._popContext;
          var Promise_PeekContext = Promise._peekContext;
          var Promise_peekContext = Promise.prototype._peekContext;
          var Promise_promiseCreated = Promise.prototype._promiseCreated;

          Context.deactivateLongStackTraces = function () {
            Promise.prototype._pushContext = Promise_pushContext;
            Promise.prototype._popContext = Promise_popContext;
            Promise._peekContext = Promise_PeekContext;
            Promise.prototype._peekContext = Promise_peekContext;
            Promise.prototype._promiseCreated = Promise_promiseCreated;
            longStackTraces = false;
          };

          longStackTraces = true;
          Promise.prototype._pushContext = Context.prototype._pushContext;
          Promise.prototype._popContext = Context.prototype._popContext;
          Promise._peekContext = Promise.prototype._peekContext = peekContext;

          Promise.prototype._promiseCreated = function () {
            var ctx = this._peekContext();

            if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
          };
        };

        return Context;
      };
    }, {}],
    9: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, Context) {
        var getDomain = Promise._getDomain;
        var async = Promise._async;

        var Warning = _dereq_("./errors").Warning;

        var util = _dereq_("./util");

        var es5 = _dereq_("./es5");

        var canAttachTrace = util.canAttachTrace;
        var unhandledRejectionHandled;
        var possiblyUnhandledRejection;
        var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
        var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
        var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
        var stackFramePattern = null;
        var formatStack = null;
        var indentStackFrames = false;
        var printWarning;
        var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 && (true || util.env("BLUEBIRD_DEBUG") || util.env("NODE_ENV") === "development"));
        var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util.env("BLUEBIRD_WARNINGS")));
        var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));
        var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

        Promise.prototype.suppressUnhandledRejections = function () {
          var target = this._target();

          target._bitField = target._bitField & ~1048576 | 524288;
        };

        Promise.prototype._ensurePossibleRejectionHandled = function () {
          if ((this._bitField & 524288) !== 0) return;

          this._setRejectionIsUnhandled();

          var self = this;
          setTimeout(function () {
            self._notifyUnhandledRejection();
          }, 1);
        };

        Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
          fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, undefined, this);
        };

        Promise.prototype._setReturnedNonUndefined = function () {
          this._bitField = this._bitField | 268435456;
        };

        Promise.prototype._returnedNonUndefined = function () {
          return (this._bitField & 268435456) !== 0;
        };

        Promise.prototype._notifyUnhandledRejection = function () {
          if (this._isRejectionUnhandled()) {
            var reason = this._settledValue();

            this._setUnhandledRejectionIsNotified();

            fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this);
          }
        };

        Promise.prototype._setUnhandledRejectionIsNotified = function () {
          this._bitField = this._bitField | 262144;
        };

        Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
          this._bitField = this._bitField & ~262144;
        };

        Promise.prototype._isUnhandledRejectionNotified = function () {
          return (this._bitField & 262144) > 0;
        };

        Promise.prototype._setRejectionIsUnhandled = function () {
          this._bitField = this._bitField | 1048576;
        };

        Promise.prototype._unsetRejectionIsUnhandled = function () {
          this._bitField = this._bitField & ~1048576;

          if (this._isUnhandledRejectionNotified()) {
            this._unsetUnhandledRejectionIsNotified();

            this._notifyUnhandledRejectionIsHandled();
          }
        };

        Promise.prototype._isRejectionUnhandled = function () {
          return (this._bitField & 1048576) > 0;
        };

        Promise.prototype._warn = function (message, shouldUseOwnTrace, promise) {
          return warn(message, shouldUseOwnTrace, promise || this);
        };

        Promise.onPossiblyUnhandledRejection = function (fn) {
          var domain = getDomain();
          possiblyUnhandledRejection = typeof fn === "function" ? domain === null ? fn : util.domainBind(domain, fn) : undefined;
        };

        Promise.onUnhandledRejectionHandled = function (fn) {
          var domain = getDomain();
          unhandledRejectionHandled = typeof fn === "function" ? domain === null ? fn : util.domainBind(domain, fn) : undefined;
        };

        var disableLongStackTraces = function () {};

        Promise.longStackTraces = function () {
          if (async.haveItemsQueued() && !config.longStackTraces) {
            throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          if (!config.longStackTraces && longStackTracesIsSupported()) {
            var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
            var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
            var Promise_dereferenceTrace = Promise.prototype._dereferenceTrace;
            config.longStackTraces = true;

            disableLongStackTraces = function () {
              if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
              }

              Promise.prototype._captureStackTrace = Promise_captureStackTrace;
              Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
              Promise.prototype._dereferenceTrace = Promise_dereferenceTrace;
              Context.deactivateLongStackTraces();
              async.enableTrampoline();
              config.longStackTraces = false;
            };

            Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
            Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
            Promise.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
            Context.activateLongStackTraces();
            async.disableTrampolineIfNecessary();
          }
        };

        Promise.hasLongStackTraces = function () {
          return config.longStackTraces && longStackTracesIsSupported();
        };

        var fireDomEvent = function () {
          try {
            if (typeof CustomEvent === "function") {
              var event = new CustomEvent("CustomEvent");
              util.global.dispatchEvent(event);
              return function (name, event) {
                var eventData = {
                  detail: event,
                  cancelable: true
                };
                es5.defineProperty(eventData, "promise", {
                  value: event.promise
                });
                es5.defineProperty(eventData, "reason", {
                  value: event.reason
                });
                var domEvent = new CustomEvent(name.toLowerCase(), eventData);
                return !util.global.dispatchEvent(domEvent);
              };
            } else if (typeof Event === "function") {
              var event = new Event("CustomEvent");
              util.global.dispatchEvent(event);
              return function (name, event) {
                var domEvent = new Event(name.toLowerCase(), {
                  cancelable: true
                });
                domEvent.detail = event;
                es5.defineProperty(domEvent, "promise", {
                  value: event.promise
                });
                es5.defineProperty(domEvent, "reason", {
                  value: event.reason
                });
                return !util.global.dispatchEvent(domEvent);
              };
            } else {
              var event = document.createEvent("CustomEvent");
              event.initCustomEvent("testingtheevent", false, true, {});
              util.global.dispatchEvent(event);
              return function (name, event) {
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name.toLowerCase(), false, true, event);
                return !util.global.dispatchEvent(domEvent);
              };
            }
          } catch (e) {}

          return function () {
            return false;
          };
        }();

        var fireGlobalEvent = function () {
          if (util.isNode) {
            return function () {
              return process.emit.apply(process, arguments);
            };
          } else {
            if (!util.global) {
              return function () {
                return false;
              };
            }

            return function (name) {
              var methodName = "on" + name.toLowerCase();
              var method = util.global[methodName];
              if (!method) return false;
              method.apply(util.global, [].slice.call(arguments, 1));
              return true;
            };
          }
        }();

        function generatePromiseLifecycleEventObject(name, promise) {
          return {
            promise: promise
          };
        }

        var eventToObjectGenerator = {
          promiseCreated: generatePromiseLifecycleEventObject,
          promiseFulfilled: generatePromiseLifecycleEventObject,
          promiseRejected: generatePromiseLifecycleEventObject,
          promiseResolved: generatePromiseLifecycleEventObject,
          promiseCancelled: generatePromiseLifecycleEventObject,
          promiseChained: function (name, promise, child) {
            return {
              promise: promise,
              child: child
            };
          },
          warning: function (name, warning) {
            return {
              warning: warning
            };
          },
          unhandledRejection: function (name, reason, promise) {
            return {
              reason: reason,
              promise: promise
            };
          },
          rejectionHandled: generatePromiseLifecycleEventObject
        };

        var activeFireEvent = function (name) {
          var globalEventFired = false;

          try {
            globalEventFired = fireGlobalEvent.apply(null, arguments);
          } catch (e) {
            async.throwLater(e);
            globalEventFired = true;
          }

          var domEventFired = false;

          try {
            domEventFired = fireDomEvent(name, eventToObjectGenerator[name].apply(null, arguments));
          } catch (e) {
            async.throwLater(e);
            domEventFired = true;
          }

          return domEventFired || globalEventFired;
        };

        Promise.config = function (opts) {
          opts = Object(opts);

          if ("longStackTraces" in opts) {
            if (opts.longStackTraces) {
              Promise.longStackTraces();
            } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
              disableLongStackTraces();
            }
          }

          if ("warnings" in opts) {
            var warningsOption = opts.warnings;
            config.warnings = !!warningsOption;
            wForgottenReturn = config.warnings;

            if (util.isObject(warningsOption)) {
              if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
              }
            }
          }

          if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
            if (async.haveItemsQueued()) {
              throw new Error("cannot enable cancellation after promises are in use");
            }

            Promise.prototype._clearCancellationData = cancellationClearCancellationData;
            Promise.prototype._propagateFrom = cancellationPropagateFrom;
            Promise.prototype._onCancel = cancellationOnCancel;
            Promise.prototype._setOnCancel = cancellationSetOnCancel;
            Promise.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
            Promise.prototype._execute = cancellationExecute;
            propagateFromFunction = cancellationPropagateFrom;
            config.cancellation = true;
          }

          if ("monitoring" in opts) {
            if (opts.monitoring && !config.monitoring) {
              config.monitoring = true;
              Promise.prototype._fireEvent = activeFireEvent;
            } else if (!opts.monitoring && config.monitoring) {
              config.monitoring = false;
              Promise.prototype._fireEvent = defaultFireEvent;
            }
          }

          return Promise;
        };

        function defaultFireEvent() {
          return false;
        }

        Promise.prototype._fireEvent = defaultFireEvent;

        Promise.prototype._execute = function (executor, resolve, reject) {
          try {
            executor(resolve, reject);
          } catch (e) {
            return e;
          }
        };

        Promise.prototype._onCancel = function () {};

        Promise.prototype._setOnCancel = function (handler) {
          ;
        };

        Promise.prototype._attachCancellationCallback = function (onCancel) {
          ;
        };

        Promise.prototype._captureStackTrace = function () {};

        Promise.prototype._attachExtraTrace = function () {};

        Promise.prototype._dereferenceTrace = function () {};

        Promise.prototype._clearCancellationData = function () {};

        Promise.prototype._propagateFrom = function (parent, flags) {
          ;
          ;
        };

        function cancellationExecute(executor, resolve, reject) {
          var promise = this;

          try {
            executor(resolve, reject, function (onCancel) {
              if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
              }

              promise._attachCancellationCallback(onCancel);
            });
          } catch (e) {
            return e;
          }
        }

        function cancellationAttachCancellationCallback(onCancel) {
          if (!this._isCancellable()) return this;

          var previousOnCancel = this._onCancel();

          if (previousOnCancel !== undefined) {
            if (util.isArray(previousOnCancel)) {
              previousOnCancel.push(onCancel);
            } else {
              this._setOnCancel([previousOnCancel, onCancel]);
            }
          } else {
            this._setOnCancel(onCancel);
          }
        }

        function cancellationOnCancel() {
          return this._onCancelField;
        }

        function cancellationSetOnCancel(onCancel) {
          this._onCancelField = onCancel;
        }

        function cancellationClearCancellationData() {
          this._cancellationParent = undefined;
          this._onCancelField = undefined;
        }

        function cancellationPropagateFrom(parent, flags) {
          if ((flags & 1) !== 0) {
            this._cancellationParent = parent;
            var branchesRemainingToCancel = parent._branchesRemainingToCancel;

            if (branchesRemainingToCancel === undefined) {
              branchesRemainingToCancel = 0;
            }

            parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
          }

          if ((flags & 2) !== 0 && parent._isBound()) {
            this._setBoundTo(parent._boundTo);
          }
        }

        function bindingPropagateFrom(parent, flags) {
          if ((flags & 2) !== 0 && parent._isBound()) {
            this._setBoundTo(parent._boundTo);
          }
        }

        var propagateFromFunction = bindingPropagateFrom;

        function boundValueFunction() {
          var ret = this._boundTo;

          if (ret !== undefined) {
            if (ret instanceof Promise) {
              if (ret.isFulfilled()) {
                return ret.value();
              } else {
                return undefined;
              }
            }
          }

          return ret;
        }

        function longStackTracesCaptureStackTrace() {
          this._trace = new CapturedTrace(this._peekContext());
        }

        function longStackTracesAttachExtraTrace(error, ignoreSelf) {
          if (canAttachTrace(error)) {
            var trace = this._trace;

            if (trace !== undefined) {
              if (ignoreSelf) trace = trace._parent;
            }

            if (trace !== undefined) {
              trace.attachExtraTrace(error);
            } else if (!error.__stackCleaned__) {
              var parsed = parseStackAndMessage(error);
              util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n"));
              util.notEnumerableProp(error, "__stackCleaned__", true);
            }
          }
        }

        function longStackTracesDereferenceTrace() {
          this._trace = undefined;
        }

        function checkForgottenReturns(returnValue, promiseCreated, name, promise, parent) {
          if (returnValue === undefined && promiseCreated !== null && wForgottenReturn) {
            if (parent !== undefined && parent._returnedNonUndefined()) return;
            if ((promise._bitField & 65535) === 0) return;
            if (name) name = name + " ";
            var handlerLine = "";
            var creatorLine = "";

            if (promiseCreated._trace) {
              var traceLines = promiseCreated._trace.stack.split("\n");

              var stack = cleanStack(traceLines);

              for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];

                if (!nodeFramePattern.test(line)) {
                  var lineMatches = line.match(parseLinePattern);

                  if (lineMatches) {
                    handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                  }

                  break;
                }
              }

              if (stack.length > 0) {
                var firstUserLine = stack[0];

                for (var i = 0; i < traceLines.length; ++i) {
                  if (traceLines[i] === firstUserLine) {
                    if (i > 0) {
                      creatorLine = "\n" + traceLines[i - 1];
                    }

                    break;
                  }
                }
              }
            }

            var msg = "a promise was created in a " + name + "handler " + handlerLine + "but was not returned from it, " + "see http://goo.gl/rRqMUw" + creatorLine;

            promise._warn(msg, true, promiseCreated);
          }
        }

        function deprecated(name, replacement) {
          var message = name + " is deprecated and will be removed in a future version.";
          if (replacement) message += " Use " + replacement + " instead.";
          return warn(message);
        }

        function warn(message, shouldUseOwnTrace, promise) {
          if (!config.warnings) return;
          var warning = new Warning(message);
          var ctx;

          if (shouldUseOwnTrace) {
            promise._attachExtraTrace(warning);
          } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
            ctx.attachExtraTrace(warning);
          } else {
            var parsed = parseStackAndMessage(warning);
            warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
          }

          if (!activeFireEvent("warning", warning)) {
            formatAndLogError(warning, "", true);
          }
        }

        function reconstructStack(message, stacks) {
          for (var i = 0; i < stacks.length - 1; ++i) {
            stacks[i].push("From previous event:");
            stacks[i] = stacks[i].join("\n");
          }

          if (i < stacks.length) {
            stacks[i] = stacks[i].join("\n");
          }

          return message + "\n" + stacks.join("\n");
        }

        function removeDuplicateOrEmptyJumps(stacks) {
          for (var i = 0; i < stacks.length; ++i) {
            if (stacks[i].length === 0 || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
              stacks.splice(i, 1);
              i--;
            }
          }
        }

        function removeCommonRoots(stacks) {
          var current = stacks[0];

          for (var i = 1; i < stacks.length; ++i) {
            var prev = stacks[i];
            var currentLastIndex = current.length - 1;
            var currentLastLine = current[currentLastIndex];
            var commonRootMeetPoint = -1;

            for (var j = prev.length - 1; j >= 0; --j) {
              if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
              }
            }

            for (var j = commonRootMeetPoint; j >= 0; --j) {
              var line = prev[j];

              if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
              } else {
                break;
              }
            }

            current = prev;
          }
        }

        function cleanStack(stack) {
          var ret = [];

          for (var i = 0; i < stack.length; ++i) {
            var line = stack[i];
            var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
            var isInternalFrame = isTraceLine && shouldIgnore(line);

            if (isTraceLine && !isInternalFrame) {
              if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
              }

              ret.push(line);
            }
          }

          return ret;
        }

        function stackFramesAsArray(error) {
          var stack = error.stack.replace(/\s+$/g, "").split("\n");

          for (var i = 0; i < stack.length; ++i) {
            var line = stack[i];

            if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
              break;
            }
          }

          if (i > 0 && error.name != "SyntaxError") {
            stack = stack.slice(i);
          }

          return stack;
        }

        function parseStackAndMessage(error) {
          var stack = error.stack;
          var message = error.toString();
          stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
          return {
            message: message,
            stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
          };
        }

        function formatAndLogError(error, title, isSoft) {
          if (typeof console !== "undefined") {
            var message;

            if (util.isObject(error)) {
              var stack = error.stack;
              message = title + formatStack(stack, error);
            } else {
              message = title + String(error);
            }

            if (typeof printWarning === "function") {
              printWarning(message, isSoft);
            } else if (typeof console.log === "function" || typeof console.log === "object") {
              console.log(message);
            }
          }
        }

        function fireRejectionEvent(name, localHandler, reason, promise) {
          var localEventFired = false;

          try {
            if (typeof localHandler === "function") {
              localEventFired = true;

              if (name === "rejectionHandled") {
                localHandler(promise);
              } else {
                localHandler(reason, promise);
              }
            }
          } catch (e) {
            async.throwLater(e);
          }

          if (name === "unhandledRejection") {
            if (!activeFireEvent(name, reason, promise) && !localEventFired) {
              formatAndLogError(reason, "Unhandled rejection ");
            }
          } else {
            activeFireEvent(name, promise);
          }
        }

        function formatNonError(obj) {
          var str;

          if (typeof obj === "function") {
            str = "[function " + (obj.name || "anonymous") + "]";
          } else {
            str = obj && typeof obj.toString === "function" ? obj.toString() : util.toString(obj);
            var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;

            if (ruselessToString.test(str)) {
              try {
                var newStr = JSON.stringify(obj);
                str = newStr;
              } catch (e) {}
            }

            if (str.length === 0) {
              str = "(empty array)";
            }
          }

          return "(<" + snip(str) + ">, no stack trace)";
        }

        function snip(str) {
          var maxChars = 41;

          if (str.length < maxChars) {
            return str;
          }

          return str.substr(0, maxChars - 3) + "...";
        }

        function longStackTracesIsSupported() {
          return typeof captureStackTrace === "function";
        }

        var shouldIgnore = function () {
          return false;
        };

        var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;

        function parseLineInfo(line) {
          var matches = line.match(parseLineInfoRegex);

          if (matches) {
            return {
              fileName: matches[1],
              line: parseInt(matches[2], 10)
            };
          }
        }

        function setBounds(firstLineError, lastLineError) {
          if (!longStackTracesIsSupported()) return;
          var firstStackLines = firstLineError.stack.split("\n");
          var lastStackLines = lastLineError.stack.split("\n");
          var firstIndex = -1;
          var lastIndex = -1;
          var firstFileName;
          var lastFileName;

          for (var i = 0; i < firstStackLines.length; ++i) {
            var result = parseLineInfo(firstStackLines[i]);

            if (result) {
              firstFileName = result.fileName;
              firstIndex = result.line;
              break;
            }
          }

          for (var i = 0; i < lastStackLines.length; ++i) {
            var result = parseLineInfo(lastStackLines[i]);

            if (result) {
              lastFileName = result.fileName;
              lastIndex = result.line;
              break;
            }
          }

          if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
            return;
          }

          shouldIgnore = function (line) {
            if (bluebirdFramePattern.test(line)) return true;
            var info = parseLineInfo(line);

            if (info) {
              if (info.fileName === firstFileName && firstIndex <= info.line && info.line <= lastIndex) {
                return true;
              }
            }

            return false;
          };
        }

        function CapturedTrace(parent) {
          this._parent = parent;
          this._promisesCreated = 0;
          var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
          captureStackTrace(this, CapturedTrace);
          if (length > 32) this.uncycle();
        }

        util.inherits(CapturedTrace, Error);
        Context.CapturedTrace = CapturedTrace;

        CapturedTrace.prototype.uncycle = function () {
          var length = this._length;
          if (length < 2) return;
          var nodes = [];
          var stackToIndex = {};

          for (var i = 0, node = this; node !== undefined; ++i) {
            nodes.push(node);
            node = node._parent;
          }

          length = this._length = i;

          for (var i = length - 1; i >= 0; --i) {
            var stack = nodes[i].stack;

            if (stackToIndex[stack] === undefined) {
              stackToIndex[stack] = i;
            }
          }

          for (var i = 0; i < length; ++i) {
            var currentStack = nodes[i].stack;
            var index = stackToIndex[currentStack];

            if (index !== undefined && index !== i) {
              if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
              }

              nodes[i]._parent = undefined;
              nodes[i]._length = 1;
              var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

              if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];

                cycleEdgeNode._parent.uncycle();

                cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
              } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
              }

              var currentChildLength = cycleEdgeNode._length + 1;

              for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
              }

              return;
            }
          }
        };

        CapturedTrace.prototype.attachExtraTrace = function (error) {
          if (error.__stackCleaned__) return;
          this.uncycle();
          var parsed = parseStackAndMessage(error);
          var message = parsed.message;
          var stacks = [parsed.stack];
          var trace = this;

          while (trace !== undefined) {
            stacks.push(cleanStack(trace.stack.split("\n")));
            trace = trace._parent;
          }

          removeCommonRoots(stacks);
          removeDuplicateOrEmptyJumps(stacks);
          util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
          util.notEnumerableProp(error, "__stackCleaned__", true);
        };

        var captureStackTrace = function stackDetection() {
          var v8stackFramePattern = /^\s*at\s*/;

          var v8stackFormatter = function (stack, error) {
            if (typeof stack === "string") return stack;

            if (error.name !== undefined && error.message !== undefined) {
              return error.toString();
            }

            return formatNonError(error);
          };

          if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
            Error.stackTraceLimit += 6;
            stackFramePattern = v8stackFramePattern;
            formatStack = v8stackFormatter;
            var captureStackTrace = Error.captureStackTrace;

            shouldIgnore = function (line) {
              return bluebirdFramePattern.test(line);
            };

            return function (receiver, ignoreUntil) {
              Error.stackTraceLimit += 6;
              captureStackTrace(receiver, ignoreUntil);
              Error.stackTraceLimit -= 6;
            };
          }

          var err = new Error();

          if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
            stackFramePattern = /@/;
            formatStack = v8stackFormatter;
            indentStackFrames = true;
            return function captureStackTrace(o) {
              o.stack = new Error().stack;
            };
          }

          var hasStackAfterThrow;

          try {
            throw new Error();
          } catch (e) {
            hasStackAfterThrow = "stack" in e;
          }

          if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
            stackFramePattern = v8stackFramePattern;
            formatStack = v8stackFormatter;
            return function captureStackTrace(o) {
              Error.stackTraceLimit += 6;

              try {
                throw new Error();
              } catch (e) {
                o.stack = e.stack;
              }

              Error.stackTraceLimit -= 6;
            };
          }

          formatStack = function (stack, error) {
            if (typeof stack === "string") return stack;

            if ((typeof error === "object" || typeof error === "function") && error.name !== undefined && error.message !== undefined) {
              return error.toString();
            }

            return formatNonError(error);
          };

          return null;
        }([]);

        if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
          printWarning = function (message) {
            console.warn(message);
          };

          if (util.isNode && process.stderr.isTTY) {
            printWarning = function (message, isSoft) {
              var color = isSoft ? "\u001b[33m" : "\u001b[31m";
              console.warn(color + message + "\u001b[0m\n");
            };
          } else if (!util.isNode && typeof new Error().stack === "string") {
            printWarning = function (message, isSoft) {
              console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
            };
          }
        }

        var config = {
          warnings: warnings,
          longStackTraces: false,
          cancellation: false,
          monitoring: false
        };
        if (longStackTraces) Promise.longStackTraces();
        return {
          longStackTraces: function () {
            return config.longStackTraces;
          },
          warnings: function () {
            return config.warnings;
          },
          cancellation: function () {
            return config.cancellation;
          },
          monitoring: function () {
            return config.monitoring;
          },
          propagateFromFunction: function () {
            return propagateFromFunction;
          },
          boundValueFunction: function () {
            return boundValueFunction;
          },
          checkForgottenReturns: checkForgottenReturns,
          setBounds: setBounds,
          warn: warn,
          deprecated: deprecated,
          CapturedTrace: CapturedTrace,
          fireDomEvent: fireDomEvent,
          fireGlobalEvent: fireGlobalEvent
        };
      };
    }, {
      "./errors": 12,
      "./es5": 13,
      "./util": 36
    }],
    10: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise) {
        function returner() {
          return this.value;
        }

        function thrower() {
          throw this.reason;
        }

        Promise.prototype["return"] = Promise.prototype.thenReturn = function (value) {
          if (value instanceof Promise) value.suppressUnhandledRejections();
          return this._then(returner, undefined, undefined, {
            value: value
          }, undefined);
        };

        Promise.prototype["throw"] = Promise.prototype.thenThrow = function (reason) {
          return this._then(thrower, undefined, undefined, {
            reason: reason
          }, undefined);
        };

        Promise.prototype.catchThrow = function (reason) {
          if (arguments.length <= 1) {
            return this._then(undefined, thrower, undefined, {
              reason: reason
            }, undefined);
          } else {
            var _reason = arguments[1];

            var handler = function () {
              throw _reason;
            };

            return this.caught(reason, handler);
          }
        };

        Promise.prototype.catchReturn = function (value) {
          if (arguments.length <= 1) {
            if (value instanceof Promise) value.suppressUnhandledRejections();
            return this._then(undefined, returner, undefined, {
              value: value
            }, undefined);
          } else {
            var _value = arguments[1];
            if (_value instanceof Promise) _value.suppressUnhandledRejections();

            var handler = function () {
              return _value;
            };

            return this.caught(value, handler);
          }
        };
      };
    }, {}],
    11: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL) {
        var PromiseReduce = Promise.reduce;
        var PromiseAll = Promise.all;

        function promiseAllThis() {
          return PromiseAll(this);
        }

        function PromiseMapSeries(promises, fn) {
          return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
        }

        Promise.prototype.each = function (fn) {
          return PromiseReduce(this, fn, INTERNAL, 0)._then(promiseAllThis, undefined, undefined, this, undefined);
        };

        Promise.prototype.mapSeries = function (fn) {
          return PromiseReduce(this, fn, INTERNAL, INTERNAL);
        };

        Promise.each = function (promises, fn) {
          return PromiseReduce(promises, fn, INTERNAL, 0)._then(promiseAllThis, undefined, undefined, promises, undefined);
        };

        Promise.mapSeries = PromiseMapSeries;
      };
    }, {}],
    12: [function (_dereq_, module, exports) {
      "use strict";

      var es5 = _dereq_("./es5");

      var Objectfreeze = es5.freeze;

      var util = _dereq_("./util");

      var inherits = util.inherits;
      var notEnumerableProp = util.notEnumerableProp;

      function subError(nameProperty, defaultMessage) {
        function SubError(message) {
          if (!(this instanceof SubError)) return new SubError(message);
          notEnumerableProp(this, "message", typeof message === "string" ? message : defaultMessage);
          notEnumerableProp(this, "name", nameProperty);

          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          } else {
            Error.call(this);
          }
        }

        inherits(SubError, Error);
        return SubError;
      }

      var _TypeError, _RangeError;

      var Warning = subError("Warning", "warning");
      var CancellationError = subError("CancellationError", "cancellation error");
      var TimeoutError = subError("TimeoutError", "timeout error");
      var AggregateError = subError("AggregateError", "aggregate error");

      try {
        _TypeError = TypeError;
        _RangeError = RangeError;
      } catch (e) {
        _TypeError = subError("TypeError", "type error");
        _RangeError = subError("RangeError", "range error");
      }

      var methods = ("join pop push shift unshift slice filter forEach some " + "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

      for (var i = 0; i < methods.length; ++i) {
        if (typeof Array.prototype[methods[i]] === "function") {
          AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
        }
      }

      es5.defineProperty(AggregateError.prototype, "length", {
        value: 0,
        configurable: false,
        writable: true,
        enumerable: true
      });
      AggregateError.prototype["isOperational"] = true;
      var level = 0;

      AggregateError.prototype.toString = function () {
        var indent = Array(level * 4 + 1).join(" ");
        var ret = "\n" + indent + "AggregateError of:" + "\n";
        level++;
        indent = Array(level * 4 + 1).join(" ");

        for (var i = 0; i < this.length; ++i) {
          var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
          var lines = str.split("\n");

          for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
          }

          str = lines.join("\n");
          ret += str + "\n";
        }

        level--;
        return ret;
      };

      function OperationalError(message) {
        if (!(this instanceof OperationalError)) return new OperationalError(message);
        notEnumerableProp(this, "name", "OperationalError");
        notEnumerableProp(this, "message", message);
        this.cause = message;
        this["isOperational"] = true;

        if (message instanceof Error) {
          notEnumerableProp(this, "message", message.message);
          notEnumerableProp(this, "stack", message.stack);
        } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }

      inherits(OperationalError, Error);
      var errorTypes = Error["__BluebirdErrorTypes__"];

      if (!errorTypes) {
        errorTypes = Objectfreeze({
          CancellationError: CancellationError,
          TimeoutError: TimeoutError,
          OperationalError: OperationalError,
          RejectionError: OperationalError,
          AggregateError: AggregateError
        });
        es5.defineProperty(Error, "__BluebirdErrorTypes__", {
          value: errorTypes,
          writable: false,
          enumerable: false,
          configurable: false
        });
      }

      module.exports = {
        Error: Error,
        TypeError: _TypeError,
        RangeError: _RangeError,
        CancellationError: errorTypes.CancellationError,
        OperationalError: errorTypes.OperationalError,
        TimeoutError: errorTypes.TimeoutError,
        AggregateError: errorTypes.AggregateError,
        Warning: Warning
      };
    }, {
      "./es5": 13,
      "./util": 36
    }],
    13: [function (_dereq_, module, exports) {
      var isES5 = function () {
        "use strict";

        return this === undefined;
      }();

      if (isES5) {
        module.exports = {
          freeze: Object.freeze,
          defineProperty: Object.defineProperty,
          getDescriptor: Object.getOwnPropertyDescriptor,
          keys: Object.keys,
          names: Object.getOwnPropertyNames,
          getPrototypeOf: Object.getPrototypeOf,
          isArray: Array.isArray,
          isES5: isES5,
          propertyIsWritable: function (obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
          }
        };
      } else {
        var has = {}.hasOwnProperty;
        var str = {}.toString;
        var proto = {}.constructor.prototype;

        var ObjectKeys = function (o) {
          var ret = [];

          for (var key in o) {
            if (has.call(o, key)) {
              ret.push(key);
            }
          }

          return ret;
        };

        var ObjectGetDescriptor = function (o, key) {
          return {
            value: o[key]
          };
        };

        var ObjectDefineProperty = function (o, key, desc) {
          o[key] = desc.value;
          return o;
        };

        var ObjectFreeze = function (obj) {
          return obj;
        };

        var ObjectGetPrototypeOf = function (obj) {
          try {
            return Object(obj).constructor.prototype;
          } catch (e) {
            return proto;
          }
        };

        var ArrayIsArray = function (obj) {
          try {
            return str.call(obj) === "[object Array]";
          } catch (e) {
            return false;
          }
        };

        module.exports = {
          isArray: ArrayIsArray,
          keys: ObjectKeys,
          names: ObjectKeys,
          defineProperty: ObjectDefineProperty,
          getDescriptor: ObjectGetDescriptor,
          freeze: ObjectFreeze,
          getPrototypeOf: ObjectGetPrototypeOf,
          isES5: isES5,
          propertyIsWritable: function () {
            return true;
          }
        };
      }
    }, {}],
    14: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL) {
        var PromiseMap = Promise.map;

        Promise.prototype.filter = function (fn, options) {
          return PromiseMap(this, fn, options, INTERNAL);
        };

        Promise.filter = function (promises, fn, options) {
          return PromiseMap(promises, fn, options, INTERNAL);
        };
      };
    }, {}],
    15: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, tryConvertToPromise, NEXT_FILTER) {
        var util = _dereq_("./util");

        var CancellationError = Promise.CancellationError;
        var errorObj = util.errorObj;

        var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

        function PassThroughHandlerContext(promise, type, handler) {
          this.promise = promise;
          this.type = type;
          this.handler = handler;
          this.called = false;
          this.cancelPromise = null;
        }

        PassThroughHandlerContext.prototype.isFinallyHandler = function () {
          return this.type === 0;
        };

        function FinallyHandlerCancelReaction(finallyHandler) {
          this.finallyHandler = finallyHandler;
        }

        FinallyHandlerCancelReaction.prototype._resultCancelled = function () {
          checkCancel(this.finallyHandler);
        };

        function checkCancel(ctx, reason) {
          if (ctx.cancelPromise != null) {
            if (arguments.length > 1) {
              ctx.cancelPromise._reject(reason);
            } else {
              ctx.cancelPromise._cancel();
            }

            ctx.cancelPromise = null;
            return true;
          }

          return false;
        }

        function succeed() {
          return finallyHandler.call(this, this.promise._target()._settledValue());
        }

        function fail(reason) {
          if (checkCancel(this, reason)) return;
          errorObj.e = reason;
          return errorObj;
        }

        function finallyHandler(reasonOrValue) {
          var promise = this.promise;
          var handler = this.handler;

          if (!this.called) {
            this.called = true;
            var ret = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);

            if (ret === NEXT_FILTER) {
              return ret;
            } else if (ret !== undefined) {
              promise._setReturnedNonUndefined();

              var maybePromise = tryConvertToPromise(ret, promise);

              if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                  if (maybePromise._isCancelled()) {
                    var reason = new CancellationError("late cancellation observer");

                    promise._attachExtraTrace(reason);

                    errorObj.e = reason;
                    return errorObj;
                  } else if (maybePromise.isPending()) {
                    maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
                  }
                }

                return maybePromise._then(succeed, fail, undefined, this, undefined);
              }
            }
          }

          if (promise.isRejected()) {
            checkCancel(this);
            errorObj.e = reasonOrValue;
            return errorObj;
          } else {
            checkCancel(this);
            return reasonOrValue;
          }
        }

        Promise.prototype._passThrough = function (handler, type, success, fail) {
          if (typeof handler !== "function") return this.then();
          return this._then(success, fail, undefined, new PassThroughHandlerContext(this, type, handler), undefined);
        };

        Promise.prototype.lastly = Promise.prototype["finally"] = function (handler) {
          return this._passThrough(handler, 0, finallyHandler, finallyHandler);
        };

        Promise.prototype.tap = function (handler) {
          return this._passThrough(handler, 1, finallyHandler);
        };

        Promise.prototype.tapCatch = function (handlerOrPredicate) {
          var len = arguments.length;

          if (len === 1) {
            return this._passThrough(handlerOrPredicate, 1, undefined, finallyHandler);
          } else {
            var catchInstances = new Array(len - 1),
                j = 0,
                i;

            for (i = 0; i < len - 1; ++i) {
              var item = arguments[i];

              if (util.isObject(item)) {
                catchInstances[j++] = item;
              } else {
                return Promise.reject(new TypeError("tapCatch statement predicate: " + "expecting an object but got " + util.classString(item)));
              }
            }

            catchInstances.length = j;
            var handler = arguments[i];
            return this._passThrough(catchFilter(catchInstances, handler, this), 1, undefined, finallyHandler);
          }
        };

        return PassThroughHandlerContext;
      };
    }, {
      "./catch_filter": 7,
      "./util": 36
    }],
    16: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
        var errors = _dereq_("./errors");

        var TypeError = errors.TypeError;

        var util = _dereq_("./util");

        var errorObj = util.errorObj;
        var tryCatch = util.tryCatch;
        var yieldHandlers = [];

        function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
          for (var i = 0; i < yieldHandlers.length; ++i) {
            traceParent._pushContext();

            var result = tryCatch(yieldHandlers[i])(value);

            traceParent._popContext();

            if (result === errorObj) {
              traceParent._pushContext();

              var ret = Promise.reject(errorObj.e);

              traceParent._popContext();

              return ret;
            }

            var maybePromise = tryConvertToPromise(result, traceParent);
            if (maybePromise instanceof Promise) return maybePromise;
          }

          return null;
        }

        function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
          if (debug.cancellation()) {
            var internal = new Promise(INTERNAL);

            var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);

            this._promise = internal.lastly(function () {
              return _finallyPromise;
            });

            internal._captureStackTrace();

            internal._setOnCancel(this);
          } else {
            var promise = this._promise = new Promise(INTERNAL);

            promise._captureStackTrace();
          }

          this._stack = stack;
          this._generatorFunction = generatorFunction;
          this._receiver = receiver;
          this._generator = undefined;
          this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
          this._yieldedPromise = null;
          this._cancellationPhase = false;
        }

        util.inherits(PromiseSpawn, Proxyable);

        PromiseSpawn.prototype._isResolved = function () {
          return this._promise === null;
        };

        PromiseSpawn.prototype._cleanup = function () {
          this._promise = this._generator = null;

          if (debug.cancellation() && this._finallyPromise !== null) {
            this._finallyPromise._fulfill();

            this._finallyPromise = null;
          }
        };

        PromiseSpawn.prototype._promiseCancelled = function () {
          if (this._isResolved()) return;
          var implementsReturn = typeof this._generator["return"] !== "undefined";
          var result;

          if (!implementsReturn) {
            var reason = new Promise.CancellationError("generator .return() sentinel");
            Promise.coroutine.returnSentinel = reason;

            this._promise._attachExtraTrace(reason);

            this._promise._pushContext();

            result = tryCatch(this._generator["throw"]).call(this._generator, reason);

            this._promise._popContext();
          } else {
            this._promise._pushContext();

            result = tryCatch(this._generator["return"]).call(this._generator, undefined);

            this._promise._popContext();
          }

          this._cancellationPhase = true;
          this._yieldedPromise = null;

          this._continue(result);
        };

        PromiseSpawn.prototype._promiseFulfilled = function (value) {
          this._yieldedPromise = null;

          this._promise._pushContext();

          var result = tryCatch(this._generator.next).call(this._generator, value);

          this._promise._popContext();

          this._continue(result);
        };

        PromiseSpawn.prototype._promiseRejected = function (reason) {
          this._yieldedPromise = null;

          this._promise._attachExtraTrace(reason);

          this._promise._pushContext();

          var result = tryCatch(this._generator["throw"]).call(this._generator, reason);

          this._promise._popContext();

          this._continue(result);
        };

        PromiseSpawn.prototype._resultCancelled = function () {
          if (this._yieldedPromise instanceof Promise) {
            var promise = this._yieldedPromise;
            this._yieldedPromise = null;
            promise.cancel();
          }
        };

        PromiseSpawn.prototype.promise = function () {
          return this._promise;
        };

        PromiseSpawn.prototype._run = function () {
          this._generator = this._generatorFunction.call(this._receiver);
          this._receiver = this._generatorFunction = undefined;

          this._promiseFulfilled(undefined);
        };

        PromiseSpawn.prototype._continue = function (result) {
          var promise = this._promise;

          if (result === errorObj) {
            this._cleanup();

            if (this._cancellationPhase) {
              return promise.cancel();
            } else {
              return promise._rejectCallback(result.e, false);
            }
          }

          var value = result.value;

          if (result.done === true) {
            this._cleanup();

            if (this._cancellationPhase) {
              return promise.cancel();
            } else {
              return promise._resolveCallback(value);
            }
          } else {
            var maybePromise = tryConvertToPromise(value, this._promise);

            if (!(maybePromise instanceof Promise)) {
              maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers, this._promise);

              if (maybePromise === null) {
                this._promiseRejected(new TypeError("A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", String(value)) + "From coroutine:\u000a" + this._stack.split("\n").slice(1, -7).join("\n")));

                return;
              }
            }

            maybePromise = maybePromise._target();
            var bitField = maybePromise._bitField;
            ;

            if ((bitField & 50397184) === 0) {
              this._yieldedPromise = maybePromise;

              maybePromise._proxy(this, null);
            } else if ((bitField & 33554432) !== 0) {
              Promise._async.invoke(this._promiseFulfilled, this, maybePromise._value());
            } else if ((bitField & 16777216) !== 0) {
              Promise._async.invoke(this._promiseRejected, this, maybePromise._reason());
            } else {
              this._promiseCancelled();
            }
          }
        };

        Promise.coroutine = function (generatorFunction, options) {
          if (typeof generatorFunction !== "function") {
            throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          var yieldHandler = Object(options).yieldHandler;
          var PromiseSpawn$ = PromiseSpawn;
          var stack = new Error().stack;
          return function () {
            var generator = generatorFunction.apply(this, arguments);
            var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler, stack);
            var ret = spawn.promise();
            spawn._generator = generator;

            spawn._promiseFulfilled(undefined);

            return ret;
          };
        };

        Promise.coroutine.addYieldHandler = function (fn) {
          if (typeof fn !== "function") {
            throw new TypeError("expecting a function but got " + util.classString(fn));
          }

          yieldHandlers.push(fn);
        };

        Promise.spawn = function (generatorFunction) {
          debug.deprecated("Promise.spawn()", "Promise.coroutine()");

          if (typeof generatorFunction !== "function") {
            return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          var spawn = new PromiseSpawn(generatorFunction, this);
          var ret = spawn.promise();

          spawn._run(Promise.spawn);

          return ret;
        };
      };
    }, {
      "./errors": 12,
      "./util": 36
    }],
    17: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain) {
        var util = _dereq_("./util");

        var canEvaluate = util.canEvaluate;
        var tryCatch = util.tryCatch;
        var errorObj = util.errorObj;
        var reject;

        if (false) { var i, promiseSetters, thenCallbacks, holderClasses, generateHolderClass, promiseSetter, thenCallback; }

        Promise.join = function () {
          var last = arguments.length - 1;
          var fn;

          if (last > 0 && typeof arguments[last] === "function") {
            fn = arguments[last];

            if (false) { var domain, bitField, maybePromise, i, callbacks, holder, HolderClass, ret; }
          }

          var args = [].slice.call(arguments);
          ;
          if (fn) args.pop();
          var ret = new PromiseArray(args).promise();
          return fn !== undefined ? ret.spread(fn) : ret;
        };
      };
    }, {
      "./util": 36
    }],
    18: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
        var getDomain = Promise._getDomain;

        var util = _dereq_("./util");

        var tryCatch = util.tryCatch;
        var errorObj = util.errorObj;
        var async = Promise._async;

        function MappingPromiseArray(promises, fn, limit, _filter) {
          this.constructor$(promises);

          this._promise._captureStackTrace();

          var domain = getDomain();
          this._callback = domain === null ? fn : util.domainBind(domain, fn);
          this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
          this._limit = limit;
          this._inFlight = 0;
          this._queue = [];
          async.invoke(this._asyncInit, this, undefined);
        }

        util.inherits(MappingPromiseArray, PromiseArray);

        MappingPromiseArray.prototype._asyncInit = function () {
          this._init$(undefined, -2);
        };

        MappingPromiseArray.prototype._init = function () {};

        MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
          var values = this._values;
          var length = this.length();
          var preservedValues = this._preservedValues;
          var limit = this._limit;

          if (index < 0) {
            index = index * -1 - 1;
            values[index] = value;

            if (limit >= 1) {
              this._inFlight--;

              this._drainQueue();

              if (this._isResolved()) return true;
            }
          } else {
            if (limit >= 1 && this._inFlight >= limit) {
              values[index] = value;

              this._queue.push(index);

              return false;
            }

            if (preservedValues !== null) preservedValues[index] = value;
            var promise = this._promise;
            var callback = this._callback;

            var receiver = promise._boundValue();

            promise._pushContext();

            var ret = tryCatch(callback).call(receiver, value, index, length);

            var promiseCreated = promise._popContext();

            debug.checkForgottenReturns(ret, promiseCreated, preservedValues !== null ? "Promise.filter" : "Promise.map", promise);

            if (ret === errorObj) {
              this._reject(ret.e);

              return true;
            }

            var maybePromise = tryConvertToPromise(ret, this._promise);

            if (maybePromise instanceof Promise) {
              maybePromise = maybePromise._target();
              var bitField = maybePromise._bitField;
              ;

              if ((bitField & 50397184) === 0) {
                if (limit >= 1) this._inFlight++;
                values[index] = maybePromise;

                maybePromise._proxy(this, (index + 1) * -1);

                return false;
              } else if ((bitField & 33554432) !== 0) {
                ret = maybePromise._value();
              } else if ((bitField & 16777216) !== 0) {
                this._reject(maybePromise._reason());

                return true;
              } else {
                this._cancel();

                return true;
              }
            }

            values[index] = ret;
          }

          var totalResolved = ++this._totalResolved;

          if (totalResolved >= length) {
            if (preservedValues !== null) {
              this._filter(values, preservedValues);
            } else {
              this._resolve(values);
            }

            return true;
          }

          return false;
        };

        MappingPromiseArray.prototype._drainQueue = function () {
          var queue = this._queue;
          var limit = this._limit;
          var values = this._values;

          while (queue.length > 0 && this._inFlight < limit) {
            if (this._isResolved()) return;
            var index = queue.pop();

            this._promiseFulfilled(values[index], index);
          }
        };

        MappingPromiseArray.prototype._filter = function (booleans, values) {
          var len = values.length;
          var ret = new Array(len);
          var j = 0;

          for (var i = 0; i < len; ++i) {
            if (booleans[i]) ret[j++] = values[i];
          }

          ret.length = j;

          this._resolve(ret);
        };

        MappingPromiseArray.prototype.preservedValues = function () {
          return this._preservedValues;
        };

        function map(promises, fn, options, _filter) {
          if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
          }

          var limit = 0;

          if (options !== undefined) {
            if (typeof options === "object" && options !== null) {
              if (typeof options.concurrency !== "number") {
                return Promise.reject(new TypeError("'concurrency' must be a number but it is " + util.classString(options.concurrency)));
              }

              limit = options.concurrency;
            } else {
              return Promise.reject(new TypeError("options argument must be an object but it is " + util.classString(options)));
            }
          }

          limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
          return new MappingPromiseArray(promises, fn, limit, _filter).promise();
        }

        Promise.prototype.map = function (fn, options) {
          return map(this, fn, options, null);
        };

        Promise.map = function (promises, fn, options, _filter) {
          return map(promises, fn, options, _filter);
        };
      };
    }, {
      "./util": 36
    }],
    19: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
        var util = _dereq_("./util");

        var tryCatch = util.tryCatch;

        Promise.method = function (fn) {
          if (typeof fn !== "function") {
            throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
          }

          return function () {
            var ret = new Promise(INTERNAL);

            ret._captureStackTrace();

            ret._pushContext();

            var value = tryCatch(fn).apply(this, arguments);

            var promiseCreated = ret._popContext();

            debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret);

            ret._resolveFromSyncValue(value);

            return ret;
          };
        };

        Promise.attempt = Promise["try"] = function (fn) {
          if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
          }

          var ret = new Promise(INTERNAL);

          ret._captureStackTrace();

          ret._pushContext();

          var value;

          if (arguments.length > 1) {
            debug.deprecated("calling Promise.try with more than 1 argument");
            var arg = arguments[1];
            var ctx = arguments[2];
            value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
          } else {
            value = tryCatch(fn)();
          }

          var promiseCreated = ret._popContext();

          debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret);

          ret._resolveFromSyncValue(value);

          return ret;
        };

        Promise.prototype._resolveFromSyncValue = function (value) {
          if (value === util.errorObj) {
            this._rejectCallback(value.e, false);
          } else {
            this._resolveCallback(value, true);
          }
        };
      };
    }, {
      "./util": 36
    }],
    20: [function (_dereq_, module, exports) {
      "use strict";

      var util = _dereq_("./util");

      var maybeWrapAsError = util.maybeWrapAsError;

      var errors = _dereq_("./errors");

      var OperationalError = errors.OperationalError;

      var es5 = _dereq_("./es5");

      function isUntypedError(obj) {
        return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
      }

      var rErrorKey = /^(?:name|message|stack|cause)$/;

      function wrapAsOperationalError(obj) {
        var ret;

        if (isUntypedError(obj)) {
          ret = new OperationalError(obj);
          ret.name = obj.name;
          ret.message = obj.message;
          ret.stack = obj.stack;
          var keys = es5.keys(obj);

          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];

            if (!rErrorKey.test(key)) {
              ret[key] = obj[key];
            }
          }

          return ret;
        }

        util.markAsOriginatingFromRejection(obj);
        return obj;
      }

      function nodebackForPromise(promise, multiArgs) {
        return function (err, value) {
          if (promise === null) return;

          if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));

            promise._attachExtraTrace(wrapped);

            promise._reject(wrapped);
          } else if (!multiArgs) {
            promise._fulfill(value);
          } else {
            var args = [].slice.call(arguments, 1);
            ;

            promise._fulfill(args);
          }

          promise = null;
        };
      }

      module.exports = nodebackForPromise;
    }, {
      "./errors": 12,
      "./es5": 13,
      "./util": 36
    }],
    21: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise) {
        var util = _dereq_("./util");

        var async = Promise._async;
        var tryCatch = util.tryCatch;
        var errorObj = util.errorObj;

        function spreadAdapter(val, nodeback) {
          var promise = this;
          if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
          var ret = tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));

          if (ret === errorObj) {
            async.throwLater(ret.e);
          }
        }

        function successAdapter(val, nodeback) {
          var promise = this;

          var receiver = promise._boundValue();

          var ret = val === undefined ? tryCatch(nodeback).call(receiver, null) : tryCatch(nodeback).call(receiver, null, val);

          if (ret === errorObj) {
            async.throwLater(ret.e);
          }
        }

        function errorAdapter(reason, nodeback) {
          var promise = this;

          if (!reason) {
            var newReason = new Error(reason + "");
            newReason.cause = reason;
            reason = newReason;
          }

          var ret = tryCatch(nodeback).call(promise._boundValue(), reason);

          if (ret === errorObj) {
            async.throwLater(ret.e);
          }
        }

        Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback, options) {
          if (typeof nodeback == "function") {
            var adapter = successAdapter;

            if (options !== undefined && Object(options).spread) {
              adapter = spreadAdapter;
            }

            this._then(adapter, errorAdapter, undefined, this, nodeback);
          }

          return this;
        };
      };
    }, {
      "./util": 36
    }],
    22: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function () {
        var makeSelfResolutionError = function () {
          return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
        };

        var reflectHandler = function () {
          return new Promise.PromiseInspection(this._target());
        };

        var apiRejection = function (msg) {
          return Promise.reject(new TypeError(msg));
        };

        function Proxyable() {}

        var UNDEFINED_BINDING = {};

        var util = _dereq_("./util");

        var getDomain;

        if (util.isNode) {
          getDomain = function () {
            var ret = process.domain;
            if (ret === undefined) ret = null;
            return ret;
          };
        } else {
          getDomain = function () {
            return null;
          };
        }

        util.notEnumerableProp(Promise, "_getDomain", getDomain);

        var es5 = _dereq_("./es5");

        var Async = _dereq_("./async");

        var async = new Async();
        es5.defineProperty(Promise, "_async", {
          value: async
        });

        var errors = _dereq_("./errors");

        var TypeError = Promise.TypeError = errors.TypeError;
        Promise.RangeError = errors.RangeError;
        var CancellationError = Promise.CancellationError = errors.CancellationError;
        Promise.TimeoutError = errors.TimeoutError;
        Promise.OperationalError = errors.OperationalError;
        Promise.RejectionError = errors.OperationalError;
        Promise.AggregateError = errors.AggregateError;

        var INTERNAL = function () {};

        var APPLY = {};
        var NEXT_FILTER = {};

        var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);

        var PromiseArray = _dereq_("./promise_array")(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable);

        var Context = _dereq_("./context")(Promise);
        /*jshint unused:false*/


        var createContext = Context.create;

        var debug = _dereq_("./debuggability")(Promise, Context);

        var CapturedTrace = debug.CapturedTrace;

        var PassThroughHandlerContext = _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);

        var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

        var nodebackForPromise = _dereq_("./nodeback");

        var errorObj = util.errorObj;
        var tryCatch = util.tryCatch;

        function check(self, executor) {
          if (self == null || self.constructor !== Promise) {
            throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          if (typeof executor !== "function") {
            throw new TypeError("expecting a function but got " + util.classString(executor));
          }
        }

        function Promise(executor) {
          if (executor !== INTERNAL) {
            check(this, executor);
          }

          this._bitField = 0;
          this._fulfillmentHandler0 = undefined;
          this._rejectionHandler0 = undefined;
          this._promise0 = undefined;
          this._receiver0 = undefined;

          this._resolveFromExecutor(executor);

          this._promiseCreated();

          this._fireEvent("promiseCreated", this);
        }

        Promise.prototype.toString = function () {
          return "[object Promise]";
        };

        Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
          var len = arguments.length;

          if (len > 1) {
            var catchInstances = new Array(len - 1),
                j = 0,
                i;

            for (i = 0; i < len - 1; ++i) {
              var item = arguments[i];

              if (util.isObject(item)) {
                catchInstances[j++] = item;
              } else {
                return apiRejection("Catch statement predicate: " + "expecting an object but got " + util.classString(item));
              }
            }

            catchInstances.length = j;
            fn = arguments[i];
            return this.then(undefined, catchFilter(catchInstances, fn, this));
          }

          return this.then(undefined, fn);
        };

        Promise.prototype.reflect = function () {
          return this._then(reflectHandler, reflectHandler, undefined, this, undefined);
        };

        Promise.prototype.then = function (didFulfill, didReject) {
          if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
            var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);

            if (arguments.length > 1) {
              msg += ", " + util.classString(didReject);
            }

            this._warn(msg);
          }

          return this._then(didFulfill, didReject, undefined, undefined, undefined);
        };

        Promise.prototype.done = function (didFulfill, didReject) {
          var promise = this._then(didFulfill, didReject, undefined, undefined, undefined);

          promise._setIsFinal();
        };

        Promise.prototype.spread = function (fn) {
          if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
          }

          return this.all()._then(fn, undefined, undefined, APPLY, undefined);
        };

        Promise.prototype.toJSON = function () {
          var ret = {
            isFulfilled: false,
            isRejected: false,
            fulfillmentValue: undefined,
            rejectionReason: undefined
          };

          if (this.isFulfilled()) {
            ret.fulfillmentValue = this.value();
            ret.isFulfilled = true;
          } else if (this.isRejected()) {
            ret.rejectionReason = this.reason();
            ret.isRejected = true;
          }

          return ret;
        };

        Promise.prototype.all = function () {
          if (arguments.length > 0) {
            this._warn(".all() was passed arguments but it does not take any");
          }

          return new PromiseArray(this).promise();
        };

        Promise.prototype.error = function (fn) {
          return this.caught(util.originatesFromRejection, fn);
        };

        Promise.getNewLibraryCopy = module.exports;

        Promise.is = function (val) {
          return val instanceof Promise;
        };

        Promise.fromNode = Promise.fromCallback = function (fn) {
          var ret = new Promise(INTERNAL);

          ret._captureStackTrace();

          var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
          var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));

          if (result === errorObj) {
            ret._rejectCallback(result.e, true);
          }

          if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
          return ret;
        };

        Promise.all = function (promises) {
          return new PromiseArray(promises).promise();
        };

        Promise.cast = function (obj) {
          var ret = tryConvertToPromise(obj);

          if (!(ret instanceof Promise)) {
            ret = new Promise(INTERNAL);

            ret._captureStackTrace();

            ret._setFulfilled();

            ret._rejectionHandler0 = obj;
          }

          return ret;
        };

        Promise.resolve = Promise.fulfilled = Promise.cast;

        Promise.reject = Promise.rejected = function (reason) {
          var ret = new Promise(INTERNAL);

          ret._captureStackTrace();

          ret._rejectCallback(reason, true);

          return ret;
        };

        Promise.setScheduler = function (fn) {
          if (typeof fn !== "function") {
            throw new TypeError("expecting a function but got " + util.classString(fn));
          }

          return async.setScheduler(fn);
        };

        Promise.prototype._then = function (didFulfill, didReject, _, receiver, internalData) {
          var haveInternalData = internalData !== undefined;
          var promise = haveInternalData ? internalData : new Promise(INTERNAL);

          var target = this._target();

          var bitField = target._bitField;

          if (!haveInternalData) {
            promise._propagateFrom(this, 3);

            promise._captureStackTrace();

            if (receiver === undefined && (this._bitField & 2097152) !== 0) {
              if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
              } else {
                receiver = target === this ? undefined : this._boundTo;
              }
            }

            this._fireEvent("promiseChained", this, promise);
          }

          var domain = getDomain();

          if (!((bitField & 50397184) === 0)) {
            var handler,
                value,
                settler = target._settlePromiseCtx;

            if ((bitField & 33554432) !== 0) {
              value = target._rejectionHandler0;
              handler = didFulfill;
            } else if ((bitField & 16777216) !== 0) {
              value = target._fulfillmentHandler0;
              handler = didReject;

              target._unsetRejectionIsUnhandled();
            } else {
              settler = target._settlePromiseLateCancellationObserver;
              value = new CancellationError("late cancellation observer");

              target._attachExtraTrace(value);

              handler = didReject;
            }

            async.invoke(settler, target, {
              handler: domain === null ? handler : typeof handler === "function" && util.domainBind(domain, handler),
              promise: promise,
              receiver: receiver,
              value: value
            });
          } else {
            target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
          }

          return promise;
        };

        Promise.prototype._length = function () {
          return this._bitField & 65535;
        };

        Promise.prototype._isFateSealed = function () {
          return (this._bitField & 117506048) !== 0;
        };

        Promise.prototype._isFollowing = function () {
          return (this._bitField & 67108864) === 67108864;
        };

        Promise.prototype._setLength = function (len) {
          this._bitField = this._bitField & -65536 | len & 65535;
        };

        Promise.prototype._setFulfilled = function () {
          this._bitField = this._bitField | 33554432;

          this._fireEvent("promiseFulfilled", this);
        };

        Promise.prototype._setRejected = function () {
          this._bitField = this._bitField | 16777216;

          this._fireEvent("promiseRejected", this);
        };

        Promise.prototype._setFollowing = function () {
          this._bitField = this._bitField | 67108864;

          this._fireEvent("promiseResolved", this);
        };

        Promise.prototype._setIsFinal = function () {
          this._bitField = this._bitField | 4194304;
        };

        Promise.prototype._isFinal = function () {
          return (this._bitField & 4194304) > 0;
        };

        Promise.prototype._unsetCancelled = function () {
          this._bitField = this._bitField & ~65536;
        };

        Promise.prototype._setCancelled = function () {
          this._bitField = this._bitField | 65536;

          this._fireEvent("promiseCancelled", this);
        };

        Promise.prototype._setWillBeCancelled = function () {
          this._bitField = this._bitField | 8388608;
        };

        Promise.prototype._setAsyncGuaranteed = function () {
          if (async.hasCustomScheduler()) return;
          this._bitField = this._bitField | 134217728;
        };

        Promise.prototype._receiverAt = function (index) {
          var ret = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];

          if (ret === UNDEFINED_BINDING) {
            return undefined;
          } else if (ret === undefined && this._isBound()) {
            return this._boundValue();
          }

          return ret;
        };

        Promise.prototype._promiseAt = function (index) {
          return this[index * 4 - 4 + 2];
        };

        Promise.prototype._fulfillmentHandlerAt = function (index) {
          return this[index * 4 - 4 + 0];
        };

        Promise.prototype._rejectionHandlerAt = function (index) {
          return this[index * 4 - 4 + 1];
        };

        Promise.prototype._boundValue = function () {};

        Promise.prototype._migrateCallback0 = function (follower) {
          var bitField = follower._bitField;
          var fulfill = follower._fulfillmentHandler0;
          var reject = follower._rejectionHandler0;
          var promise = follower._promise0;

          var receiver = follower._receiverAt(0);

          if (receiver === undefined) receiver = UNDEFINED_BINDING;

          this._addCallbacks(fulfill, reject, promise, receiver, null);
        };

        Promise.prototype._migrateCallbackAt = function (follower, index) {
          var fulfill = follower._fulfillmentHandlerAt(index);

          var reject = follower._rejectionHandlerAt(index);

          var promise = follower._promiseAt(index);

          var receiver = follower._receiverAt(index);

          if (receiver === undefined) receiver = UNDEFINED_BINDING;

          this._addCallbacks(fulfill, reject, promise, receiver, null);
        };

        Promise.prototype._addCallbacks = function (fulfill, reject, promise, receiver, domain) {
          var index = this._length();

          if (index >= 65535 - 4) {
            index = 0;

            this._setLength(0);
          }

          if (index === 0) {
            this._promise0 = promise;
            this._receiver0 = receiver;

            if (typeof fulfill === "function") {
              this._fulfillmentHandler0 = domain === null ? fulfill : util.domainBind(domain, fulfill);
            }

            if (typeof reject === "function") {
              this._rejectionHandler0 = domain === null ? reject : util.domainBind(domain, reject);
            }
          } else {
            var base = index * 4 - 4;
            this[base + 2] = promise;
            this[base + 3] = receiver;

            if (typeof fulfill === "function") {
              this[base + 0] = domain === null ? fulfill : util.domainBind(domain, fulfill);
            }

            if (typeof reject === "function") {
              this[base + 1] = domain === null ? reject : util.domainBind(domain, reject);
            }
          }

          this._setLength(index + 1);

          return index;
        };

        Promise.prototype._proxy = function (proxyable, arg) {
          this._addCallbacks(undefined, undefined, arg, proxyable, null);
        };

        Promise.prototype._resolveCallback = function (value, shouldBind) {
          if ((this._bitField & 117506048) !== 0) return;
          if (value === this) return this._rejectCallback(makeSelfResolutionError(), false);
          var maybePromise = tryConvertToPromise(value, this);
          if (!(maybePromise instanceof Promise)) return this._fulfill(value);
          if (shouldBind) this._propagateFrom(maybePromise, 2);

          var promise = maybePromise._target();

          if (promise === this) {
            this._reject(makeSelfResolutionError());

            return;
          }

          var bitField = promise._bitField;

          if ((bitField & 50397184) === 0) {
            var len = this._length();

            if (len > 0) promise._migrateCallback0(this);

            for (var i = 1; i < len; ++i) {
              promise._migrateCallbackAt(this, i);
            }

            this._setFollowing();

            this._setLength(0);

            this._setFollowee(promise);
          } else if ((bitField & 33554432) !== 0) {
            this._fulfill(promise._value());
          } else if ((bitField & 16777216) !== 0) {
            this._reject(promise._reason());
          } else {
            var reason = new CancellationError("late cancellation observer");

            promise._attachExtraTrace(reason);

            this._reject(reason);
          }
        };

        Promise.prototype._rejectCallback = function (reason, synchronous, ignoreNonErrorWarnings) {
          var trace = util.ensureErrorObject(reason);
          var hasStack = trace === reason;

          if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
            var message = "a promise was rejected with a non-error: " + util.classString(reason);

            this._warn(message, true);
          }

          this._attachExtraTrace(trace, synchronous ? hasStack : false);

          this._reject(reason);
        };

        Promise.prototype._resolveFromExecutor = function (executor) {
          if (executor === INTERNAL) return;
          var promise = this;

          this._captureStackTrace();

          this._pushContext();

          var synchronous = true;

          var r = this._execute(executor, function (value) {
            promise._resolveCallback(value);
          }, function (reason) {
            promise._rejectCallback(reason, synchronous);
          });

          synchronous = false;

          this._popContext();

          if (r !== undefined) {
            promise._rejectCallback(r, true);
          }
        };

        Promise.prototype._settlePromiseFromHandler = function (handler, receiver, value, promise) {
          var bitField = promise._bitField;
          if ((bitField & 65536) !== 0) return;

          promise._pushContext();

          var x;

          if (receiver === APPLY) {
            if (!value || typeof value.length !== "number") {
              x = errorObj;
              x.e = new TypeError("cannot .spread() a non-array: " + util.classString(value));
            } else {
              x = tryCatch(handler).apply(this._boundValue(), value);
            }
          } else {
            x = tryCatch(handler).call(receiver, value);
          }

          var promiseCreated = promise._popContext();

          bitField = promise._bitField;
          if ((bitField & 65536) !== 0) return;

          if (x === NEXT_FILTER) {
            promise._reject(value);
          } else if (x === errorObj) {
            promise._rejectCallback(x.e, false);
          } else {
            debug.checkForgottenReturns(x, promiseCreated, "", promise, this);

            promise._resolveCallback(x);
          }
        };

        Promise.prototype._target = function () {
          var ret = this;

          while (ret._isFollowing()) ret = ret._followee();

          return ret;
        };

        Promise.prototype._followee = function () {
          return this._rejectionHandler0;
        };

        Promise.prototype._setFollowee = function (promise) {
          this._rejectionHandler0 = promise;
        };

        Promise.prototype._settlePromise = function (promise, handler, receiver, value) {
          var isPromise = promise instanceof Promise;
          var bitField = this._bitField;
          var asyncGuaranteed = (bitField & 134217728) !== 0;

          if ((bitField & 65536) !== 0) {
            if (isPromise) promise._invokeInternalOnCancel();

            if (receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler()) {
              receiver.cancelPromise = promise;

              if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
              }
            } else if (handler === reflectHandler) {
              promise._fulfill(reflectHandler.call(receiver));
            } else if (receiver instanceof Proxyable) {
              receiver._promiseCancelled(promise);
            } else if (isPromise || promise instanceof PromiseArray) {
              promise._cancel();
            } else {
              receiver.cancel();
            }
          } else if (typeof handler === "function") {
            if (!isPromise) {
              handler.call(receiver, value, promise);
            } else {
              if (asyncGuaranteed) promise._setAsyncGuaranteed();

              this._settlePromiseFromHandler(handler, receiver, value, promise);
            }
          } else if (receiver instanceof Proxyable) {
            if (!receiver._isResolved()) {
              if ((bitField & 33554432) !== 0) {
                receiver._promiseFulfilled(value, promise);
              } else {
                receiver._promiseRejected(value, promise);
              }
            }
          } else if (isPromise) {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();

            if ((bitField & 33554432) !== 0) {
              promise._fulfill(value);
            } else {
              promise._reject(value);
            }
          }
        };

        Promise.prototype._settlePromiseLateCancellationObserver = function (ctx) {
          var handler = ctx.handler;
          var promise = ctx.promise;
          var receiver = ctx.receiver;
          var value = ctx.value;

          if (typeof handler === "function") {
            if (!(promise instanceof Promise)) {
              handler.call(receiver, value, promise);
            } else {
              this._settlePromiseFromHandler(handler, receiver, value, promise);
            }
          } else if (promise instanceof Promise) {
            promise._reject(value);
          }
        };

        Promise.prototype._settlePromiseCtx = function (ctx) {
          this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
        };

        Promise.prototype._settlePromise0 = function (handler, value, bitField) {
          var promise = this._promise0;

          var receiver = this._receiverAt(0);

          this._promise0 = undefined;
          this._receiver0 = undefined;

          this._settlePromise(promise, handler, receiver, value);
        };

        Promise.prototype._clearCallbackDataAtIndex = function (index) {
          var base = index * 4 - 4;
          this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = undefined;
        };

        Promise.prototype._fulfill = function (value) {
          var bitField = this._bitField;
          if ((bitField & 117506048) >>> 16) return;

          if (value === this) {
            var err = makeSelfResolutionError();

            this._attachExtraTrace(err);

            return this._reject(err);
          }

          this._setFulfilled();

          this._rejectionHandler0 = value;

          if ((bitField & 65535) > 0) {
            if ((bitField & 134217728) !== 0) {
              this._settlePromises();
            } else {
              async.settlePromises(this);
            }

            this._dereferenceTrace();
          }
        };

        Promise.prototype._reject = function (reason) {
          var bitField = this._bitField;
          if ((bitField & 117506048) >>> 16) return;

          this._setRejected();

          this._fulfillmentHandler0 = reason;

          if (this._isFinal()) {
            return async.fatalError(reason, util.isNode);
          }

          if ((bitField & 65535) > 0) {
            async.settlePromises(this);
          } else {
            this._ensurePossibleRejectionHandled();
          }
        };

        Promise.prototype._fulfillPromises = function (len, value) {
          for (var i = 1; i < len; i++) {
            var handler = this._fulfillmentHandlerAt(i);

            var promise = this._promiseAt(i);

            var receiver = this._receiverAt(i);

            this._clearCallbackDataAtIndex(i);

            this._settlePromise(promise, handler, receiver, value);
          }
        };

        Promise.prototype._rejectPromises = function (len, reason) {
          for (var i = 1; i < len; i++) {
            var handler = this._rejectionHandlerAt(i);

            var promise = this._promiseAt(i);

            var receiver = this._receiverAt(i);

            this._clearCallbackDataAtIndex(i);

            this._settlePromise(promise, handler, receiver, reason);
          }
        };

        Promise.prototype._settlePromises = function () {
          var bitField = this._bitField;
          var len = bitField & 65535;

          if (len > 0) {
            if ((bitField & 16842752) !== 0) {
              var reason = this._fulfillmentHandler0;

              this._settlePromise0(this._rejectionHandler0, reason, bitField);

              this._rejectPromises(len, reason);
            } else {
              var value = this._rejectionHandler0;

              this._settlePromise0(this._fulfillmentHandler0, value, bitField);

              this._fulfillPromises(len, value);
            }

            this._setLength(0);
          }

          this._clearCancellationData();
        };

        Promise.prototype._settledValue = function () {
          var bitField = this._bitField;

          if ((bitField & 33554432) !== 0) {
            return this._rejectionHandler0;
          } else if ((bitField & 16777216) !== 0) {
            return this._fulfillmentHandler0;
          }
        };

        function deferResolve(v) {
          this.promise._resolveCallback(v);
        }

        function deferReject(v) {
          this.promise._rejectCallback(v, false);
        }

        Promise.defer = Promise.pending = function () {
          debug.deprecated("Promise.defer", "new Promise");
          var promise = new Promise(INTERNAL);
          return {
            promise: promise,
            resolve: deferResolve,
            reject: deferReject
          };
        };

        util.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError);

        _dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug);

        _dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);

        _dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);

        _dereq_("./direct_resolve")(Promise);

        _dereq_("./synchronous_inspection")(Promise);

        _dereq_("./join")(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async, getDomain);

        Promise.Promise = Promise;
        Promise.version = "3.5.3";

        _dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);

        _dereq_('./call_get.js')(Promise);

        _dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);

        _dereq_('./timers.js')(Promise, INTERNAL, debug);

        _dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);

        _dereq_('./nodeify.js')(Promise);

        _dereq_('./promisify.js')(Promise, INTERNAL);

        _dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);

        _dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);

        _dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);

        _dereq_('./settle.js')(Promise, PromiseArray, debug);

        _dereq_('./some.js')(Promise, PromiseArray, apiRejection);

        _dereq_('./filter.js')(Promise, INTERNAL);

        _dereq_('./each.js')(Promise, INTERNAL);

        _dereq_('./any.js')(Promise);

        util.toFastProperties(Promise);
        util.toFastProperties(Promise.prototype);

        function fillTypes(value) {
          var p = new Promise(INTERNAL);
          p._fulfillmentHandler0 = value;
          p._rejectionHandler0 = value;
          p._promise0 = value;
          p._receiver0 = value;
        } // Complete slack tracking, opt out of field-type tracking and           
        // stabilize map                                                         


        fillTypes({
          a: 1
        });
        fillTypes({
          b: 2
        });
        fillTypes({
          c: 3
        });
        fillTypes(1);
        fillTypes(function () {});
        fillTypes(undefined);
        fillTypes(false);
        fillTypes(new Promise(INTERNAL));
        debug.setBounds(Async.firstLineError, util.lastLineError);
        return Promise;
      };
    }, {
      "./any.js": 1,
      "./async": 2,
      "./bind": 3,
      "./call_get.js": 5,
      "./cancel": 6,
      "./catch_filter": 7,
      "./context": 8,
      "./debuggability": 9,
      "./direct_resolve": 10,
      "./each.js": 11,
      "./errors": 12,
      "./es5": 13,
      "./filter.js": 14,
      "./finally": 15,
      "./generators.js": 16,
      "./join": 17,
      "./map.js": 18,
      "./method": 19,
      "./nodeback": 20,
      "./nodeify.js": 21,
      "./promise_array": 23,
      "./promisify.js": 24,
      "./props.js": 25,
      "./race.js": 27,
      "./reduce.js": 28,
      "./settle.js": 30,
      "./some.js": 31,
      "./synchronous_inspection": 32,
      "./thenables": 33,
      "./timers.js": 34,
      "./using.js": 35,
      "./util": 36
    }],
    23: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
        var util = _dereq_("./util");

        var isArray = util.isArray;

        function toResolutionValue(val) {
          switch (val) {
            case -2:
              return [];

            case -3:
              return {};

            case -6:
              return new Map();
          }
        }

        function PromiseArray(values) {
          var promise = this._promise = new Promise(INTERNAL);

          if (values instanceof Promise) {
            promise._propagateFrom(values, 3);
          }

          promise._setOnCancel(this);

          this._values = values;
          this._length = 0;
          this._totalResolved = 0;

          this._init(undefined, -2);
        }

        util.inherits(PromiseArray, Proxyable);

        PromiseArray.prototype.length = function () {
          return this._length;
        };

        PromiseArray.prototype.promise = function () {
          return this._promise;
        };

        PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
          var values = tryConvertToPromise(this._values, this._promise);

          if (values instanceof Promise) {
            values = values._target();
            var bitField = values._bitField;
            ;
            this._values = values;

            if ((bitField & 50397184) === 0) {
              this._promise._setAsyncGuaranteed();

              return values._then(init, this._reject, undefined, this, resolveValueIfEmpty);
            } else if ((bitField & 33554432) !== 0) {
              values = values._value();
            } else if ((bitField & 16777216) !== 0) {
              return this._reject(values._reason());
            } else {
              return this._cancel();
            }
          }

          values = util.asArray(values);

          if (values === null) {
            var err = apiRejection("expecting an array or an iterable object but got " + util.classString(values)).reason();

            this._promise._rejectCallback(err, false);

            return;
          }

          if (values.length === 0) {
            if (resolveValueIfEmpty === -5) {
              this._resolveEmptyArray();
            } else {
              this._resolve(toResolutionValue(resolveValueIfEmpty));
            }

            return;
          }

          this._iterate(values);
        };

        PromiseArray.prototype._iterate = function (values) {
          var len = this.getActualLength(values.length);
          this._length = len;
          this._values = this.shouldCopyValues() ? new Array(len) : this._values;
          var result = this._promise;
          var isResolved = false;
          var bitField = null;

          for (var i = 0; i < len; ++i) {
            var maybePromise = tryConvertToPromise(values[i], result);

            if (maybePromise instanceof Promise) {
              maybePromise = maybePromise._target();
              bitField = maybePromise._bitField;
            } else {
              bitField = null;
            }

            if (isResolved) {
              if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
              }
            } else if (bitField !== null) {
              if ((bitField & 50397184) === 0) {
                maybePromise._proxy(this, i);

                this._values[i] = maybePromise;
              } else if ((bitField & 33554432) !== 0) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
              } else if ((bitField & 16777216) !== 0) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
              } else {
                isResolved = this._promiseCancelled(i);
              }
            } else {
              isResolved = this._promiseFulfilled(maybePromise, i);
            }
          }

          if (!isResolved) result._setAsyncGuaranteed();
        };

        PromiseArray.prototype._isResolved = function () {
          return this._values === null;
        };

        PromiseArray.prototype._resolve = function (value) {
          this._values = null;

          this._promise._fulfill(value);
        };

        PromiseArray.prototype._cancel = function () {
          if (this._isResolved() || !this._promise._isCancellable()) return;
          this._values = null;

          this._promise._cancel();
        };

        PromiseArray.prototype._reject = function (reason) {
          this._values = null;

          this._promise._rejectCallback(reason, false);
        };

        PromiseArray.prototype._promiseFulfilled = function (value, index) {
          this._values[index] = value;
          var totalResolved = ++this._totalResolved;

          if (totalResolved >= this._length) {
            this._resolve(this._values);

            return true;
          }

          return false;
        };

        PromiseArray.prototype._promiseCancelled = function () {
          this._cancel();

          return true;
        };

        PromiseArray.prototype._promiseRejected = function (reason) {
          this._totalResolved++;

          this._reject(reason);

          return true;
        };

        PromiseArray.prototype._resultCancelled = function () {
          if (this._isResolved()) return;
          var values = this._values;

          this._cancel();

          if (values instanceof Promise) {
            values.cancel();
          } else {
            for (var i = 0; i < values.length; ++i) {
              if (values[i] instanceof Promise) {
                values[i].cancel();
              }
            }
          }
        };

        PromiseArray.prototype.shouldCopyValues = function () {
          return true;
        };

        PromiseArray.prototype.getActualLength = function (len) {
          return len;
        };

        return PromiseArray;
      };
    }, {
      "./util": 36
    }],
    24: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL) {
        var THIS = {};

        var util = _dereq_("./util");

        var nodebackForPromise = _dereq_("./nodeback");

        var withAppended = util.withAppended;
        var maybeWrapAsError = util.maybeWrapAsError;
        var canEvaluate = util.canEvaluate;

        var TypeError = _dereq_("./errors").TypeError;

        var defaultSuffix = "Async";
        var defaultPromisified = {
          __isPromisified__: true
        };
        var noCopyProps = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"];
        var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

        var defaultFilter = function (name) {
          return util.isIdentifier(name) && name.charAt(0) !== "_" && name !== "constructor";
        };

        function propsFilter(key) {
          return !noCopyPropsPattern.test(key);
        }

        function isPromisified(fn) {
          try {
            return fn.__isPromisified__ === true;
          } catch (e) {
            return false;
          }
        }

        function hasPromisified(obj, key, suffix) {
          var val = util.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified);
          return val ? isPromisified(val) : false;
        }

        function checkValid(ret, suffix, suffixRegexp) {
          for (var i = 0; i < ret.length; i += 2) {
            var key = ret[i];

            if (suffixRegexp.test(key)) {
              var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");

              for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                  throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a".replace("%s", suffix));
                }
              }
            }
          }
        }

        function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
          var keys = util.inheritedDataKeys(obj);
          var ret = [];

          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            var value = obj[key];
            var passesDefaultFilter = filter === defaultFilter ? true : defaultFilter(key, value, obj);

            if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj, key, suffix) && filter(key, value, obj, passesDefaultFilter)) {
              ret.push(key, value);
            }
          }

          checkValid(ret, suffix, suffixRegexp);
          return ret;
        }

        var escapeIdentRegex = function (str) {
          return str.replace(/([$])/, "\\$");
        };

        var makeNodePromisifiedEval;

        if (false) { var parameterCount, parameterDeclaration, argumentSequence, switchCaseArgumentOrder; }

        function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
          var defaultThis = function () {
            return this;
          }();

          var method = callback;

          if (typeof method === "string") {
            callback = fn;
          }

          function promisified() {
            var _receiver = receiver;
            if (receiver === THIS) _receiver = this;
            var promise = new Promise(INTERNAL);

            promise._captureStackTrace();

            var cb = typeof method === "string" && this !== defaultThis ? this[method] : callback;
            var fn = nodebackForPromise(promise, multiArgs);

            try {
              cb.apply(_receiver, withAppended(arguments, fn));
            } catch (e) {
              promise._rejectCallback(maybeWrapAsError(e), true, true);
            }

            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
            return promise;
          }

          util.notEnumerableProp(promisified, "__isPromisified__", true);
          return promisified;
        }

        var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;

        function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
          var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
          var methods = promisifiableMethods(obj, suffix, suffixRegexp, filter);

          for (var i = 0, len = methods.length; i < len; i += 2) {
            var key = methods[i];
            var fn = methods[i + 1];
            var promisifiedKey = key + suffix;

            if (promisifier === makeNodePromisified) {
              obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
            } else {
              var promisified = promisifier(fn, function () {
                return makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
              });
              util.notEnumerableProp(promisified, "__isPromisified__", true);
              obj[promisifiedKey] = promisified;
            }
          }

          util.toFastProperties(obj);
          return obj;
        }

        function promisify(callback, receiver, multiArgs) {
          return makeNodePromisified(callback, receiver, undefined, callback, null, multiArgs);
        }

        Promise.promisify = function (fn, options) {
          if (typeof fn !== "function") {
            throw new TypeError("expecting a function but got " + util.classString(fn));
          }

          if (isPromisified(fn)) {
            return fn;
          }

          options = Object(options);
          var receiver = options.context === undefined ? THIS : options.context;
          var multiArgs = !!options.multiArgs;
          var ret = promisify(fn, receiver, multiArgs);
          util.copyDescriptors(fn, ret, propsFilter);
          return ret;
        };

        Promise.promisifyAll = function (target, options) {
          if (typeof target !== "function" && typeof target !== "object") {
            throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          options = Object(options);
          var multiArgs = !!options.multiArgs;
          var suffix = options.suffix;
          if (typeof suffix !== "string") suffix = defaultSuffix;
          var filter = options.filter;
          if (typeof filter !== "function") filter = defaultFilter;
          var promisifier = options.promisifier;
          if (typeof promisifier !== "function") promisifier = makeNodePromisified;

          if (!util.isIdentifier(suffix)) {
            throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          var keys = util.inheritedDataKeys(target);

          for (var i = 0; i < keys.length; ++i) {
            var value = target[keys[i]];

            if (keys[i] !== "constructor" && util.isClass(value)) {
              promisifyAll(value.prototype, suffix, filter, promisifier, multiArgs);
              promisifyAll(value, suffix, filter, promisifier, multiArgs);
            }
          }

          return promisifyAll(target, suffix, filter, promisifier, multiArgs);
        };
      };
    }, {
      "./errors": 12,
      "./nodeback": 20,
      "./util": 36
    }],
    25: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, tryConvertToPromise, apiRejection) {
        var util = _dereq_("./util");

        var isObject = util.isObject;

        var es5 = _dereq_("./es5");

        var Es6Map;
        if (typeof Map === "function") Es6Map = Map;

        var mapToEntries = function () {
          var index = 0;
          var size = 0;

          function extractEntry(value, key) {
            this[index] = value;
            this[index + size] = key;
            index++;
          }

          return function mapToEntries(map) {
            size = map.size;
            index = 0;
            var ret = new Array(map.size * 2);
            map.forEach(extractEntry, ret);
            return ret;
          };
        }();

        var entriesToMap = function (entries) {
          var ret = new Es6Map();
          var length = entries.length / 2 | 0;

          for (var i = 0; i < length; ++i) {
            var key = entries[length + i];
            var value = entries[i];
            ret.set(key, value);
          }

          return ret;
        };

        function PropertiesPromiseArray(obj) {
          var isMap = false;
          var entries;

          if (Es6Map !== undefined && obj instanceof Es6Map) {
            entries = mapToEntries(obj);
            isMap = true;
          } else {
            var keys = es5.keys(obj);
            var len = keys.length;
            entries = new Array(len * 2);

            for (var i = 0; i < len; ++i) {
              var key = keys[i];
              entries[i] = obj[key];
              entries[i + len] = key;
            }
          }

          this.constructor$(entries);
          this._isMap = isMap;

          this._init$(undefined, isMap ? -6 : -3);
        }

        util.inherits(PropertiesPromiseArray, PromiseArray);

        PropertiesPromiseArray.prototype._init = function () {};

        PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
          this._values[index] = value;
          var totalResolved = ++this._totalResolved;

          if (totalResolved >= this._length) {
            var val;

            if (this._isMap) {
              val = entriesToMap(this._values);
            } else {
              val = {};
              var keyOffset = this.length();

              for (var i = 0, len = this.length(); i < len; ++i) {
                val[this._values[i + keyOffset]] = this._values[i];
              }
            }

            this._resolve(val);

            return true;
          }

          return false;
        };

        PropertiesPromiseArray.prototype.shouldCopyValues = function () {
          return false;
        };

        PropertiesPromiseArray.prototype.getActualLength = function (len) {
          return len >> 1;
        };

        function props(promises) {
          var ret;
          var castValue = tryConvertToPromise(promises);

          if (!isObject(castValue)) {
            return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          } else if (castValue instanceof Promise) {
            ret = castValue._then(Promise.props, undefined, undefined, undefined, undefined);
          } else {
            ret = new PropertiesPromiseArray(castValue).promise();
          }

          if (castValue instanceof Promise) {
            ret._propagateFrom(castValue, 2);
          }

          return ret;
        }

        Promise.prototype.props = function () {
          return props(this);
        };

        Promise.props = function (promises) {
          return props(promises);
        };
      };
    }, {
      "./es5": 13,
      "./util": 36
    }],
    26: [function (_dereq_, module, exports) {
      "use strict";

      function arrayMove(src, srcIndex, dst, dstIndex, len) {
        for (var j = 0; j < len; ++j) {
          dst[j + dstIndex] = src[j + srcIndex];
          src[j + srcIndex] = void 0;
        }
      }

      function Queue(capacity) {
        this._capacity = capacity;
        this._length = 0;
        this._front = 0;
      }

      Queue.prototype._willBeOverCapacity = function (size) {
        return this._capacity < size;
      };

      Queue.prototype._pushOne = function (arg) {
        var length = this.length();

        this._checkCapacity(length + 1);

        var i = this._front + length & this._capacity - 1;
        this[i] = arg;
        this._length = length + 1;
      };

      Queue.prototype.push = function (fn, receiver, arg) {
        var length = this.length() + 3;

        if (this._willBeOverCapacity(length)) {
          this._pushOne(fn);

          this._pushOne(receiver);

          this._pushOne(arg);

          return;
        }

        var j = this._front + length - 3;

        this._checkCapacity(length);

        var wrapMask = this._capacity - 1;
        this[j + 0 & wrapMask] = fn;
        this[j + 1 & wrapMask] = receiver;
        this[j + 2 & wrapMask] = arg;
        this._length = length;
      };

      Queue.prototype.shift = function () {
        var front = this._front,
            ret = this[front];
        this[front] = undefined;
        this._front = front + 1 & this._capacity - 1;
        this._length--;
        return ret;
      };

      Queue.prototype.length = function () {
        return this._length;
      };

      Queue.prototype._checkCapacity = function (size) {
        if (this._capacity < size) {
          this._resizeTo(this._capacity << 1);
        }
      };

      Queue.prototype._resizeTo = function (capacity) {
        var oldCapacity = this._capacity;
        this._capacity = capacity;
        var front = this._front;
        var length = this._length;
        var moveItemsCount = front + length & oldCapacity - 1;
        arrayMove(this, 0, this, oldCapacity, moveItemsCount);
      };

      module.exports = Queue;
    }, {}],
    27: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection) {
        var util = _dereq_("./util");

        var raceLater = function (promise) {
          return promise.then(function (array) {
            return race(array, promise);
          });
        };

        function race(promises, parent) {
          var maybePromise = tryConvertToPromise(promises);

          if (maybePromise instanceof Promise) {
            return raceLater(maybePromise);
          } else {
            promises = util.asArray(promises);
            if (promises === null) return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
          }

          var ret = new Promise(INTERNAL);

          if (parent !== undefined) {
            ret._propagateFrom(parent, 3);
          }

          var fulfill = ret._fulfill;
          var reject = ret._reject;

          for (var i = 0, len = promises.length; i < len; ++i) {
            var val = promises[i];

            if (val === undefined && !(i in promises)) {
              continue;
            }

            Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
          }

          return ret;
        }

        Promise.race = function (promises) {
          return race(promises, undefined);
        };

        Promise.prototype.race = function () {
          return race(this, undefined);
        };
      };
    }, {
      "./util": 36
    }],
    28: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
        var getDomain = Promise._getDomain;

        var util = _dereq_("./util");

        var tryCatch = util.tryCatch;

        function ReductionPromiseArray(promises, fn, initialValue, _each) {
          this.constructor$(promises);
          var domain = getDomain();
          this._fn = domain === null ? fn : util.domainBind(domain, fn);

          if (initialValue !== undefined) {
            initialValue = Promise.resolve(initialValue);

            initialValue._attachCancellationCallback(this);
          }

          this._initialValue = initialValue;
          this._currentCancellable = null;

          if (_each === INTERNAL) {
            this._eachValues = Array(this._length);
          } else if (_each === 0) {
            this._eachValues = null;
          } else {
            this._eachValues = undefined;
          }

          this._promise._captureStackTrace();

          this._init$(undefined, -5);
        }

        util.inherits(ReductionPromiseArray, PromiseArray);

        ReductionPromiseArray.prototype._gotAccum = function (accum) {
          if (this._eachValues !== undefined && this._eachValues !== null && accum !== INTERNAL) {
            this._eachValues.push(accum);
          }
        };

        ReductionPromiseArray.prototype._eachComplete = function (value) {
          if (this._eachValues !== null) {
            this._eachValues.push(value);
          }

          return this._eachValues;
        };

        ReductionPromiseArray.prototype._init = function () {};

        ReductionPromiseArray.prototype._resolveEmptyArray = function () {
          this._resolve(this._eachValues !== undefined ? this._eachValues : this._initialValue);
        };

        ReductionPromiseArray.prototype.shouldCopyValues = function () {
          return false;
        };

        ReductionPromiseArray.prototype._resolve = function (value) {
          this._promise._resolveCallback(value);

          this._values = null;
        };

        ReductionPromiseArray.prototype._resultCancelled = function (sender) {
          if (sender === this._initialValue) return this._cancel();
          if (this._isResolved()) return;

          this._resultCancelled$();

          if (this._currentCancellable instanceof Promise) {
            this._currentCancellable.cancel();
          }

          if (this._initialValue instanceof Promise) {
            this._initialValue.cancel();
          }
        };

        ReductionPromiseArray.prototype._iterate = function (values) {
          this._values = values;
          var value;
          var i;
          var length = values.length;

          if (this._initialValue !== undefined) {
            value = this._initialValue;
            i = 0;
          } else {
            value = Promise.resolve(values[0]);
            i = 1;
          }

          this._currentCancellable = value;

          if (!value.isRejected()) {
            for (; i < length; ++i) {
              var ctx = {
                accum: null,
                value: values[i],
                index: i,
                length: length,
                array: this
              };
              value = value._then(gotAccum, undefined, undefined, ctx, undefined);
            }
          }

          if (this._eachValues !== undefined) {
            value = value._then(this._eachComplete, undefined, undefined, this, undefined);
          }

          value._then(completed, completed, undefined, value, this);
        };

        Promise.prototype.reduce = function (fn, initialValue) {
          return reduce(this, fn, initialValue, null);
        };

        Promise.reduce = function (promises, fn, initialValue, _each) {
          return reduce(promises, fn, initialValue, _each);
        };

        function completed(valueOrReason, array) {
          if (this.isFulfilled()) {
            array._resolve(valueOrReason);
          } else {
            array._reject(valueOrReason);
          }
        }

        function reduce(promises, fn, initialValue, _each) {
          if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
          }

          var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
          return array.promise();
        }

        function gotAccum(accum) {
          this.accum = accum;

          this.array._gotAccum(accum);

          var value = tryConvertToPromise(this.value, this.array._promise);

          if (value instanceof Promise) {
            this.array._currentCancellable = value;
            return value._then(gotValue, undefined, undefined, this, undefined);
          } else {
            return gotValue.call(this, value);
          }
        }

        function gotValue(value) {
          var array = this.array;
          var promise = array._promise;
          var fn = tryCatch(array._fn);

          promise._pushContext();

          var ret;

          if (array._eachValues !== undefined) {
            ret = fn.call(promise._boundValue(), value, this.index, this.length);
          } else {
            ret = fn.call(promise._boundValue(), this.accum, value, this.index, this.length);
          }

          if (ret instanceof Promise) {
            array._currentCancellable = ret;
          }

          var promiseCreated = promise._popContext();

          debug.checkForgottenReturns(ret, promiseCreated, array._eachValues !== undefined ? "Promise.each" : "Promise.reduce", promise);
          return ret;
        }
      };
    }, {
      "./util": 36
    }],
    29: [function (_dereq_, module, exports) {
      "use strict";

      var util = _dereq_("./util");

      var schedule;

      var noAsyncScheduler = function () {
        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
      };

      var NativePromise = util.getNativePromise();

      if (util.isNode && typeof MutationObserver === "undefined") {
        var GlobalSetImmediate = global.setImmediate;
        var ProcessNextTick = process.nextTick;
        schedule = util.isRecentNode ? function (fn) {
          GlobalSetImmediate.call(global, fn);
        } : function (fn) {
          ProcessNextTick.call(process, fn);
        };
      } else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
        var nativePromise = NativePromise.resolve();

        schedule = function (fn) {
          nativePromise.then(fn);
        };
      } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova))) {
        schedule = function () {
          var div = document.createElement("div");
          var opts = {
            attributes: true
          };
          var toggleScheduled = false;
          var div2 = document.createElement("div");
          var o2 = new MutationObserver(function () {
            div.classList.toggle("foo");
            toggleScheduled = false;
          });
          o2.observe(div2, opts);

          var scheduleToggle = function () {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
          };

          return function schedule(fn) {
            var o = new MutationObserver(function () {
              o.disconnect();
              fn();
            });
            o.observe(div, opts);
            scheduleToggle();
          };
        }();
      } else if (typeof setImmediate !== "undefined") {
        schedule = function (fn) {
          setImmediate(fn);
        };
      } else if (typeof setTimeout !== "undefined") {
        schedule = function (fn) {
          setTimeout(fn, 0);
        };
      } else {
        schedule = noAsyncScheduler;
      }

      module.exports = schedule;
    }, {
      "./util": 36
    }],
    30: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, debug) {
        var PromiseInspection = Promise.PromiseInspection;

        var util = _dereq_("./util");

        function SettledPromiseArray(values) {
          this.constructor$(values);
        }

        util.inherits(SettledPromiseArray, PromiseArray);

        SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
          this._values[index] = inspection;
          var totalResolved = ++this._totalResolved;

          if (totalResolved >= this._length) {
            this._resolve(this._values);

            return true;
          }

          return false;
        };

        SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
          var ret = new PromiseInspection();
          ret._bitField = 33554432;
          ret._settledValueField = value;
          return this._promiseResolved(index, ret);
        };

        SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
          var ret = new PromiseInspection();
          ret._bitField = 16777216;
          ret._settledValueField = reason;
          return this._promiseResolved(index, ret);
        };

        Promise.settle = function (promises) {
          debug.deprecated(".settle()", ".reflect()");
          return new SettledPromiseArray(promises).promise();
        };

        Promise.prototype.settle = function () {
          return Promise.settle(this);
        };
      };
    }, {
      "./util": 36
    }],
    31: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, apiRejection) {
        var util = _dereq_("./util");

        var RangeError = _dereq_("./errors").RangeError;

        var AggregateError = _dereq_("./errors").AggregateError;

        var isArray = util.isArray;
        var CANCELLATION = {};

        function SomePromiseArray(values) {
          this.constructor$(values);
          this._howMany = 0;
          this._unwrap = false;
          this._initialized = false;
        }

        util.inherits(SomePromiseArray, PromiseArray);

        SomePromiseArray.prototype._init = function () {
          if (!this._initialized) {
            return;
          }

          if (this._howMany === 0) {
            this._resolve([]);

            return;
          }

          this._init$(undefined, -5);

          var isArrayResolved = isArray(this._values);

          if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
            this._reject(this._getRangeError(this.length()));
          }
        };

        SomePromiseArray.prototype.init = function () {
          this._initialized = true;

          this._init();
        };

        SomePromiseArray.prototype.setUnwrap = function () {
          this._unwrap = true;
        };

        SomePromiseArray.prototype.howMany = function () {
          return this._howMany;
        };

        SomePromiseArray.prototype.setHowMany = function (count) {
          this._howMany = count;
        };

        SomePromiseArray.prototype._promiseFulfilled = function (value) {
          this._addFulfilled(value);

          if (this._fulfilled() === this.howMany()) {
            this._values.length = this.howMany();

            if (this.howMany() === 1 && this._unwrap) {
              this._resolve(this._values[0]);
            } else {
              this._resolve(this._values);
            }

            return true;
          }

          return false;
        };

        SomePromiseArray.prototype._promiseRejected = function (reason) {
          this._addRejected(reason);

          return this._checkOutcome();
        };

        SomePromiseArray.prototype._promiseCancelled = function () {
          if (this._values instanceof Promise || this._values == null) {
            return this._cancel();
          }

          this._addRejected(CANCELLATION);

          return this._checkOutcome();
        };

        SomePromiseArray.prototype._checkOutcome = function () {
          if (this.howMany() > this._canPossiblyFulfill()) {
            var e = new AggregateError();

            for (var i = this.length(); i < this._values.length; ++i) {
              if (this._values[i] !== CANCELLATION) {
                e.push(this._values[i]);
              }
            }

            if (e.length > 0) {
              this._reject(e);
            } else {
              this._cancel();
            }

            return true;
          }

          return false;
        };

        SomePromiseArray.prototype._fulfilled = function () {
          return this._totalResolved;
        };

        SomePromiseArray.prototype._rejected = function () {
          return this._values.length - this.length();
        };

        SomePromiseArray.prototype._addRejected = function (reason) {
          this._values.push(reason);
        };

        SomePromiseArray.prototype._addFulfilled = function (value) {
          this._values[this._totalResolved++] = value;
        };

        SomePromiseArray.prototype._canPossiblyFulfill = function () {
          return this.length() - this._rejected();
        };

        SomePromiseArray.prototype._getRangeError = function (count) {
          var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
          return new RangeError(message);
        };

        SomePromiseArray.prototype._resolveEmptyArray = function () {
          this._reject(this._getRangeError(0));
        };

        function some(promises, howMany) {
          if ((howMany | 0) !== howMany || howMany < 0) {
            return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          var ret = new SomePromiseArray(promises);
          var promise = ret.promise();
          ret.setHowMany(howMany);
          ret.init();
          return promise;
        }

        Promise.some = function (promises, howMany) {
          return some(promises, howMany);
        };

        Promise.prototype.some = function (howMany) {
          return some(this, howMany);
        };

        Promise._SomePromiseArray = SomePromiseArray;
      };
    }, {
      "./errors": 12,
      "./util": 36
    }],
    32: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise) {
        function PromiseInspection(promise) {
          if (promise !== undefined) {
            promise = promise._target();
            this._bitField = promise._bitField;
            this._settledValueField = promise._isFateSealed() ? promise._settledValue() : undefined;
          } else {
            this._bitField = 0;
            this._settledValueField = undefined;
          }
        }

        PromiseInspection.prototype._settledValue = function () {
          return this._settledValueField;
        };

        var value = PromiseInspection.prototype.value = function () {
          if (!this.isFulfilled()) {
            throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          return this._settledValue();
        };

        var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function () {
          if (!this.isRejected()) {
            throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
          }

          return this._settledValue();
        };

        var isFulfilled = PromiseInspection.prototype.isFulfilled = function () {
          return (this._bitField & 33554432) !== 0;
        };

        var isRejected = PromiseInspection.prototype.isRejected = function () {
          return (this._bitField & 16777216) !== 0;
        };

        var isPending = PromiseInspection.prototype.isPending = function () {
          return (this._bitField & 50397184) === 0;
        };

        var isResolved = PromiseInspection.prototype.isResolved = function () {
          return (this._bitField & 50331648) !== 0;
        };

        PromiseInspection.prototype.isCancelled = function () {
          return (this._bitField & 8454144) !== 0;
        };

        Promise.prototype.__isCancelled = function () {
          return (this._bitField & 65536) === 65536;
        };

        Promise.prototype._isCancelled = function () {
          return this._target().__isCancelled();
        };

        Promise.prototype.isCancelled = function () {
          return (this._target()._bitField & 8454144) !== 0;
        };

        Promise.prototype.isPending = function () {
          return isPending.call(this._target());
        };

        Promise.prototype.isRejected = function () {
          return isRejected.call(this._target());
        };

        Promise.prototype.isFulfilled = function () {
          return isFulfilled.call(this._target());
        };

        Promise.prototype.isResolved = function () {
          return isResolved.call(this._target());
        };

        Promise.prototype.value = function () {
          return value.call(this._target());
        };

        Promise.prototype.reason = function () {
          var target = this._target();

          target._unsetRejectionIsUnhandled();

          return reason.call(target);
        };

        Promise.prototype._value = function () {
          return this._settledValue();
        };

        Promise.prototype._reason = function () {
          this._unsetRejectionIsUnhandled();

          return this._settledValue();
        };

        Promise.PromiseInspection = PromiseInspection;
      };
    }, {}],
    33: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL) {
        var util = _dereq_("./util");

        var errorObj = util.errorObj;
        var isObject = util.isObject;

        function tryConvertToPromise(obj, context) {
          if (isObject(obj)) {
            if (obj instanceof Promise) return obj;
            var then = getThen(obj);

            if (then === errorObj) {
              if (context) context._pushContext();
              var ret = Promise.reject(then.e);
              if (context) context._popContext();
              return ret;
            } else if (typeof then === "function") {
              if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);

                obj._then(ret._fulfill, ret._reject, undefined, ret, null);

                return ret;
              }

              return doThenable(obj, then, context);
            }
          }

          return obj;
        }

        function doGetThen(obj) {
          return obj.then;
        }

        function getThen(obj) {
          try {
            return doGetThen(obj);
          } catch (e) {
            errorObj.e = e;
            return errorObj;
          }
        }

        var hasProp = {}.hasOwnProperty;

        function isAnyBluebirdPromise(obj) {
          try {
            return hasProp.call(obj, "_promise0");
          } catch (e) {
            return false;
          }
        }

        function doThenable(x, then, context) {
          var promise = new Promise(INTERNAL);
          var ret = promise;
          if (context) context._pushContext();

          promise._captureStackTrace();

          if (context) context._popContext();
          var synchronous = true;
          var result = util.tryCatch(then).call(x, resolve, reject);
          synchronous = false;

          if (promise && result === errorObj) {
            promise._rejectCallback(result.e, true, true);

            promise = null;
          }

          function resolve(value) {
            if (!promise) return;

            promise._resolveCallback(value);

            promise = null;
          }

          function reject(reason) {
            if (!promise) return;

            promise._rejectCallback(reason, synchronous, true);

            promise = null;
          }

          return ret;
        }

        return tryConvertToPromise;
      };
    }, {
      "./util": 36
    }],
    34: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL, debug) {
        var util = _dereq_("./util");

        var TimeoutError = Promise.TimeoutError;

        function HandleWrapper(handle) {
          this.handle = handle;
        }

        HandleWrapper.prototype._resultCancelled = function () {
          clearTimeout(this.handle);
        };

        var afterValue = function (value) {
          return delay(+this).thenReturn(value);
        };

        var delay = Promise.delay = function (ms, value) {
          var ret;
          var handle;

          if (value !== undefined) {
            ret = Promise.resolve(value)._then(afterValue, null, null, ms, undefined);

            if (debug.cancellation() && value instanceof Promise) {
              ret._setOnCancel(value);
            }
          } else {
            ret = new Promise(INTERNAL);
            handle = setTimeout(function () {
              ret._fulfill();
            }, +ms);

            if (debug.cancellation()) {
              ret._setOnCancel(new HandleWrapper(handle));
            }

            ret._captureStackTrace();
          }

          ret._setAsyncGuaranteed();

          return ret;
        };

        Promise.prototype.delay = function (ms) {
          return delay(ms, this);
        };

        var afterTimeout = function (promise, message, parent) {
          var err;

          if (typeof message !== "string") {
            if (message instanceof Error) {
              err = message;
            } else {
              err = new TimeoutError("operation timed out");
            }
          } else {
            err = new TimeoutError(message);
          }

          util.markAsOriginatingFromRejection(err);

          promise._attachExtraTrace(err);

          promise._reject(err);

          if (parent != null) {
            parent.cancel();
          }
        };

        function successClear(value) {
          clearTimeout(this.handle);
          return value;
        }

        function failureClear(reason) {
          clearTimeout(this.handle);
          throw reason;
        }

        Promise.prototype.timeout = function (ms, message) {
          ms = +ms;
          var ret, parent;
          var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
            if (ret.isPending()) {
              afterTimeout(ret, message, parent);
            }
          }, ms));

          if (debug.cancellation()) {
            parent = this.then();
            ret = parent._then(successClear, failureClear, undefined, handleWrapper, undefined);

            ret._setOnCancel(handleWrapper);
          } else {
            ret = this._then(successClear, failureClear, undefined, handleWrapper, undefined);
          }

          return ret;
        };
      };
    }, {
      "./util": 36
    }],
    35: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
        var util = _dereq_("./util");

        var TypeError = _dereq_("./errors").TypeError;

        var inherits = _dereq_("./util").inherits;

        var errorObj = util.errorObj;
        var tryCatch = util.tryCatch;
        var NULL = {};

        function thrower(e) {
          setTimeout(function () {
            throw e;
          }, 0);
        }

        function castPreservingDisposable(thenable) {
          var maybePromise = tryConvertToPromise(thenable);

          if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
          }

          return maybePromise;
        }

        function dispose(resources, inspection) {
          var i = 0;
          var len = resources.length;
          var ret = new Promise(INTERNAL);

          function iterator() {
            if (i >= len) return ret._fulfill();
            var maybePromise = castPreservingDisposable(resources[i++]);

            if (maybePromise instanceof Promise && maybePromise._isDisposable()) {
              try {
                maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise);
              } catch (e) {
                return thrower(e);
              }

              if (maybePromise instanceof Promise) {
                return maybePromise._then(iterator, thrower, null, null, null);
              }
            }

            iterator();
          }

          iterator();
          return ret;
        }

        function Disposer(data, promise, context) {
          this._data = data;
          this._promise = promise;
          this._context = context;
        }

        Disposer.prototype.data = function () {
          return this._data;
        };

        Disposer.prototype.promise = function () {
          return this._promise;
        };

        Disposer.prototype.resource = function () {
          if (this.promise().isFulfilled()) {
            return this.promise().value();
          }

          return NULL;
        };

        Disposer.prototype.tryDispose = function (inspection) {
          var resource = this.resource();
          var context = this._context;
          if (context !== undefined) context._pushContext();
          var ret = resource !== NULL ? this.doDispose(resource, inspection) : null;
          if (context !== undefined) context._popContext();

          this._promise._unsetDisposable();

          this._data = null;
          return ret;
        };

        Disposer.isDisposer = function (d) {
          return d != null && typeof d.resource === "function" && typeof d.tryDispose === "function";
        };

        function FunctionDisposer(fn, promise, context) {
          this.constructor$(fn, promise, context);
        }

        inherits(FunctionDisposer, Disposer);

        FunctionDisposer.prototype.doDispose = function (resource, inspection) {
          var fn = this.data();
          return fn.call(resource, resource, inspection);
        };

        function maybeUnwrapDisposer(value) {
          if (Disposer.isDisposer(value)) {
            this.resources[this.index]._setDisposable(value);

            return value.promise();
          }

          return value;
        }

        function ResourceList(length) {
          this.length = length;
          this.promise = null;
          this[length - 1] = null;
        }

        ResourceList.prototype._resultCancelled = function () {
          var len = this.length;

          for (var i = 0; i < len; ++i) {
            var item = this[i];

            if (item instanceof Promise) {
              item.cancel();
            }
          }
        };

        Promise.using = function () {
          var len = arguments.length;
          if (len < 2) return apiRejection("you must pass at least 2 arguments to Promise.using");
          var fn = arguments[len - 1];

          if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
          }

          var input;
          var spreadArgs = true;

          if (len === 2 && Array.isArray(arguments[0])) {
            input = arguments[0];
            len = input.length;
            spreadArgs = false;
          } else {
            input = arguments;
            len--;
          }

          var resources = new ResourceList(len);

          for (var i = 0; i < len; ++i) {
            var resource = input[i];

            if (Disposer.isDisposer(resource)) {
              var disposer = resource;
              resource = resource.promise();

              resource._setDisposable(disposer);
            } else {
              var maybePromise = tryConvertToPromise(resource);

              if (maybePromise instanceof Promise) {
                resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
                  resources: resources,
                  index: i
                }, undefined);
              }
            }

            resources[i] = resource;
          }

          var reflectedResources = new Array(resources.length);

          for (var i = 0; i < reflectedResources.length; ++i) {
            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
          }

          var resultPromise = Promise.all(reflectedResources).then(function (inspections) {
            for (var i = 0; i < inspections.length; ++i) {
              var inspection = inspections[i];

              if (inspection.isRejected()) {
                errorObj.e = inspection.error();
                return errorObj;
              } else if (!inspection.isFulfilled()) {
                resultPromise.cancel();
                return;
              }

              inspections[i] = inspection.value();
            }

            promise._pushContext();

            fn = tryCatch(fn);
            var ret = spreadArgs ? fn.apply(undefined, inspections) : fn(inspections);

            var promiseCreated = promise._popContext();

            debug.checkForgottenReturns(ret, promiseCreated, "Promise.using", promise);
            return ret;
          });
          var promise = resultPromise.lastly(function () {
            var inspection = new Promise.PromiseInspection(resultPromise);
            return dispose(resources, inspection);
          });
          resources.promise = promise;

          promise._setOnCancel(resources);

          return promise;
        };

        Promise.prototype._setDisposable = function (disposer) {
          this._bitField = this._bitField | 131072;
          this._disposer = disposer;
        };

        Promise.prototype._isDisposable = function () {
          return (this._bitField & 131072) > 0;
        };

        Promise.prototype._getDisposer = function () {
          return this._disposer;
        };

        Promise.prototype._unsetDisposable = function () {
          this._bitField = this._bitField & ~131072;
          this._disposer = undefined;
        };

        Promise.prototype.disposer = function (fn) {
          if (typeof fn === "function") {
            return new FunctionDisposer(fn, this, createContext());
          }

          throw new TypeError();
        };
      };
    }, {
      "./errors": 12,
      "./util": 36
    }],
    36: [function (_dereq_, module, exports) {
      "use strict";

      var es5 = _dereq_("./es5");

      var canEvaluate = typeof navigator == "undefined";
      var errorObj = {
        e: {}
      };
      var tryCatchTarget;
      var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this !== undefined ? this : null;

      function tryCatcher() {
        try {
          var target = tryCatchTarget;
          tryCatchTarget = null;
          return target.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      }

      function tryCatch(fn) {
        tryCatchTarget = fn;
        return tryCatcher;
      }

      var inherits = function (Child, Parent) {
        var hasProp = {}.hasOwnProperty;

        function T() {
          this.constructor = Child;
          this.constructor$ = Parent;

          for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
              this[propertyName + "$"] = Parent.prototype[propertyName];
            }
          }
        }

        T.prototype = Parent.prototype;
        Child.prototype = new T();
        return Child.prototype;
      };

      function isPrimitive(val) {
        return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
      }

      function isObject(value) {
        return typeof value === "function" || typeof value === "object" && value !== null;
      }

      function maybeWrapAsError(maybeError) {
        if (!isPrimitive(maybeError)) return maybeError;
        return new Error(safeToString(maybeError));
      }

      function withAppended(target, appendee) {
        var len = target.length;
        var ret = new Array(len + 1);
        var i;

        for (i = 0; i < len; ++i) {
          ret[i] = target[i];
        }

        ret[i] = appendee;
        return ret;
      }

      function getDataPropertyOrDefault(obj, key, defaultValue) {
        if (es5.isES5) {
          var desc = Object.getOwnPropertyDescriptor(obj, key);

          if (desc != null) {
            return desc.get == null && desc.set == null ? desc.value : defaultValue;
          }
        } else {
          return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
        }
      }

      function notEnumerableProp(obj, name, value) {
        if (isPrimitive(obj)) return obj;
        var descriptor = {
          value: value,
          configurable: true,
          enumerable: false,
          writable: true
        };
        es5.defineProperty(obj, name, descriptor);
        return obj;
      }

      function thrower(r) {
        throw r;
      }

      var inheritedDataKeys = function () {
        var excludedPrototypes = [Array.prototype, Object.prototype, Function.prototype];

        var isExcludedProto = function (val) {
          for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
              return true;
            }
          }

          return false;
        };

        if (es5.isES5) {
          var getKeys = Object.getOwnPropertyNames;
          return function (obj) {
            var ret = [];
            var visitedKeys = Object.create(null);

            while (obj != null && !isExcludedProto(obj)) {
              var keys;

              try {
                keys = getKeys(obj);
              } catch (e) {
                return ret;
              }

              for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (visitedKeys[key]) continue;
                visitedKeys[key] = true;
                var desc = Object.getOwnPropertyDescriptor(obj, key);

                if (desc != null && desc.get == null && desc.set == null) {
                  ret.push(key);
                }
              }

              obj = es5.getPrototypeOf(obj);
            }

            return ret;
          };
        } else {
          var hasProp = {}.hasOwnProperty;
          return function (obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];
            /*jshint forin:false */

            enumeration: for (var key in obj) {
              if (hasProp.call(obj, key)) {
                ret.push(key);
              } else {
                for (var i = 0; i < excludedPrototypes.length; ++i) {
                  if (hasProp.call(excludedPrototypes[i], key)) {
                    continue enumeration;
                  }
                }

                ret.push(key);
              }
            }

            return ret;
          };
        }
      }();

      var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;

      function isClass(fn) {
        try {
          if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);
            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
              return true;
            }
          }

          return false;
        } catch (e) {
          return false;
        }
      }

      function toFastProperties(obj) {
        /*jshint -W027,-W055,-W031*/
        function FakeConstructor() {}

        FakeConstructor.prototype = obj;
        var receiver = new FakeConstructor();

        function ic() {
          return typeof receiver.foo;
        }

        ic();
        ic();
        return obj;
        eval(obj);
      }

      var rident = /^[a-z$_][a-z$_0-9]*$/i;

      function isIdentifier(str) {
        return rident.test(str);
      }

      function filledRange(count, prefix, suffix) {
        var ret = new Array(count);

        for (var i = 0; i < count; ++i) {
          ret[i] = prefix + i + suffix;
        }

        return ret;
      }

      function safeToString(obj) {
        try {
          return obj + "";
        } catch (e) {
          return "[no string representation]";
        }
      }

      function isError(obj) {
        return obj instanceof Error || obj !== null && typeof obj === "object" && typeof obj.message === "string" && typeof obj.name === "string";
      }

      function markAsOriginatingFromRejection(e) {
        try {
          notEnumerableProp(e, "isOperational", true);
        } catch (ignore) {}
      }

      function originatesFromRejection(e) {
        if (e == null) return false;
        return e instanceof Error["__BluebirdErrorTypes__"].OperationalError || e["isOperational"] === true;
      }

      function canAttachTrace(obj) {
        return isError(obj) && es5.propertyIsWritable(obj, "stack");
      }

      var ensureErrorObject = function () {
        if (!("stack" in new Error())) {
          return function (value) {
            if (canAttachTrace(value)) return value;

            try {
              throw new Error(safeToString(value));
            } catch (err) {
              return err;
            }
          };
        } else {
          return function (value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
          };
        }
      }();

      function classString(obj) {
        return {}.toString.call(obj);
      }

      function copyDescriptors(from, to, filter) {
        var keys = es5.names(from);

        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];

          if (filter(key)) {
            try {
              es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
          }
        }
      }

      var asArray = function (v) {
        if (es5.isArray(v)) {
          return v;
        }

        return null;
      };

      if (typeof Symbol !== "undefined" && Symbol.iterator) {
        var ArrayFrom = typeof Array.from === "function" ? function (v) {
          return Array.from(v);
        } : function (v) {
          var ret = [];
          var it = v[Symbol.iterator]();
          var itResult;

          while (!(itResult = it.next()).done) {
            ret.push(itResult.value);
          }

          return ret;
        };

        asArray = function (v) {
          if (es5.isArray(v)) {
            return v;
          } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
          }

          return null;
        };
      }

      var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";
      var hasEnvVariables = typeof process !== "undefined" && typeof process.env !== "undefined";

      function env(key) {
        return hasEnvVariables ? process.env[key] : undefined;
      }

      function getNativePromise() {
        if (typeof Promise === "function") {
          try {
            var promise = new Promise(function () {});

            if ({}.toString.call(promise) === "[object Promise]") {
              return Promise;
            }
          } catch (e) {}
        }
      }

      function domainBind(self, cb) {
        return self.bind(cb);
      }

      var ret = {
        isClass: isClass,
        isIdentifier: isIdentifier,
        inheritedDataKeys: inheritedDataKeys,
        getDataPropertyOrDefault: getDataPropertyOrDefault,
        thrower: thrower,
        isArray: es5.isArray,
        asArray: asArray,
        notEnumerableProp: notEnumerableProp,
        isPrimitive: isPrimitive,
        isObject: isObject,
        isError: isError,
        canEvaluate: canEvaluate,
        errorObj: errorObj,
        tryCatch: tryCatch,
        inherits: inherits,
        withAppended: withAppended,
        maybeWrapAsError: maybeWrapAsError,
        toFastProperties: toFastProperties,
        filledRange: filledRange,
        toString: safeToString,
        canAttachTrace: canAttachTrace,
        ensureErrorObject: ensureErrorObject,
        originatesFromRejection: originatesFromRejection,
        markAsOriginatingFromRejection: markAsOriginatingFromRejection,
        classString: classString,
        copyDescriptors: copyDescriptors,
        hasDevTools: typeof chrome !== "undefined" && chrome && typeof chrome.loadTimes === "function",
        isNode: isNode,
        hasEnvVariables: hasEnvVariables,
        env: env,
        global: globalObject,
        getNativePromise: getNativePromise,
        domainBind: domainBind
      };

      ret.isRecentNode = ret.isNode && function () {
        var version = process.versions.node.split(".").map(Number);
        return version[0] === 0 && version[1] > 10 || version[0] > 0;
      }();

      if (ret.isNode) ret.toFastProperties(process);

      try {
        throw new Error();
      } catch (e) {
        ret.lastLineError = e;
      }

      module.exports = ret;
    }, {
      "./es5": 13
    }]
  }, {}, [4])(4);
});
;

if (typeof window !== 'undefined' && window !== null) {
  window.P = window.Promise;
} else if (typeof self !== 'undefined' && self !== null) {
  self.P = self.Promise;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/** Built-in value references. */


var Symbol = root.Symbol;
module.exports = Symbol;

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = arrayLikeKeys;

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");
/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/** `Object#toString` result references. */


var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/** `Object#toString` result references. */


var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }

  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = baseKeysIn;

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */


function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");
/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
module.exports = baseSetToString;

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

module.exports = baseTimes;

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/** Used to detect overreaching core-js shims. */


var coreJsData = root['__core-js_shared__'];
module.exports = coreJsData;

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

module.exports = getRawTag;

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */


function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }

  var type = typeof index;

  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }

  return false;
}

module.exports = isIterateeCall;

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");
/** Used to detect methods masquerading as native. */


var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}

module.exports = isPrototype;

/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];

  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }

  return result;
}

module.exports = nativeKeysIn;

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");
/** Detect free variable `exports`. */


var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeMax = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */

function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");
/** Detect free variable `self`. */


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var setToString = shortOut(baseSetToString);
module.exports = setToString;

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeNow = Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

module.exports = toSource;

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

module.exports = constant;

/***/ }),

/***/ "./node_modules/lodash/defaults.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/defaults.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */

var defaults = baseRest(function (object, sources) {
  object = Object(object);
  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : undefined;

  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }

  while (++index < length) {
    var source = sources[index];
    var props = keysIn(source);
    var propsIndex = -1;
    var propsLength = props.length;

    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];

      if (value === undefined || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
        object[key] = source[key];
      }
    }
  }

  return object;
});
module.exports = defaults;

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
module.exports = isArguments;

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");
/** Detect free variable `exports`. */


var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */

var isBuffer = nativeIsBuffer || stubFalse;
module.exports = isBuffer;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");
/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
module.exports = isTypedArray;

/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */


function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),

/***/ "./node_modules/node-vibrant/lib/pipeline/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-vibrant/lib/pipeline/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var quantizer_mmcq_1 = __webpack_require__(/*! @vibrant/quantizer-mmcq */ "./node_modules/@vibrant/quantizer-mmcq/lib/index.js");

var generator_default_1 = __webpack_require__(/*! @vibrant/generator-default */ "./node_modules/@vibrant/generator-default/lib/index.js");

var pipeline_1 = __webpack_require__(/*! @vibrant/core/lib/pipeline */ "./node_modules/@vibrant/core/lib/pipeline/index.js");

var pipeline = new pipeline_1.BasicPipeline().filter.register('default', function (r, g, b, a) {
  return a >= 125 && !(r > 250 && g > 250 && b > 250);
}).quantizer.register('mmcq', quantizer_mmcq_1.default).generator.register('default', generator_default_1.default);
exports.default = pipeline;

/***/ }),

/***/ "./node_modules/node-vibrant/lib/pipeline/index.worker.js":
/*!****************************************************************!*\
  !*** ./node_modules/node-vibrant/lib/pipeline/index.worker.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var host_1 = __webpack_require__(/*! @vibrant/core/lib/pipeline/worker/host */ "./node_modules/@vibrant/core/lib/pipeline/worker/host.js");
var _1 = __webpack_require__(/*! ./ */ "./node_modules/node-vibrant/lib/pipeline/index.js");
host_1.default(self, _1.default);
//# sourceMappingURL=index.worker.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function (handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function (event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function (handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function (handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function (handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function (handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js"); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ })

/******/ });
//# sourceMappingURL=b912491651e0970fedc3.worker.js.map