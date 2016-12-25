'use strict';
// Prepare global utils
require('./utils/utils.js');
// Prepare settings
let settings_;
try {
    settings_ = require('./settings.json');
} catch (err){
    console.error("Could not load `settings.json`! Exiting...");
    console.error(err.stack);
    process.exit(1);
}
const settings = settings_;
settings.prefix = settings.prefix || "ham.";
settings.moderators = settings.moderators || [];
if (!Array.isArray(settings.moderators)) {
    settings.moderators = [];
}
// Required fields
if(!settings.token || !settings.ownerid){
    console.error('One or more of mandatory fields `ownerid` and `token` are unset in the `settings.json`! Exiting...');
    process.exit(1);
}
// Prepare log
const logging = require('./logging.js');
if (settings.noLog) {
    logging.setFile(undefined);
}
logging.hook();
// Prepare localStorage
global.localStorage = new (require('./localStorage.js'))('./localStorage.json');

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
