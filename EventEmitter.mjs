export default class EventEmitter {
    listeners = {};
    listenersOnce = {};

    addListener(eventName, fn) {
        const listenerIndex = (this.listeners[eventName] || []).findIndex((listener) => fn === listener);
        if (listenerIndex > -1) return;

        this.listeners[eventName] = Array.isArray(this.listeners[eventName])
            ? [...this.listeners[eventName], fn]
            : [fn];
    }

    on(eventName, fn) {
        this.addListener(eventName, fn);
    }

    removeListener(eventName, fn) {
        const listenersIndex = (this.listeners[eventName] || []).findIndex((listener) => fn === listener);
        if (listenersIndex > -1) this.listeners[eventName].splice(listenersIndex, 1);

        const listenersOnceIndex = (this.listenersOnce[eventName] || []).findIndex((listener) => fn === listener);
        if (listenersOnceIndex > -1) this.listenersOnce[eventName].splice(listenersOnceIndex, 1);
    }

    off(eventName, fn) {
        this.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        const listenerIndex = (this.listenersOnce[eventName] || []).findIndex((listener) => fn === listener);
        if (listenerIndex > -1) return;

        this.listenersOnce[eventName] = Array.isArray(this.listenersOnce[eventName])
            ? [...this.listenersOnce[eventName], fn]
            : [fn];
    }

    emit(eventName, ...args) {
        (this.listeners[eventName] || []).forEach((fn) => fn(...args));
        (this.listenersOnce[eventName] || []).forEach((fn) => fn(...args));
        this.listenersOnce[eventName] = [];
    }

    listenerCount(eventName) {
        return (this.listeners[eventName]?.length || 0 + this.listenersOnce[eventName]?.length || 0);
    }

    rawListeners(eventName) {
        return [
            ...(this.listeners[eventName] || []),
            ...(this.listenersOnce[eventName] || []),
        ];
    }
}
