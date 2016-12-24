'use strict';

require('./logging.js');

const settings = require('./settings.json');
const Eris = require('eris');
const client = new Eris(settings.token);
const Dispatcher = require('./commands/dispatcher.js');
const commands = new Dispatcher();
module.exports = {client: client, commands: commands, settings: settings};
const music = require('./music/manager.js');
const unirest = require('unirest');
unirest.get("https://discordapp.com/api/oauth2/applications/@me")
    .headers({Authorization: `Bot ${settings.token}`, 'Content-Type': 'application/json'})
    .end(body => console.log(`Invite: https://discordapp.com/oauth2/authorize?client_id=${body.body.id}&scope=bot&permissions=120654848`));

settings.prefix = settings.prefix || "ham.";

client.on('ready', () => {
    commands.register('info', new (require('./commands/info.js'))());
    commands.register('help', new (require('./commands/help.js'))());
    commands.register('queue', new (require('./commands/queue.js'))());
    commands.register('skip', new (require('./commands/skip.js'))());
    console.log('Ready!');
});

client.on('error', (err) => console.error(err));

client.on('messageCreate', (msg) => {
    if (msg.author.bot || !msg.content.startsWith(settings.prefix))
        return;
    if (!msg.channel.guild) {
        msg.channel.createMessage('I cannot be used in DM\'s.');
        return;
    }
    let perms = msg.channel.permissionsOf(client.user.id);
    if (!perms.json.sendMessages)
        return;
    if (!perms.json.embedLinks) {
        msg.channel.createMessage('You must have `Embed Links` enabled!');
        return;
    }
    const content = msg.content;
    let command = content.substring(settings.prefix.length);
    if (command.length === 0)
        return;
    let args = [];
    if (content.includes(' ')) {
        command = command.substring(0, command.indexOf(' '));
        args = content.substring(command.length + settings.prefix.length + 1).split(' ');
    }
    commands.process(command, msg, args);
});

client.on('guildDelete', (guild) => music.destroy(guild.id));

client.connect();
