'use strict';
const manager = require('./../music/manager.js');
const ytdl = require('ytdl-core');
const Command = require('./command.js');

class Skip extends Command {
    process(msg, args) {
        let channel = msg.guild.channels.find(ch => ch.bitrate && ch.voiceMembers.map(m => m.user).includes(msg.author));
        if (channel) {
            manager.get(msg.guild.id).skip();
        } else {
            msg.channel.createMessage('Must be in a channel to skip songs!');
        }
    }

    usage() {
        return 'Skips the current song';
    }

    type() {
        return 'music';
    }
}

module.exports = Skip;


