let EventDoer = function (...args) {
    this.args = args
    this.listeners = {};
};

EventDoer.prototype = Object.assign({}, {
    listeners: null,
    args: null,
    getArgs() {
        return this.args
    },
    addEventListener(type, callback) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    },
    removeEventListener(type, callback) {
        if (!(type in this.listeners)) return;
        let typeHandlers = this.listeners[type];
        for (let i = 0; i < typeHandlers.length; i++) {
            if (typeHandlers[i] === callback) {
                typeHandlers.splice(i, 1);
                return;
            }
        }
    },
    fireEvent(name, detail) {
        if (!(name in this.listeners)) {
            return true;
        }
        let typeHandlers = this.listeners[name].concat();

        for (let i = 0; i < typeHandlers.length; i++) {
            typeHandlers[i].call(this, detail);
        }
    },
    getListeners(name) {
        if (name) {
            return this.listeners[name];
        }
        return this.listeners;
    }
});