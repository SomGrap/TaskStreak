const { MessageEmbed } = require('discord.js');
const { pumpkin } = require('../../assets/colors.json');
const { prefix } = require('../../config.json');

module.exports = {
    name: 'settings',
    description: 'Allows you to configure the bot on your server.',
    usage: ' <opt:settingName> <opt:args>',
    aliases: ['setting', 'stg', 'options', 'option', 'opt'],
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
    category: 'utility',
    async execute(message, args) {

        const { settings } = message.client;

        const language = message.lang.commands.Utility.settings;

        const setting = settings.get(args[0]);

        //args ou non
        if(args.length) {
            if (!setting) return message.channel.send(language.settingNotFound);

            try {
                return setting.execute(message, args);
            } catch (error) {
                console.error(error);
                return message.reply(language.errorExecuteCommand);
            }
        }

        const settingsEmbed = new MessageEmbed()
            .setTitle('Settings')
            .setColor(`${pumpkin}`)
            .addFields(
                { name: 'Prefix', value: language.prefixDesc },
                { name: 'DefaultPrefix', value: language.defaultPrefixDesc + prefix + "`"},
                { name: 'Channel', value: language.channelDesc },
                { name: 'Language', value: language.languageDesc }
            );

        return message.channel.send({ embeds: [settingsEmbed] });
    },
};