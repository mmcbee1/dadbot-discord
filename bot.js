import dotenv from 'dotenv';
import Discord from 'discord.js';
import { msgHandler } from "./handlers.js";

dotenv.config();

export const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
  ]
});

client.once('ready', (resp) => {
  console.log(`${resp.user.username} is online!`);
});
client.on('messageCreate', msgHandler);

client.login(process.env.BOT_TOKEN).then();
