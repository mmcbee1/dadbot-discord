import { Client, Intents } from 'discord.js';
import { msgHandler } from "./handlers.js";

// un-comment for local dev
// import dotenv from "dotenv";
// dotenv.config();

const client = new Client({
  partials: ['CHANNEL'],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ]
});

client.once('ready', (resp) => {
  console.log(`${resp.user.username} is online!`);
});
client.on('messageCreate', (msg) => {
  if (client.user.id === msg.author.id || msg.author.bot) return;
  msgHandler(msg).then();
});
// const logIt = (resp) => console.warn(resp);
// client.on('messageReactionAdd', logIt);
// client.on('interactionCreate', logIt); // registered slash commands

client.login(process.env.BOT_TOKEN).then().catch(e => {
  console.warn(process.env.BOT_TOKEN)
  console.error(e)
});
