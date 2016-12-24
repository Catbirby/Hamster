"use strict";

const constants = require('./../index.js');

class Info {
    //noinspection JSUnusedLocalSymbols // Has to exist because inheritance I guess?
    process(msg, args) {
        let channel = msg.guild.channels.find(ch => ch.bitrate && ch.voiceMembers.map(m => m.user).includes(msg.author));
        if (channel) {
            constants.client.joinVoiceChannel(channel.id);
        }
    }

    usage() {
        return 'Summons me to your voice connection';
    }
}
module.exports = Info;
