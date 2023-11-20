const EventEmitter = require("./EventEmitter.js");

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        const startTime = Date.now();
        this.emit("begin");
        const data = await asyncFunc(...args);
        const totalTime = Date.now() - startTime;
        this.emit("end", data, totalTime);
    }
}

module.exports = WithTime;
