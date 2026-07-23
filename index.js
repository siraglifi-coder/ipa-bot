const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);

    try {
        joinVoiceChannel({
            channelId: '1529654011412746432',
            guildId: '1494985474425749668',
            adapterCreator: client.guilds.cache.get('1494985474425749668').voiceAdapterCreator,
            selfDeaf: true,
            selfMute: false
        });
        console.log('✅ Joined Voice Channel successfully!');
    } catch (error) {
        console.error('❌ Error joining voice channel:', error);
    }
});

client.login(process.env.TOKEN);const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});