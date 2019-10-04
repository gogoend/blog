function Draw(el){
    var _this=this;
    if(!el){
        console.error('元素无效');
        return
    }
    _this.el=el;
    _this.ctx=el.getContext('2d');


    _this.pos={
        xCur:NaN,
        yCur:NaN,
        xNew:NaN,
        yNew:NaN
    }
    Draw.prototype.init=function(){
        var w = window.innerWidth;
        var h = window.innerHeight;
        _this.el.width = w;
        _this.el.height = h;

        _this.pos.xCur=_this.el.offsetLeft;
        _this.pos.yCur=_this.el.offsetTop;
        _this.el.addEventListener('mousedown',_this.startDrawBind,false);
    }
    Draw.prototype.startDraw=function(e){
        var ctx=_this.ctx;
        _this.pos.xCur=_this.el.offsetLeft;
        _this.pos.yCur=_this.el.offsetTop;
        //开始新的路径
        ctx.beginPath();
        // ctx.moveTo(_this.pos.xCur,_this.pos.yCur)

        document.body.addEventListener('mousemove',_this.drawingBind,false);
        document.body.addEventListener('mouseup',_this.endDrawBind,false);
    }
    Draw.prototype.drawing=function(e){
        var ctx=_this.ctx;
        ctx.lineTo(e.clientX,e.clientY);
        ctx.strokeStyle="linear-gradient(#fff,#000)"
        ctx.stroke()

        console.log(e);
        
        e.clientX
        e.clientY
    }
    Draw.prototype.endDraw=function(e){
        var ctx=_this.ctx;

        document.body.removeEventListener('mousemove',_this.drawingBind,false);
        document.body.removeEventListener('mouseup',_this.endDrawBind,false);
    }

    _this.startDrawBind=_this.startDraw.bind(_this);
    _this.drawingBind=_this.drawing.bind(_this);
    _this.endDrawBind=_this.endDraw.bind(_this);
    _this.init()
}
