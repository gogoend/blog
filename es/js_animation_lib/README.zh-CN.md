# Anikyu - Animation Queue


## 介绍

anikyu 是一个简易的补间动画库，基于JavaScript，可以为一个指定对象中的数值创建连续补间动画。
当前版本暂仅支持CSS属性补间，用于补间的属性单位应为px。


## 浏览器兼容性
如果你是用的是dist文件夹中的Anikyu.js，则至少应当使用IE 9或更高版本浏览器。
Anikyu使用了一些在IE等其他较为老旧的浏览器中不兼容的特性或功能，例如ES Module、Generator以及requestAnimationFrame。如果你要在这些浏览器中使用Anikyu，可以通过script标签，引入由Webpack与Babel构建的、位于dist文件夹中的Anikyu.js，这将使得Anikyu成为一个全局变量。


## 引入到项目中

### 使用NPM
#### 从NPM安装
```shell
npm install anikyu
```

#### 在项目文件中引入
```JavaScript
import Anikyu from 'anikyu';
```

### 使用Script标签
```HTML
<script src="https://unpkg.com/anikyu/dist/anikyu.js"></script>
```


## 使用方法

```JavaScript
new Anikyu(
    el,
    animationQueue
)
```

el - 产生动画效果的对象
animationQueue - 动画队列，包含补间动画中每一个阶段配置的数组

你需要在构造函数中传入当前产生动画效果的对象以及作用到该对象的动画队列。

动画队列是一个数组，其中包含产生动画效果的对象在整个动画发生期间每个阶段的状态，补间将通过使用来自相邻两个状态的数据来创建。
动画队列中每个阶段的配置表示为如下对象：

```JavaScript
{
    props: Object,
    delay: Number,
    duration: Number,
    easeType: String,
    callback: Function
}
```

props - （必须）产生动画效果的对象在补间动画阶段结束后的属性

delay - 补间动画阶段开始前的延迟时间，默认为0

duration - 补间动画阶段持续时间，默认为2000

easeType - 补间动画阶段缓动函数，默认为'quadraticInOut'，其他可选值参见 <https://echarts.apache.org/examples/zh/editor.html?c=line-easing>

callback - 补间动画阶段结束后执行的回调函数


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, [gogoend](http://github.com/gogoend)
