'use strict';
const constants = require('./../index.js');
const Command = require('./command.js');

class Help extends Command {
    process(msg, args) {
        let cmdMap = new Map();
        let commands = constants.commands.getCommands();
        commands.forEach((v, k) => {
            if (!cmdMap.has(v.type()))
                cmdMap.set(v.type(), []);
            cmdMap.get(v.type()).push({command: k, usage: v.usage()});
        });
        let embed = {title: 'Hamster Commands:', type: 'rich', fields: []};
        cmdMap.forEach((v, k) => {
            let val = '';
            v.sort();
            v.forEach(va => val += `${constants.settings.prefix}${va.command} - ${va.usage}\n`);
            let field = {name: k.charAt(0).toUpperCase() + k.substring(1), value: val, inline: false};
            embed.fields.push(field);
        });
        msg.channel.createMessage({
            embed: embed
        });
    }

    usage() {
        return 'Shows a list of commands with their usages';
    }

    type() {
        return 'general';
    }
}

module.exports = Help;
