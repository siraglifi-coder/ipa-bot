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
    console.log(`✅ Bot Online: ${client.user.tag}`);

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
        return console.log("❌ Error: Guild not found!");
    }

    const channel = guild.channels.cache.get(CHANNEL_ID);
    if (!channel) {
        return console.log("❌ Error: Voice channel not found!");
    }

    try {
        joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: false
        });
        console.log(`🎤 Successfully joined voice channel: ${channel.name}`);
    } catch (error) {
        console.error("❌ Error joining voice:", error);
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.member.id === client.user.id && !newState.channelId) {
        const guild = client.guilds.cache.get(GUILD_ID);
        const channel = guild?.channels.cache.get(CHANNEL_ID);
        if (channel) {
            try {
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: guild.id,
                    adapterCreator: guild.voiceAdapterCreator,
                    selfDeaf: true,
                    selfMute: false
                });
                console.log("🔄 Bot reconnected to voice automatically!");
            } catch (error) {
                console.error("❌ Error reconnecting:", error);
            }
        }
    }
});

const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000, () => console.log('🌐 Server is running on port 3000'));

const part1 = "MTUyOTI3NjIyMjkxNDE3MTAxMQ";
const part2 = "GWAi-x.VON7tXRucuz0_E6Xx97OZrr9IHpqouZogdC9cw";
client.login(`${part1}.${part2}`);
