# Anikyu - Animation Queue


## Introduction

Anikyu, a simple tween animation library based on JavaScript, can create continuous tween animation for number values in one specified object.

Current version temporarily only support the tween animation of CSS property whose unit is *px*.

## Browser Compatibility

The Anikyu uses some features or functions, like ES Module, Generator and requestAnimationFrame, which are not support in Internet Explorer and some older browsers. As for this, you can use the Anikyu.js in dist folder, which is built with Webpack and Babel, and import via script tag, then Anikyu will become a global variable.


## Import to your project

### Using NPM
#### Install from NPM
```shell
npm install anikyu
```

#### Include in your files
```JavaScript
import Anikyu from 'anikyu';
```

### Using script Tag
```HTML
<script src="https://unpkg.com/anikyu/dist/anikyu.js"></script>
```


## Usage

```JavaScript
new Anikyu(
    el,
    animationQueue
)
```

el - The object to be animated.
animationQueue - An array of the configurations for every tween animation stage.

You need to pass the object to be animated and the animation queue which will take effect on the passed object.

the animationQueue is an Array which contains the statuses of the animated object at every stage during the whole animation happening.The tween will be created by using data from the two adjacent statuses.
Every status in animationQueue is described as the following Object:

```JavaScript
{
    props: Object,
    delay: Number,
    duration: Number,
    easeType: String,
    callback: Function
}
```

props - (Required) The properties of the status after the tween animation stage is finished.

delay - Delay before the tween animation stage starts. Default is *0*, which means the next animation stage will start immediately after the previous one finished.

duration - The duration of tween animation stage. Default is *2000*.

easeType - The ease function which the tween animation stage use. Default is *'quadraticInOut'*. For other possible values, you can visit <https://echarts.apache.org/examples/zh/editor.html?c=line-easing>.

callback - The Function to be called after the tween animation stage finished.


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, [gogoend](http://github.com/gogoend)
