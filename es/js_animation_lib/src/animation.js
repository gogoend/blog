import { easingFuncs as ease } from './easing_funcs.js';
import { clamp,getStyle } from './util.js';

class Animation{
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
                el.style[key] = perviousStatus[key] + totalDelta[key] * ease[easeType](currentProgress) + 'px';
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

Object.assign(Animation,{
    getStyle
})

export default Animation