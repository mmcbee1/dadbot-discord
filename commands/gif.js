import fetch from "node-fetch";

export async function gifUrl(msg, args, urlOnly = true) {
    const params = `api_key=${process.env.GYPHY_KEY}&limit=10&rating=pg-13&lang=en`
    const query = args.length ? args.join(' ') : '';
    let url = query
        ? `${process.env.GYPHY_URL}/search?${params}&q=${query}`
        : `${process.env.GYPHY_URL}/random?${params}`;

    let response = await fetch(url);
    let json = await response.json();

    if (response.ok && json.data) {
        const imageReply = Array.isArray(json.data)
            ? json.data[Math.floor(Math.random() * json.data.length)].url
            : json.data.url;
        if (urlOnly) {
            return await imageReply;
        } else {
            await msg.channel.send(imageReply);
        }
    } else {
        console.warn(json);
    }
}
