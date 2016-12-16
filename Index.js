const Eris = require("eris");
const client = new Eris("BOT_TOKEN_HERE ");

client.on("ready", () => {
  console.log("Ready!");
});

client.on("error", err => console.error(err));

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith('ham.')) return;
  
