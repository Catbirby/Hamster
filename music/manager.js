const managers = new Map();
const consts = require('../index.js');

class Manager {
    constructor(gid) {
        managers.set(gid, this);
        this.song = undefined;
        this.songQueue = [];
        this.guild = gid;
    }

    getSong() {
        return this.song;
    }

    skip(){

    }

    queue(url){
        this.songQueue.push(url);
    }

    static get(gid) {
        if (!managers.has(gid)) {
            managers.set(gid, new Manager());
        }
        return managers.get(gid);
    }
}

module.exports = Manager;