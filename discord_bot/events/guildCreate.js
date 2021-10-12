const { MessageEmbed } = require("discord.js");
const { pumpkin } = require('../assets/colors.json');
const { prefix, defaultPrefix, language } = require('../config.json');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {

        console.log(`TaskStreak join a Guild! ${guild}`);

        // Initialisation des données du serveur
        const { prefixes, defaultPrefixes, mainChannels, guildLanguages } = guild.client;

        // Initialisation des données du serveur, utilise config.json
        await prefixes.set(guild.id, prefix);
        await defaultPrefixes.set(guild.id, defaultPrefix);
        const guildSystemChannel = guild.systemChannelId;
        await mainChannels.set(guild.id, guild.systemChannelId);
        await guildLanguages.set(guild.id, language);
        
        console.log(guildSystemChannel);

        const channel = guild.client.channels.cache.get(guild.systemChannelId);

        // Message de présentation
        const newGuild = new MessageEmbed()
            .setTitle('Hello Guys')
            .setAuthor('TaskStreak')
            .setDescription(`*I\'m new on this server, please be gentle!*\nYou can set up the bot correctly on your server with the command \`${prefix}setup\`\nBe carreful, if the bot leaves the server, all server data will be deleted.\n**Have Fun!**`)
            .setColor(`${pumpkin}`);

        try {
            return channel.send({ embeds: [newGuild] });
        } catch (error) {
            const guildOwner = guild.owner;
            console.log(guildOwner.toString());
        }

    },
};