'use strict';

const settings = require('./settings.json');
const Eris = require('eris');
const client = new Eris(settings.token);
client.connect();
client.on('ready', () => {
  console.log('Ready!');
});

client.on('error', (err) => console.error(err));

client.on('messageCreate', (msg) => {
  if (!msg.content.startsWith(settings.prefix))
    return;
});
