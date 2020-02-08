var Anikyu =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// requestAnimationFrame
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/easing_funcs.js
const easingFuncs = {
    linear: function (k) {
        return k;
    },
    quadraticIn: function (k) {
        return k * k;
    },
    quadraticOut: function (k) {
        return k * (2 - k);
    },
    quadraticInOut: function (k) {
        if ((k *= 2) < 1) { return 0.5 * k * k; }
        return -0.5 * (--k * (k - 2) - 1);
    },
    cubicIn: function (k) {
        return k * k * k;
    },
    cubicOut: function (k) {
        return --k * k * k + 1;
    },
    cubicInOut: function (k) {
        if ((k *= 2) < 1) { return 0.5 * k * k * k; }
        return 0.5 * ((k -= 2) * k * k + 2);
    },
    quarticIn: function (k) {
        return k * k * k * k;
    },
    quarticOut: function (k) {
        return 1 - (--k * k * k * k);
    },
    quarticInOut: function (k) {
        if ((k *= 2) < 1) { return 0.5 * k * k * k * k; }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    },
    quinticIn: function (k) {
        return k * k * k * k * k;
    },
    quinticOut: function (k) {
        return --k * k * k * k * k + 1;
    },
    quinticInOut: function (k) {
        if ((k *= 2) < 1) { return 0.5 * k * k * k * k * k; }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
    sinusoidalIn: function (k) {
        return 1 - Math.cos(k * Math.PI / 2);
    },
    sinusoidalOut: function (k) {
        return Math.sin(k * Math.PI / 2);
    },
    sinusoidalInOut: function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    },
    exponentialIn: function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    exponentialOut: function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    exponentialInOut: function (k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
    circularIn: function (k) {
        return 1 - Math.sqrt(1 - k * k);
    },
    circularOut: function (k) {
        return Math.sqrt(1 - (--k * k));
    },
    circularInOut: function (k) {
        if ((k *= 2) < 1) { return -0.5 * (Math.sqrt(1 - k * k) - 1); }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
    elasticIn: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) { return 0; }
        if (k === 1) { return 1; }
        if (!a || a < 1) { a = 1; s = p / 4; }
        else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    elasticOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) { return 0; }
        if (k === 1) { return 1; }
        if (!a || a < 1) { a = 1; s = p / 4; }
        else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
        return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    },
    elasticInOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) { return 0; }
        if (k === 1) { return 1; }
        if (!a || a < 1) { a = 1; s = p / 4; }
        else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

    },

    // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
    backIn: function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    },
    backOut: function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    },
    backInOut: function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) { return 0.5 * (k * k * ((s + 1) * k - s)); }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },

    // 创建弹跳效果
    bounceIn: function (k) {
        return 1 - easingFuncs.bounceOut(1 - k);
    },
    bounceOut: function (k) {
        if (k < (1 / 2.75)) { return 7.5625 * k * k; }
        else if (k < (2 / 2.75)) { return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75; }
        else if (k < (2.5 / 2.75)) { return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375; }
        else { return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375; }
    },
    bounceInOut: function (k) {
        if (k < 0.5) { return easingFuncs.bounceIn(k * 2) * 0.5; }
        return easingFuncs.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
};
// CONCATENATED MODULE: ./src/util.js
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}


// CONCATENATED MODULE: ./src/animation.js



class animation_Animation{
    constructor(el,queue,duration = 2000, easeType = 'quadraticInOut'){
        this.el=el;
        this.queue=queue;
        this.duration=duration;
        this.easeType=easeType;

        this.i=0;

        if(!queue[0]){
            return
        }else{
            this.animationQueueHandler=this.go();
            setTimeout(()=>this.animationQueueHandler.next(),queue[0].delay)
        }

        // debugger

    }
    *go(){
        let {i,queue,executor}=this;
        while (i <= queue.length) {
            yield queue[i + 1] ? (
                executor(
                    // el, 
                    // queue[i].props, 
                    // queue[++i].props, 
                    // queue[i].duration?queue[i].duration:duration, 
                    // ease[queue[i].easeType]?queue[i].easeType:easeType,
                    this
                ),
                true
                ) 
                :
                undefined;
        }
    }
    executor(context){
        // super();
        let {el,i,queue, duration, easeType,animationQueueHandler}=context;
        let perviousStatus=queue[i].props,
            finalStatus=queue[i+1]?queue[i+1].props:undefined;
        let delay=(queue[i+1] && queue[i+1].delay)?queue[i+1].delay:undefined;
        if(!finalStatus){
            return
        }

        easeType=queue[i+1].easeType?queue[i+1].easeType:easeType;
        duration=queue[i+1].duration?queue[i+1].duration:duration;

        let startTime = new Date().getTime();

        let totalDelta={};

        for(let key in finalStatus){
            totalDelta[key]=finalStatus[key]-parseInt(el.style[key])
        }
    
        let loop = () => {
            let endTime = startTime + duration;
            let currentTime = new Date().getTime();
            let currentProgress = clamp((currentTime - startTime) / duration, 0, 1);
            // console.log(el.style.width)

            for(let key in perviousStatus){
                el.style[key] = perviousStatus[key] + totalDelta[key] * easingFuncs[easeType](currentProgress) + 'px';
            }
    
            if (currentProgress == 1) {
                // clearInterval(timer)
                cancelAnimationFrame(loop);
                //如何执行下一步？

                setTimeout(()=>{
                    if(queue[i+1].callback instanceof Function){
                        queue[i+1].callback()
                    }
                    context.i++;
                    animationQueueHandler.next();
                },delay)
                // debugger
                return
            }
            requestAnimationFrame(loop)
        }
        loop()
    }
}

Object.assign(animation_Animation,{
    getStyle: getStyle
})

/* harmony default export */ var animation = (animation_Animation);
// EXTERNAL MODULE: ./src/polyfill.js
var polyfill = __webpack_require__(0);

// CONCATENATED MODULE: ./src/anikyu.js



//判断文件是如何引入的，如果是通过模块引入则不在全局暴露Anikyu
//直接在Webpack配置中改为UMD

/* harmony default export */ var anikyu = __webpack_exports__["default"] = (animation);

/***/ })
/******/ ]);


export default Anikyu['default'];
