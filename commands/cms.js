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
