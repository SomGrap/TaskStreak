module.exports = {
    name: 'language',
    async execute(message, args) {

        const { prefixes, guildLanguages } = message.client;

        const language = message.lang.commands.Utility.settings.language;

        if (args[1] != null) {
            if (args[1].toLowerCase() === 'en') {
                await guildLanguages.set(message.guild.id, 'en');
            } else if (args[1].toLowerCase() === 'fr') {
                await guildLanguages.set(message.guild.id, 'fr');
            } else {
                return message.reply(language.languageNotFound);
            }

            return message.channel.send(language.success1 + args[1] + language.success2);
        }

        return message.reply(language.infoLanguage1 + await guildLanguages.get(message.guild.id) + language.infoLanguage2 + await prefixes.get(message.guild.id) + language.infoLanguage3);

    },
};