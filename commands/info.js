"use strict";
var constants = require('./../index.js');
class Info {
    //noinspection JSUnusedLocalSymbols // Has to exist because inheritance I guess?
    process(msg, args){
        var text = 'Hi! I am Hamster! I am a self-host bot made by Lunar-Skies and ArsenArsen!\n';
        text += `I am on \`${constants.client.guilds.size}\` guilds!`;
        msg.channel.createMessage(text);
    }
}
module.exports = Info;