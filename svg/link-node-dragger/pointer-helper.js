function pointerHelper(ev, handlers) {
  const start = handlers.start || (() => void 0)
  const moveInner = handlers.moveInner || (() => void 0)
  const moveOuter = handlers.moveOuter || (() => void 0)
  const move = handlers.move || (() => void 0)
  const end = handlers.end || (() => void 0)

  let _this = this
  const startEl = ev.target

  start.call(_this, ev)
  const handleTargetTouchEvent = (ev) => {
    switch (ev.type) {
      case 'mousemove': {
        const touch = ev // .changedTouches[0]
        const touchingEl = document.elementFromPoint(touch.pageX, touch.pageY - document.documentElement.scrollTop)
        if (touchingEl === startEl) {
          moveInner.call(_this, ev)
        } else {
          moveOuter.call(_this, ev)
        }
        move.call(_this, ev)
        break;
      }
      case 'mouseup':
      case 'mouseout': {
        document.removeEventListener('mousemove', handleTargetTouchEvent)
        document.removeEventListener('mouseout', handleTargetTouchEvent)
        end.call(_this, ev)
        break;
      }
    }
  }
  document.addEventListener('mousemove', handleTargetTouchEvent)
  document.addEventListener('mouseout', handleTargetTouchEvent)
  document.addEventListener('mouseup', handleTargetTouchEvent)
}
