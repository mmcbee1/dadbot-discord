import fetch from "node-fetch";

export async function randomFromTag(msg, args) {
    const tag = args[0];
    if (!tag) {
        await msg.reply('From where?? Ex: !random dadjoke');
        return;
    }
    const url = `${process.env.CMS_API_URL}/random/${tag}`;
    let response = await fetch(url, {
        headers: { ADMIN_KEY: process.env.CMS_API_KEY }
    });

    let data = await response.text();
    if (response.ok) {
        await msg.channel.send(data || 'That tag has no content yet!');
    } else {
        console.warn(data);
        await msg.author.send(`NOPE: ${JSON.stringify(data)}`);
    }
}

export async function tagCount(msg, args) {
    const tag = args[0];
    if (!tag) {
        await msg.reply('For what?? Ex: !count dadjoke');
        return;
    }

    const url = `${process.env.CMS_API_URL}/list/${tag}`;
    let response = await fetch(url, {
        headers: { ADMIN_KEY: process.env.CMS_API_KEY }
    });

    let data = await response.json();
    if (response.ok) {
        const count = data.length
            ? `There are ${data.length} entries for !${tag}`
            : 'That tag has no content yet. Add some!';
        await msg.channel.send(count);
    } else {
        console.warn(data);
        await msg.author.send(`NOPE: ${JSON.stringify(data)}`);
    }
}

export async function addToTag(msg, args) {
    const category = args[0];
    const message = args.splice(1).join(' ');

    if (!category || !message) {
        await msg.channel.send('Add what?!? Ex: !addto dadjoke <content>');
        return;
    }
    const url = `${process.env.CMS_API_URL}/message`;
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({ message, category }),
        headers: {
            'Content-Type': 'application/json',
            'ADMIN_KEY': process.env.CMS_API_KEY
        }
    });

    const data = await response.json();
    if (response.ok) {
        await msg.channel.send(`Added to ${category}: ${message}`);
    } else {
        console.warn(data);
        await msg.author.send(`BORKED: ${JSON.stringify(data)}`);
    }
}
