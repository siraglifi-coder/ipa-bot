const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const GUILD_ID = "1494985474425749668";
const CHANNEL_ID = "1529654011412746432";

client.once('ready', () => {
    console.log(`Bot Online: ${client.user.tag}`);

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        console.log("خطأ: لم يتم العثور على السيرفر!");
        return;
    }

    const channel = guild.channels.cache.get(CHANNEL_ID);
    if (!channel) {
        console.log("خطأ: لم يتم العثور على روم الفويس!");
        return;
    }

    try {
        joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: false
        });
        console.log(`تم الاتصال بروم الفويس بنجاح: ${channel.name}`);
    } catch (error) {
        console.error("خطأ أثناء محاولة الدخول للفويس:", error);
    }
});

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

client.login(process.env.TOKEN);
