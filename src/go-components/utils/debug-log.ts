const Logger = Object.freeze({
    level: 50,
    error: (...args: any) => {
        Logger.level >= 5 && console.error(...args);
    },
    warn: (...args: any) => {
        Logger.level >= 25 && console.warn(...args);
    },
    dev:  (...args: any) => {
        Logger.level >= 50 && console.debug(...args);
    },
    log: (...args: any) => {
        Logger.level >= 60 && console.log(...args);
    },
    todo: (...args: any) => {
        Logger.level >= 75 && console.info(...args);
    }
});

export default Logger;