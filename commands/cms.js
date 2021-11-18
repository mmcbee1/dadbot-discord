import fetch from "node-fetch";

export async function randomFromTag(msg, args) {
    if (!args || !args[0]) {
        await msg.reply('Random what? Ex: !random dadjoke');
        return;
    }
    const tag = args[0];
    let response = await fetch(`${process.env.CMS_API_URL}/random/${tag}?source=bot`, {
        headers: { ADMIN_KEY: process.env.CMS_API_KEY }
    });

    let data = await response.text();
    if (response.ok) {
        await msg.channel.send(data || 'That tag has no content yet!');
    } else {
        console.warn(data);
        // await msg.author.send(`NOPE: ${JSON.stringify(data)}`);
    }
}

export async function tagCount(msg, args) {
    if (!args || !args[0]) {
        await msg.reply('For what? Ex: !count dadjoke');
        return;
    }
    const tag = args[0];
    let response = await fetch(`${process.env.CMS_API_URL}/list/${tag}`, {
        headers: { ADMIN_KEY: process.env.CMS_API_KEY }
    });

    let data = await response.json();
    if (response.ok) {
        const count = data.length
            ? `There are ${data.length} entries for !${tag}`
            : 'That tag has no content yet. Bummer!';
        await msg.channel.send(count);
    } else {
        console.warn(data);
        // await msg.author.send(`NOPE: ${JSON.stringify(data)}`);
    }
}

export async function addToTag(msg, args) {
    const okServers = [process.env.BOTWORLD_GID];
    const okUsers = [
        process.env.ME_UID,
        process.env.RIGGS_UID,
    ];
    if (!(okServers.includes(msg.guildId) || okUsers.includes(msg.author.id))) return;

    const category = args.length ? args[0] : '';
    const message = args.length ? args.splice(1).join(' ') : '';

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