import { gifUrl } from "./commands/gif.js";
import { randomFromTag, tagCount } from "./commands/cms.js";
import { addToTag, deleteMessage, getMessage } from "./commands/admin.js"

const commands = {
    gif: gifUrl,
    random: randomFromTag,
    count: tagCount,
    addto: addToTag,
    axe: deleteMessage,
    checkid: getMessage,
};

export async function msgHandler(msg) {
    let args = msg.content.split(' ');
    let cmd = args.shift();

    if (cmd.charAt(0) === '!') {
        cmd = cmd.substring(1).toLowerCase();
        if (Object.keys(commands).includes(cmd)) {
            commands[cmd](msg, args);
        } else {
            infoDump(msg);
        }
    }
}

function infoDump(msg) {
    console.log(`message id: ${msg.id} | guildId: ${msg.guildId} | channelId: ${msg.channelId}`);
    console.log(`user id: ${msg.author.id} | username: ${msg.author.username} | is a bot?: ${msg.author.bot}`);
    console.log(`content: ${msg.content}`);
}
