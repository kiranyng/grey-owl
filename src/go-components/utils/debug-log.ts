const Logger = Object.freeze({
    level: 50,
    error: (...args) => {
        Logger.level >= 5 && console.error(...args);
    },
    warn: (...args) => {
        Logger.level >= 25 && console.warn(...args);
    },
    dev:  (...args) => {
        Logger.level >= 50 && console.debug(...args);
    },
    log: (...args) => {
        Logger.level >= 60 && console.log(...args);
    },
    todo: (...args) => {
        Logger.level >= 75 && console.info(...args);
    }
});

export default Logger;