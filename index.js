'use strict';

const settings = require('./settings.json');
const Eris = require('eris');
const client = new Eris(settings.token);
const commands = new (require("./commands/dispatcher.js"))();
client.connect();
client.on('ready', () => {
    commands.register("info", new (require("./commands/info.js"))());
    console.log('Ready!');
});

client.on('error', (err) => console.error(err));

client.on('messageCreate', (msg) => {
    if (!msg.channel.guild || !msg.content.startsWith(settings.prefix))
        return;
    var content = msg.content;
    var command = content.substring(settings.prefix.length);
    if (command.length === 0)
        return;
    var args = [];
    if (content.includes(' ')) {
        args = content.substring(command.length + settings.prefix.length + 1).split(' ');
        command = command.substring(0, command.indexOf(' '));
    }
    commands.process(command, msg, args);
});
