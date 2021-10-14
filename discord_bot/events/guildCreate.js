const { MessageEmbed, Guild } = require("discord.js");
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
        const guildSystemChannel = guild.systemChannelId || null;
        await mainChannels.set(guild.id, guild.systemChannelId);
        await guildLanguages.set(guild.id, language);

        // Message de présentation
        const newGuild = new MessageEmbed()
            .setTitle('Hello Guys')
            .setAuthor('TaskStreak')
            .setDescription(`*I\'m new on your server, please be gentle!*\nYou can set up the bot correctly on your server with the command \`${prefix}setup\`\nBe carreful, if the bot leaves the server, all server data will be deleted.\n**Have Fun!**`)
            .setFooter(`Hello ${guild.name}'s member(s)`)
            .setColor(`${pumpkin}`);

        try {
            const channel = guild.client.channels.cache.get(guild.systemChannelId);
            return channel.send({ embeds: [newGuild] });
        } catch (error) {
            await guild.members.fetch(guild.ownerId)
                .then(guildMember => guildOwner = guildMember);
            guildOwner.send({ embeds: [newGuild] });
        }

    },
};