'use strict';

require('./logging.js');

const settings = require('./settings.json');
const Eris = require('eris');
const client = new Eris(settings.token);
const Dispatcher = require('./commands/dispatcher.js');
const commands = new Dispatcher();

settings.prefix = settings.prefix || "ham.";


client.on('ready', () => {
    commands.register('info', new (require('./commands/info.js'))());
    commands.register('help', new (require('./commands/help.js'))());
    console.log('Ready!');
});

client.on('error', (err) => console.error(err));

client.on('messageCreate', (msg) => {
    if (!msg.channel.guild || !msg.content.startsWith(settings.prefix))
        return;
    const content = msg.content;
    let command = content.substring(settings.prefix.length);
    if (command.length === 0)
        return;
    let args = [];
    if (content.includes(' ')) {
        args = content.substring(command.length + settings.prefix.length + 1).split(' ');
        command = command.substring(0, command.indexOf(' '));
    }
    commands.process(command, msg, args);
});

module.exports = { client: client, commands: commands, settings: settings };

client.connect();
