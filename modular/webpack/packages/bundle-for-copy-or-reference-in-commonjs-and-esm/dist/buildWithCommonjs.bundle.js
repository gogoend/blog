/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 791:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const people = [{
    name: 'Bob',
    phone: '10086',
    age: 19
}, {
    name: 'Amy',
    phone: '10001',
    age: 28
}]

let m2 = __webpack_require__(446), limitAgeMultiply10 = m2.limitAgeMultiply10
console.log(m2, limitAgeMultiply10)

let limitAge = 29
const addLimitAge = () => { limitAge++ }

module.exports = {
    ...module.exports,
    people,
    limitAge,
    addLimitAge
}


/***/ }),

/***/ 446:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let m1 = __webpack_require__(791), limitAge = m1.limitAge

console.log(m1)
console.log(limitAge)

let limitAgeMultiply10 = limitAge * 10

module.exports = {
    ...module.exports,
    limitAgeMultiply10
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
let m1 = __webpack_require__(791)
let { limitAge, people } = __webpack_require__(791)

console.log(m1)

console.log(m1.limitAge)

m1.addLimitAge()

console.log(limitAge)
})();

/******/ })()
;