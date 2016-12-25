'use strict';
const manager = require('./../music/manager.js');
const ytdl = require('ytdl-core');
const Command = require('./command.js');
const consts = require("../index.js");

class Queue extends Command {
    process(msg, args) {
        let channel = msg.guild.channels.find(ch => ch.bitrate && ch.voiceMembers.map(m => m.user).includes(msg.author));
        if (channel) {
            let json = channel.permissionsOf(consts.client.user.id).json;
            if (json.voiceConnect && json.voiceSpeak && json.voiceUseVAD) {
                let url = args[0];
                 if(url.includes('&')){
                     url = 'https://www.youtube.com/watch?v=' + utils.getURLParams(url).v;
                 }
                try {
                    ytdl.getInfo(url, (err, info) => {
                        if (!err) {
                            manager.get(channel.guild.id).queue({
                                url: url,
                                channel: channel.id,
                                textChannel: msg.channel.id,
                                info: info,
                                requestedBy: msg.author.id
                            });
                        } else {
                            msg.channel.createMessage('Bad URL!');
                        }
                    });
                } catch (err){
                    msg.channel.createMessage('Bad or missing URL!');
                }
            } else msg.channel.createMessage("I do not have the permissions to join that channel!");
        } else {
            msg.channel.createMessage('Must be in a channel to queue songs!');
        }
    }

    usage() {
        return 'Queues a song. `queue <URL>`';
    }

    type() {
        return 'music';
    }
}

module.exports = Queue;

