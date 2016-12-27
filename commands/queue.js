'use strict';
const manager = require('./../music/manager.js');
const ytdl = require('ytdl-core');
const Command = require('./command.js');
const consts = require('../index.js');
const utils = require('../utils/utils.js');

class Queue extends Command {
    process(msg, args) {
        if ((args[0] || '').toLocaleLowerCase() === 'list') {
            let queue = manager.get(msg.channel.guild.id).getQueue();
            let embed = {title: 'Current Playlist:', type: 'rich', fields: []};
            let current = '';
            let number = 1;
            let page = 1;
            queue.forEach(v => {
                let format = `${number++}. ${v.info.title}\n`;
                if (current.length + format.length > 1023) {
                    embed.fields.push({name: `Page ${page++}`, value: current, inline: false});
                    current = '';
                }
                current += format;
            });
            msg.author.getDMChannel().then(channel => channel.createMessage({
                embed: embed
            })).catch(console.error);
            return;
        }
        let channel = msg.guild.channels.find(ch => ch.bitrate && ch.voiceMembers.map(m => m.user).includes(msg.author));
        if (channel) {
            let json = channel.permissionsOf(consts.client.user.id).json;
            if (json.voiceConnect && json.voiceSpeak && json.voiceUseVAD) {
                let url = args[0];
                if (url.includes('&')) {
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
                } catch (err) {
                    msg.channel.createMessage('Bad or missing URL!');
                }
            } else msg.channel.createMessage("I do not have the permissions to join that channel!");
        } else {
            msg.channel.createMessage('Must be in a channel to queue songs!');
        }
    }

    usage() {
        return 'Queues a song. `queue <URL>`. If instead of the <URL> you give it `list` it will list the curent queue.';
    }

    type() {
        return 'music';
    }
}

module.exports = Queue;

