const { prefix } = require('../../../config.json');

module.exports = {
    name: 'defaultPrefix',
    async execute(message, args) {

        const { prefixes, defaultPrefixes } = message.client;

        const language = message.lang.commands.Utility.settings.defaultPrefix;

        if (args[1] != null) {

            const guildPrefix = await prefixes.get(message.guild.id);

            if (args[1].toLowerCase() === 'on') {
                await defaultPrefixes.set(message.guild.id, true);
            } else if (args[1].toLowerCase() === 'off') {
                if (guildPrefix === prefix) return message.reply(language.cannotDisablePrefix);
                await defaultPrefixes.set(message.guild.id, false);
            } else {
                return message.reply(language.notCorrectArg);
            }

            return message.channel.send(success1 + args[1] + success2);
        }

        return message.reply(language.infoPrefixDefault1 + await defaultPrefixes.get(message.guild.id) + language.infoPrefixDefault2 + await prefixes.get(message.guild.id) + language.infoPrefixDefault3);

    },
};