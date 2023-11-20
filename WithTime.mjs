import EventEmitter from "./EventEmitter.mjs";

export default class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        const startTime = Date.now();
        this.emit("begin");
        const data = await asyncFunc(...args);
        const totalTime = Date.now() - startTime;
        this.emit("end", data, totalTime);
    }
}
