const fs = require('fs');
const sysout = console.log;
function toFile(log) {
    fs.appendFile("./latest.log", log);
}
const out = log => {
    sysout(log);
    toFile(log);
};
console.log = log => {
    log = `[LOG] ${log}`;
    out(log);
};
console.info = console.log;
console.error = log => {
    log = `[ERROR] ${log}`;
    out(log);
};
