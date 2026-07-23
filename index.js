console.log("بدأ تشغيل السكربت...");

const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const express = require('express');

console.log("تم استدعاء المكتبات بنجاح.");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const GUILD_ID = "1494985474425749668";
const CHANNEL_ID = "1529654011412746432";

client.once('ready', () => {
    console.log(`✅ Bot Online: ${client.user.tag}`);

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        return console.log("❌ خطأ: لم يتم العثور على السيرفر! تأكد من أن البوت موجود في السيرفر.");
    }

    const channel = guild.channels.cache.get(CHANNEL_ID);
    if (!channel) {
        return console.log("❌ خطأ: لم يتم العثور على روم الفويس! تأكد من الأيدي (ID).");
    }

    try {
        console.log("جاري محاولة الاتصال بالصوت...");
        joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: false
        });
        console.log(`🎤 تم الاتصال بروم الفويس بنجاح: ${channel.name}`);
    } catch (error) {
        console.error("❌ خطأ أثناء محاولة الدخول للفويس:", error);
    }
});

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(port, () => {
    console.log(`🌐 Server is running on port ${port}`);
});

console.log("جاري تسجيل الدخول بحساب البوت...");
client.login("MTUyOTI3NjiyMjkxNDE3MTA3MQ.GQ5hUC.Frn9ubeR0oA3Sy7VMv061-kIu7U7uGabb8cpE").catch(err => {
    console.error("❌ خطأ في تسجيل الدخول:", err);
});
