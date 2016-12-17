const fs = require('fs');
const sysout = console.log;
const syserr = console.error;
const info = console.info;
const defaultLogFile = './latest.log';

let logFile = defaultLogFile;

const toFile = log => {
    fs.appendFile(logFile, log + '\n', () => {
    });
};
const out = log => {
    sysout(log);
    toFile(log);
};

/**
 * Sets `console.log`, `console.error` and `console.info`
 */
const hook = () => {
    toFile(logFile, ` --- NEW ${new Date()} NEW ---\n`);
    console.log = log => {
        let d = new Date();
        log = `[${d.toString()} LOG] ${log}`;
        out(log);
    };
    console.info = log => {
        let d = new Date();
        log = `[${d.toString()} INFO] ${log}`;
        info(log);
    };
    console.error = log => {
        let d = new Date();
        log = `[${d.toString()} ERROR] ${log}`;
        out(log);
    };
};

/**
 * Resets `console.log`, `console.error` and `console.info`
 */
const unhook = () => {
    console.log = sysout;
    console.error = syserr;
    console.info = info;
};

hook();

module.exports = {
    sysout: sysout, toFile: toFile, out: out, setFile: (file) => {
        "use strict";
        logFile = file | defaultLogFile;
    }, hook: hook, unhook: unhook
};