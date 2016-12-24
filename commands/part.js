"use strict";

const constants = require('./../index.js');

class Info {
    //noinspection JSUnusedLocalSymbols // Has to exist because inheritance I guess?
    process(msg, args) {
        constants.client.voiceConnections.leave(msg.guild.id);
    }

    usage() {
        return 'Leaves this guild\'s voice connection.';
    }
}
module.exports = Info;

