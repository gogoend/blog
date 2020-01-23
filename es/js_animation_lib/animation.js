import { easingFuncs as ease } from './easing_funcs.js';
import { clamp } from './util.js';

function animation(el,perviousStatus, finalStatus, duration, easeType) {
    let startTime = new Date().getTime();

    let totalDelta = {
        width: finalStatus.width - parseInt(el.style.width),
        height: finalStatus.height - parseInt(el.style.height),
    }

    let loop = () => {
        let endTime = startTime + duration;
        let currentTime = new Date().getTime();
        let currentProgress = clamp((currentTime - startTime) / duration, 0, 1);
        // console.log(el.style.width)
        el.style.width = perviousStatus.width + totalDelta.width * ease[easeType](currentProgress) + 'px';
        el.style.height = perviousStatus.height + totalDelta.height * ease[easeType](currentProgress) + 'px';

        console.log(currentProgress)

        if (currentProgress == 1) {
            // clearInterval(timer)
            cancelAnimationFrame(loop);
            return
        }
        requestAnimationFrame(loop)
    }
    loop()
}

export {animation}