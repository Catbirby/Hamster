const fs = require('fs');
const sysout = console.log;
function toFile(log) {
    fs.appendFile("./latest.log", log + '\n', () => {});
}
const out = log => {
    sysout(log);
    toFile(log);
};
console.log = log => {
    let d = new Date();
    log = `[${d.toString()} LOG] ${log}`;
    out(log);
};
console.info = console.log;
console.error = log => {
    let d = new Date();
    log = `[${d.toString()} ERROR] ${log}`;
    out(log);
};
