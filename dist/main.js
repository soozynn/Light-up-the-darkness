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

/***/ "./src/img/platform/platform.png":
/*!***************************************!*\
  !*** ./src/img/platform/platform.png ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"platform.png?ffab39d3487de561be1a081fcfb3806d\");\n\n//# sourceURL=webpack:///./src/img/platform/platform.png?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _img_platform_platform_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img/platform/platform.png */ \"./src/img/platform/platform.png\");\n/* eslint-disable no-param-reassign */\n// eslint-disable-next-line max-classes-per-file\n\n\nconst canvas = document.querySelector(\"canvas\");\nconst ctx = canvas.getContext(\"2d\");\n\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\n\nconst gravity = 0.5;\n\nclass Player {\n\tconstructor() {\n\t\tthis.position = {\n\t\t\tx: 100,\n\t\t\ty: 100,\n\t\t};\n\n\t\tthis.velocity = {\n\t\t\tx: 0,\n\t\t\ty: 0,\n\t\t};\n\t\tthis.width = 30;\n\t\tthis.height = 30;\n\t}\n\n\tdraw() {\n\t\tctx.fillStyle = \"red\";\n\t\tctx.fillRect(this.position.x, this.position.y, this.width, this.height);\n\t}\n\n\tupdate() {\n\t\tthis.draw();\n\t\tthis.position.x += this.velocity.x;\n\t\tthis.position.y += this.velocity.y;\n\n\t\tif (this.position.y + this.height + this.velocity.y <= canvas.height) {\n\t\t\tthis.velocity.y += gravity;\n\t\t} else {\n\t\t\tthis.velocity.y = 0;\n\t\t}\n\t}\n}\n\nclass Platform {\n\tconstructor(x, y) {\n\t\tthis.position = {\n\t\t\tx,\n\t\t\ty,\n\t\t};\n\n\t\tthis.width = 200;\n\t\tthis.height = 20;\n\t}\n\n\tdraw() {\n\t\tctx.fillStyle = \"blue\";\n\t\tctx.fillRect(this.position.x, this.position.y, this.width, this.height);\n\t}\n}\n\nconst player = new Player();\nconst platforms = [new Platform(200, 100), new Platform(500, 200), new Platform(800, 300)];\n\nconst keys = {\n\tright: {\n\t\tpressed: false,\n\t},\n\tleft: {\n\t\tpressed: false,\n\t},\n};\n\nlet scrollOffSet = 0;\n\nfunction animate() {\n\trequestAnimationFrame(animate);\n\tctx.clearRect(0, 0, canvas.width, canvas.height);\n\tplayer.update();\n\tplatforms.forEach(platform => {\n\t\tplatform.draw();\n\t});\n\n\tif (keys.right.pressed && player.position.x < 400) {\n\t\tplayer.velocity.x = 5;\n\t} else if (keys.left.pressed && player.position.x > 100) {\n\t\tplayer.velocity.x = -5;\n\t} else {\n\t\tplayer.velocity.x = 0;\n\n\t\tif (keys.right.pressed) {\n\t\t\tscrollOffSet += 5;\n\n\t\t\tplatforms.forEach(platform => {\n\t\t\t\tplatform.position.x -= 5;\n\t\t\t});\n\t\t} else if (keys.left.pressed) {\n\t\t\tscrollOffSet -= 5;\n\n\t\t\tplatforms.forEach(platform => {\n\t\t\t\tplatform.position.x += 5;\n\t\t\t});\n\t\t}\n\t}\n\n\t// 지형 인식\n\tplatforms.forEach(platform => {\n\t\tif (\n\t\t\tplayer.position.y + player.height <= platform.position.y &&\n\t\t\tplayer.position.y + player.height + player.velocity.y >= platform.position.y &&\n\t\t\tplayer.position.x + player.width >= platform.position.x &&\n\t\t\tplayer.position.x <= platform.position.x + platform.width\n\t\t) {\n\t\t\tplayer.velocity.y = 0;\n\t\t}\n\t});\n\n\tif (scrollOffSet > 2000) {\n\t\tconsole.log(\"win\");\n\t}\n}\n\nanimate();\n\nwindow.addEventListener(\"keydown\", event => {\n\tevent.preventDefault();\n\n\tswitch (event.key) {\n\t\tcase \"a\":\n\t\t\tconsole.log(\"left\");\n\t\t\tkeys.left.pressed = true;\n\t\t\tbreak;\n\t\tcase \"d\":\n\t\t\tconsole.log(\"right\");\n\t\t\tkeys.right.pressed = true;\n\t\t\tbreak;\n\t\tcase \"w\":\n\t\t\tconsole.log(\"up\");\n\t\t\tplayer.velocity.y -= 10;\n\t\t\tbreak;\n\n\t\t// no default\n\t}\n});\n\nwindow.addEventListener(\"keyup\", event => {\n\tevent.preventDefault();\n\n\tswitch (event.key) {\n\t\tcase \"a\":\n\t\t\tconsole.log(\"left\");\n\t\t\tkeys.left.pressed = false;\n\t\t\tbreak;\n\t\tcase \"d\":\n\t\t\tconsole.log(\"right\");\n\t\t\tkeys.right.pressed = false;\n\t\t\tbreak;\n\t\tcase \"w\":\n\t\t\tconsole.log(\"up\");\n\t\t\tplayer.velocity.y -= 20;\n\t\t\tbreak;\n\n\t\t// no default\n\t}\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;