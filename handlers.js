import { gifUrl } from "./commands/gif.js";
import { addToTag, randomFromTag, tagCount } from "./commands/cms.js";
import { client } from "./bot.js";

const commands = {
    gif: gifUrl,
    random: randomFromTag,
    count: tagCount,
    addto: addToTag
};

export async function msgHandler(msg) {
    if (client.user.id === msg.author.id) return;
    if (process.env.DEBUG_ONLY && msg.channelId !== process.env.TEST_CHANNEL_ID) return;

    let args = msg.content.split(' ');
    let cmd = args.shift();

    if (cmd.charAt(0) === '!') {
        cmd = cmd.substring(1).toLowerCase();
        if (Object.keys(commands).includes(cmd)) {
            commands[cmd](msg, args);
        } else {
            // todo: reply with !help info?
            msg.reply(`Stop trying to make '${cmd}' a thing, ${msg.author.username}`);
            infoDump(msg);
        }
    }
}

function infoDump(msg) {
    console.log(`message id: ${msg.id} | guildId: ${msg.guildId} | channelId: ${msg.channelId}`);
    console.log(`user id: ${msg.author.id} | username: ${msg.author.username} | is a bot?: ${msg.author.bot}`);
    console.log(`content: ${msg.content}`);
}
