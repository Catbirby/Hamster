"use strict";

const constants = require('./../index.js');

class Help {
    process(msg, args){
        let help = '';
        let commands = constants.commands.getCommands();
        commands.forEach((v, k) => {
            help += k + ' - ' + v.usage() + '\n';
        });
        msg.channel.createMessage('```fix\n' + help + '\n```');
    }

    usage(){
        return 'Shows a list of commands with their usages';
    }
}

module.exports = Help;
