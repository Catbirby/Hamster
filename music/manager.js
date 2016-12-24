const managers = new Map();
const consts = require('../index.js');
const ytdl = require('ytdl-core');
const uuid = require('node-uuid');

class Manager {
    constructor(gid) {
        managers.set(gid, this);
        this.uid = undefined;
        this.song = undefined;
        this.songQueue = [];
        this.guild = gid;
    }

    getSong() {
        return this.song;
    }

    skip() {
        this.song = this.songQueue.shift();
        if (!this.song)
            return;
        let uid = uuid.v4();
        this.uid = uid;
        let dis = this;
        consts.client.joinVoiceChannel(dis.song.channel).then(conn => {
            let stream = ytdl(this.song.url, {audioonly: true});
            try {
                consts.client.createMessage(dis.song.textChannel, `<@!${dis.song.requestedBy}> requested the song ${dis.song.info.title}!`);
            } catch (err) {
            }
            conn.play(stream);
            conn.on('end', () => {
                if (dis.uid !== uid)
                    return;
                if (dis.songQueue.length < 1) {
                    consts.client.leaveVoiceChannel(dis.song.channel);
                } else
                    dis.skip();
            });
        }, err => {
            dis.skip();
            try {
                consts.client.createMessage(dis.song.textChannel, `<@!${dis.song.requestedBy}> could not join the channel! \`${err}\``);
            }
            catch (_err) {
            }
        });
    }

    resume() {
        if (consts.client.voiceConnections.get(this.guild))
            consts.client.voiceConnections.get(this.guild).resume();
    }

    pause() {
        if (consts.client.voiceConnections.get(this.guild))
            consts.client.voiceConnections.get(this.guild).pause();
    }

    queue(song) {
        this.songQueue.push(song);
        if (consts.client.voiceConnections.get(this.guild))
            if (consts.client.voiceConnections.get(this.guild).playing)
                return;
        if (this.songQueue.length < 2)
            this.skip();
    }

    destroyNow() {
        this.uid = undefined;
        this.song = undefined;
        this.songQueue = undefined;
        managers.delete(this.guild);
        this.guild = undefined;
    }

    static get(gid) {
        if (!managers.has(gid)) {
            managers.set(gid, new Manager(gid));
        }
        return managers.get(gid);
    }

    static destroy(gid) {
        if (managers.has(gid))
            managers.get(gid).destroyNow();
    }
}

module.exports = Manager;