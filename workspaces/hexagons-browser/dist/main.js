/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cellTimingFunctions.ts":
/*!************************************!*\
  !*** ./src/cellTimingFunctions.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   timingRadial: () => (/* binding */ timingRadial),\n/* harmony export */   timingRandom: () => (/* binding */ timingRandom),\n/* harmony export */   timingZero: () => (/* binding */ timingZero)\n/* harmony export */ });\n/* harmony import */ var _lib_randomThings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/randomThings */ \"./src/lib/randomThings.ts\");\n\nvar timingZero = function () { return function () { return 0; }; };\nvar timingRandom = function () { return function () { return Math.random(); }; };\nvar timingRadial = function () {\n    var originX = Math.random() * document.body.clientWidth;\n    var originY = Math.random() * document.body.clientHeight;\n    var scale = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([+1, -1]);\n    return function (item) {\n        return Math.sqrt(Math.pow((originX - item.cell.offsetTop), 2) +\n            Math.pow((originY - item.cell.offsetLeft), 2)) * scale;\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([timingZero, timingRandom, timingRadial]);\n\n\n//# sourceURL=webpack://hexagons-browser/./src/cellTimingFunctions.ts?");

/***/ }),

/***/ "./src/cellTransformationFunctions.ts":
/*!********************************************!*\
  !*** ./src/cellTransformationFunctions.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_randomThings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/randomThings */ \"./src/lib/randomThings.ts\");\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n// import { groups } from \"./hexagonsData\";\n\nvar transformMakeSingleRandomColor = function () {\n    var colorPair = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomColorPair)();\n    return function (item) {\n        item.hexagon.color = colorPair.bg;\n        item.hexagon.parts.middle.color = colorPair.fg;\n    };\n};\nvar transformIndependentRandomColors = function () { return function (item) {\n    var colorPair = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomColorPair)();\n    item.hexagon.color = colorPair.bg;\n    item.hexagon.parts.middle.color = colorPair.fg;\n}; };\nvar transformNRandomColors = function () {\n    var colorPairs = __spreadArray([], Array(1 + Math.floor(Math.random() * 6)), true).map(function () {\n        return (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomColorPair)();\n    });\n    return function (item) {\n        var colorPair = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)(colorPairs);\n        item.hexagon.color = colorPair.bg;\n        item.hexagon.parts.middle.color = colorPair.fg;\n    };\n};\nvar transformSingleRotateAll = function () {\n    var degX = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([0, 180]);\n    var degY = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([0, 180]);\n    var degZ = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([0, 60, 120, 180, 240]);\n    return function (item) {\n        item.hexagon.rX.style.transform = \"rotateX(\".concat(degX, \"deg)\");\n        item.hexagon.rY.style.transform = \"rotateY(\".concat(degY, \"deg)\");\n        item.hexagon.rZ.style.transform = \"rotateZ(\".concat(degZ, \"deg)\");\n    };\n};\nvar transformSingleRotateX = function () {\n    var degX = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([-360, -180, 0, 180]);\n    return function (item) {\n        item.hexagon.rX.style.transform = \"rotateX(\".concat(degX, \"deg)\");\n    };\n};\nvar transformSingleRotateY = function () {\n    var degY = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([-360, -180, 0, 180]);\n    return function (item) {\n        item.hexagon.rY.style.transform = \"rotateY(\".concat(degY, \"deg)\");\n    };\n};\nvar transformSingleRotateZ = function () {\n    var degZ = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([\n        0, 60, 120, 180, 240, 360, 420, 480, 540, 600, 660,\n    ]);\n    return function (item) {\n        item.hexagon.rZ.style.transform = \"rotateZ(\".concat(degZ, \"deg)\");\n    };\n};\nvar transformIndependentRotateAll = function () {\n    return function (item) {\n        var degX = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([-360, -180, 0, 180]);\n        var degY = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([-360, -180, 0, 180]);\n        var degZ = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([\n            0, 60, 120, 180, 240, 360, 420, 480, 540, 600, 660,\n        ]);\n        item.hexagon.rX.style.transform = \"rotateX(\".concat(degX, \"deg)\");\n        item.hexagon.rY.style.transform = \"rotateY(\".concat(degY, \"deg)\");\n        item.hexagon.rZ.style.transform = \"rotateZ(\".concat(degZ, \"deg)\");\n    };\n};\nvar transformIndependentMakeWonky = function () {\n    return function (item) {\n        var degX = Math.random() * 10 - 5;\n        var degY = Math.random() * 10 - 5;\n        var degZ = Math.random() * 10 - 5;\n        item.hexagon.rX.style.transform = \"rotateX(\".concat(degX, \"deg)\");\n        item.hexagon.rY.style.transform = \"rotateY(\".concat(degY, \"deg)\");\n        item.hexagon.rZ.style.transform = \"rotateZ(\".concat(degZ, \"deg)\");\n    };\n};\nvar transformSingleRandomSymbol = function () {\n    var symbol = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomSymbol)();\n    return function (item) { return (item.hexagon.parts.middle.text = symbol); };\n};\nvar transformIndependentRandomSymbols = function () { return function (item) {\n    return (item.hexagon.parts.middle.text = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomSymbol)());\n}; };\nvar transformNRandomSymbols = function () {\n    var symbols = __spreadArray([], Array(1 + Math.floor(Math.random() * 6)), true).map(function () {\n        return (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomSymbol)();\n    });\n    return function (item) {\n        item.hexagon.parts.middle.text = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)(symbols);\n    };\n};\nvar transformSymbolsFromWord = function () {\n    var word = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)([\n        \"BLÅHAJ\",\n        \"BLåHAj\",\n        \"BLAAHAJ\",\n        \"BLaAHAj\",\n        \"HEXAGON\",\n        \"HeXAgON\",\n    ]);\n    var symbols = word.split(/([A-Z][a-z]?)/g).filter(function (t) { return t !== \"\"; });\n    return function (item) {\n        return (item.hexagon.parts.middle.text = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_0__.randomElementFrom)(symbols));\n    };\n};\n// const transformBestagons: F = () => {\n//   const bestagons = groups\n//     .map((group) =>\n//       group.hexagons!.map((hexagon) => ({\n//         code: hexagon.code,\n//         color: group.color,\n//         textColor: group.textColor,\n//       }))\n//     )\n//     .flat();\n//   return (item) => {\n//     const bestagon = randomElementFrom(bestagons);\n//     item.hexagon.parts.middle.text = bestagon.code;\n//     item.hexagon.color = bestagon.color;\n//     item.hexagon.parts.middle.color = bestagon.textColor;\n//   };\n// };\nvar compound = function () {\n    var transformations = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        transformations[_i] = arguments[_i];\n    }\n    return function () {\n        var fns = transformations.map(function (t) { return t(); });\n        return function (item) {\n            fns.forEach(function (fn) { return fn(item); });\n        };\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([\n    transformMakeSingleRandomColor,\n    transformIndependentRandomColors,\n    transformNRandomColors,\n    transformSingleRotateAll,\n    transformSingleRotateAll,\n    transformSingleRotateAll,\n    transformSingleRotateX,\n    transformSingleRotateY,\n    transformSingleRotateZ,\n    transformIndependentRotateAll,\n    transformIndependentMakeWonky,\n    transformSingleRandomSymbol,\n    transformIndependentRandomSymbols,\n    transformNRandomSymbols,\n    transformSymbolsFromWord,\n    // transformBestagons,\n    compound(transformMakeSingleRandomColor, transformSingleRotateAll),\n    compound(transformSymbolsFromWord, transformIndependentMakeWonky),\n    compound(transformSymbolsFromWord, transformSingleRotateX),\n    compound(transformSymbolsFromWord, transformSingleRotateAll, transformNRandomColors),\n]);\n\n\n//# sourceURL=webpack://hexagons-browser/./src/cellTransformationFunctions.ts?");

/***/ }),

/***/ "./src/distractions.ts":
/*!*****************************!*\
  !*** ./src/distractions.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hexagon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hexagon */ \"./src/hexagon.ts\");\n/* harmony import */ var _lib_randomThings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/randomThings */ \"./src/lib/randomThings.ts\");\n/* harmony import */ var _lib_normaliseRange__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/normaliseRange */ \"./src/lib/normaliseRange.ts\");\n/* harmony import */ var _cellTimingFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cellTimingFunctions */ \"./src/cellTimingFunctions.ts\");\n/* harmony import */ var _cellTransformationFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cellTransformationFunctions */ \"./src/cellTransformationFunctions.ts\");\n\n\n\n\n\nvar check = function () {\n    var main = document.getElementById(\"hexagon-container\");\n    var cells = [];\n    var hexagonSize = \"md\";\n    var cellSize = \"md\";\n    main.classList.add(\"hexagon-grid\", \"hexagon-grid--\".concat(cellSize), \"hexagon-grid--classic\", \"hexagon-grid--pad-bottom\");\n    for (;;) {\n        var rowElement = document.createElement(\"div\");\n        rowElement.className = \"hexagon-row\";\n        main.appendChild(rowElement);\n        for (;;) {\n            var colors = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_1__.randomColorPair)();\n            var hexagon = new _hexagon__WEBPACK_IMPORTED_MODULE_0__.Hexagon(hexagonSize);\n            hexagon.color = colors.bg;\n            hexagon.parts.middle.text = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_1__.randomElementFrom)(\"HEXAGON\".split(\"\"));\n            hexagon.parts.middle.color = colors.fg;\n            var cell = document.createElement(\"div\");\n            cell.className = \"hexagon-cell\";\n            cell.appendChild(hexagon.element);\n            rowElement.appendChild(cell);\n            cells.push({ hexagon: hexagon, cell: cell });\n            if (cell.offsetLeft > screen.availWidth)\n                break;\n        }\n        if (rowElement.offsetTop > screen.availHeight)\n            break;\n    }\n    var iterate = function () {\n        var timingFunction = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_1__.randomElementFrom)(_cellTimingFunctions__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n        var transformationFunction = (0,_lib_randomThings__WEBPACK_IMPORTED_MODULE_1__.randomElementFrom)(_cellTransformationFunctions__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n        var itemsWithDelays = (0,_lib_normaliseRange__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(cells.map(function (item) { return [item, timingFunction(item)]; }), 100, 1500);\n        var _loop_1 = function (item, delay) {\n            setTimeout(function () { return transformationFunction(item); }, delay);\n        };\n        for (var _i = 0, itemsWithDelays_1 = itemsWithDelays; _i < itemsWithDelays_1.length; _i++) {\n            var _a = itemsWithDelays_1[_i], item = _a[0], delay = _a[1];\n            _loop_1(item, delay);\n        }\n    };\n    var timeout = setInterval(iterate, 6000);\n    document.addEventListener(\"keydown\", function (event) {\n        if (event.key === \"f\") {\n            if (document.fullscreenElement === null)\n                document.body.requestFullscreen();\n            else\n                document.exitFullscreen();\n        }\n        if (event.key === \"n\")\n            iterate();\n        if (event.key === \"s\" && timeout) {\n            clearTimeout(timeout);\n            timeout = undefined;\n        }\n        if (event.key === \"g\" && !timeout) {\n            timeout = setInterval(iterate, 6000);\n        }\n    });\n};\ncheck();\n\n\n//# sourceURL=webpack://hexagons-browser/./src/distractions.ts?");

/***/ }),

/***/ "./src/hexagon.ts":
/*!************************!*\
  !*** ./src/hexagon.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Hexagon: () => (/* binding */ Hexagon),\n/* harmony export */   HexagonContentPosition: () => (/* binding */ HexagonContentPosition),\n/* harmony export */   HexagonPart: () => (/* binding */ HexagonPart)\n/* harmony export */ });\nvar HexagonContentPosition = [\"top\", \"middle\", \"bottom\"];\nvar HexagonPart = /** @class */ (function () {\n    function HexagonPart(which) {\n        var _a;\n        this.element = document.createElement(\"div\");\n        this.element.setAttribute(\"class\", \"hexagon--content hexagon--content-\".concat(which));\n        var makeText = function () {\n            var span = document.createElement(\"span\");\n            var text = \"\";\n            span.innerHTML = text; // Initialize with empty HTML content\n            return { span: span, text: text };\n        };\n        this.texts = [makeText(), makeText()];\n        this.texts[0].span.style.opacity = \"1\";\n        this.texts[1].span.style.opacity = \"0\";\n        (_a = this.element).append.apply(_a, this.texts.map(function (t) { return t.span; }));\n    }\n    Object.defineProperty(HexagonPart.prototype, \"text\", {\n        get: function () {\n            var _a;\n            return (_a = this.texts[0].span.innerHTML) !== null && _a !== void 0 ? _a : \"\";\n        },\n        set: function (value) {\n            if (value === this.text)\n                return;\n            this.texts.reverse();\n            this.texts[0].span.innerHTML = value;\n            this.texts[0].span.style.opacity = \"1\"; // fade in\n            this.texts[1].span.style.opacity = \"0\"; // fade out\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(HexagonPart.prototype, \"color\", {\n        get: function () {\n            return this.element.style.color;\n        },\n        set: function (value) {\n            this.element.style.color = value !== null && value !== void 0 ? value : \"inherit\";\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return HexagonPart;\n}());\n\nvar Hexagon = /** @class */ (function () {\n    function Hexagon(_size) {\n        var parts = (this.parts = {\n            top: new HexagonPart(\"top\"),\n            middle: new HexagonPart(\"middle\"),\n            bottom: new HexagonPart(\"bottom\"),\n        });\n        var hexagon = document.createElement(\"div\");\n        hexagon.setAttribute(\"class\", \"hexagon transition-[background-color] bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 focus-visible:outline-gray-600 dark:focus-visible:outline-gray-500\");\n        hexagon.appendChild(parts.top.element);\n        hexagon.appendChild(parts.middle.element);\n        hexagon.appendChild(parts.bottom.element);\n        this.hexagon = hexagon;\n        this.rX = document.createElement(\"div\");\n        this.rX.setAttribute(\"class\", \"rx\");\n        this.rX.appendChild(hexagon);\n        this.rY = document.createElement(\"div\");\n        this.rY.setAttribute(\"class\", \"ry\");\n        this.rY.appendChild(this.rX);\n        this.rZ = document.createElement(\"div\");\n        this.rZ.setAttribute(\"class\", \"rz\");\n        this.rZ.appendChild(this.rY);\n        this.element = this.rZ;\n    }\n    Object.defineProperty(Hexagon.prototype, \"color\", {\n        get: function () {\n            return this._color;\n        },\n        set: function (value) {\n            this.hexagon.style.backgroundColor = value !== null && value !== void 0 ? value : \"inherit\";\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Hexagon;\n}());\n\n\n\n//# sourceURL=webpack://hexagons-browser/./src/hexagon.ts?");

/***/ }),

/***/ "./src/lib/normaliseRange.ts":
/*!***********************************!*\
  !*** ./src/lib/normaliseRange.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (items, outputMin, outputMax) {\n    if (items.length === 0)\n        return items;\n    var inputMin = Infinity;\n    var inputMax = -Infinity;\n    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {\n        var item = items_1[_i];\n        if (item[1] > inputMax)\n            inputMax = item[1];\n        if (item[1] < inputMin)\n            inputMin = item[1];\n    }\n    var inputRange = inputMax - inputMin;\n    var outputRange = outputMax - outputMin;\n    if (inputRange < 0.1)\n        return items;\n    var scale = outputRange / inputRange;\n    return items.map(function (item) { return [item[0], outputMin + scale * (item[1] - inputMin)]; });\n});\n\n\n//# sourceURL=webpack://hexagons-browser/./src/lib/normaliseRange.ts?");

/***/ }),

/***/ "./src/lib/randomThings.ts":
/*!*********************************!*\
  !*** ./src/lib/randomThings.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   randomColorPair: () => (/* binding */ randomColorPair),\n/* harmony export */   randomElementFrom: () => (/* binding */ randomElementFrom),\n/* harmony export */   randomSymbol: () => (/* binding */ randomSymbol)\n/* harmony export */ });\nvar randomSymbol = (function () {\n    var alphabet = \"abcdefghijklmnopqrstuvwxyzæøå\";\n    var randomLetterFrom = function (s) {\n        return s[Math.floor(Math.random() * s.length)];\n    };\n    return function () {\n        var n = Math.random();\n        if (n > 0.98)\n            return \"🪩\";\n        if (n > 0.96)\n            return \"⭐️\";\n        if (n > 0.94)\n            return \"🐝\";\n        return (randomLetterFrom(alphabet).toUpperCase() +\n            randomLetterFrom(alphabet + \"  \").trim());\n    };\n})();\nvar randomColorPair = (function () {\n    var r = function () { return Math.floor(Math.random() * 256); };\n    return function () {\n        for (;;) {\n            var fg = { r: r(), g: r(), b: r() };\n            var bg = { r: r(), g: r(), b: r() };\n            var distance = Math.sqrt(Math.pow((fg.r - bg.r), 2) * 4 + (fg.g - bg.g) * 2 + Math.pow((fg.b - bg.b), 2) * 2);\n            if (distance < 400)\n                return {\n                    fg: \"rgb(\".concat(fg.r, \", \").concat(fg.g, \", \").concat(fg.b, \")\"),\n                    bg: \"rgb(\".concat(bg.r, \", \").concat(bg.g, \", \").concat(bg.b, \")\"),\n                };\n        }\n    };\n})();\nvar randomElementFrom = function (items) {\n    return items[Math.floor(Math.random() * items.length)];\n};\n\n\n//# sourceURL=webpack://hexagons-browser/./src/lib/randomThings.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/distractions.ts");
/******/ 	
/******/ })()
;