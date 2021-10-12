const { MessageEmbed } = require("discord.js");
const { pumpkin } = require("../../assets/colors.json");
const { name, version, description, author, dependencies } = require("../../package.json");

module.exports = {
    name: 'infobot',
    description: 'Sends information about the bot.',
    aliases: ['info', 'information', 'bot'],
    usage: '',
    category: 'miscellaneous',
    execute(message) {

        const language = message.lang.commands.Miscellaneous.infobot;

        // Embed
        const infoEmbed = new MessageEmbed()
            .setColor(`${pumpkin}`)
            .setTitle('InfoBot')
            .addFields(
                { name: language.names, value: `*${name}*`, inline: true },
                { name: language.desc, value: `*${description}*`, inline: true },
                { name: language.vers, value: `*${version}*`, inline: true },
                { name: language.APIVers, value: `*${dependencies["discord.js"]}*`, inline: true },
                { name: language.serv1, value: `*${message.client.guilds.cache.map(guild => guild.id).length}* ${language.serv2}`, inline: true },
                { name: language.date, value: `*3 aout 2021*`, inline: true },
                { name: language.author, value: `*${author}*`, inline: true }
            )
            .setFooter('TaskStreak - I\'m just checking if you are active on a server.');

        return message.channel.send({embeds: [infoEmbed]});

    },
};