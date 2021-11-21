import fetch from "node-fetch";

export async function addToTag(msg, args) {
    const okServers = [process.env.BOTWORLD_GID];
    const okUsers = [
        process.env.ME_UID,
        process.env.RIGGS_UID,
        process.env.DONCHAMP_UID,
    ];
    if (!(okServers.includes(msg.guildId) || okUsers.includes(msg.author.id))) return;

    const category = args.length ? args[0] : '';
    const message = args.length ? args.splice(1).join(' ') : '';

    // until permissions system is added in the api, keep dadjokes safe for riggs
    if (msg.author.id === process.env.DONCHAMP_UID && category === 'dadjoke') {
        await msg.reply('You must be an actual dad to add dadjokes');
        return;
    }

    if (!category || !message) {
        await msg.reply('Add what? Ex: !addto <tag> <content>');
        return;
    }
    const response = await fetch(`${process.env.CMS_API_URL}/message`, {
        method: 'post',
        body: JSON.stringify({ message, category }),
        headers: {
            'Content-Type': 'application/json',
            'ADMIN_KEY': process.env.CMS_API_KEY
        }
    });

    const data = await response.json();
    if (response.ok) {
        await msg.react('✅');
    } else {
        console.warn(data);
        await msg.author.send(`SRY I AM BORKED: ${JSON.stringify(data)}`);
    }
}

export async function deleteMessage(msg, args) {
    const okServers = [process.env.BOTWORLD_GID];
    const okUsers = [process.env.ME_UID];
    if (!(okServers.includes(msg.guildId) || okUsers.includes(msg.author.id))) return;

    const messageId = Number(args.length ? args[0] : 0);
    if (!messageId || isNaN(messageId)) {
        await msg.reply('Delete which ID? Ex: !axe <id> (number)');
        return;
    }

    const response = await fetch(`${process.env.CMS_API_URL}/message?id=${messageId}`, {
        method: 'delete',
        headers: { 'ADMIN_KEY': process.env.CMS_API_KEY }
    });
    const data = await response.json();

    if (response.ok && data && data.success) {
        await msg.react('🆗');
    } else {
        console.warn(data);
        await msg.author.send(`SRY I AM BORKED: ${JSON.stringify(data)}`);
    }
}

export async function getMessage(msg, args) {
    const okServers = [process.env.BOTWORLD_GID];
    const okUsers = [process.env.ME_UID];
    if (!(okServers.includes(msg.guildId) || okUsers.includes(msg.author.id))) return;

    const messageId = Number(args.length ? args[0] : 0);
    if (!messageId || isNaN(messageId)) {
        await msg.reply('Get which ID? Ex: !checkid <id> (number)');
        return;
    }

    const response = await fetch(`${process.env.CMS_API_URL}/message/${messageId}`, {
        headers: { 'ADMIN_KEY': process.env.CMS_API_KEY }
    });
    const data = await response.text();

    if (response.ok) {
        await msg.reply(data || `No message exists with ID: ${messageId}`);
    } else {
        console.warn(data);
        await msg.author.send(`SRY I AM BORKED: ${data}`);
    }
}