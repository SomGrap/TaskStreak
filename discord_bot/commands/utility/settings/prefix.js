const { prefix } = require('../../../config.json');

module.exports = {
    name: 'prefix',
    async execute(message, args) {

        const { prefixes, defaultPrefixes } = message.client;

        const language = message.lang.commands.Utility.settings.prefix;

        if (args[1] != null) {
            const defaultPrefix = await defaultPrefixes.get(message.guild.id);
            if ((args[1] === prefix) && (!defaultPrefix)) return message.reply(language.cannotSetThisPrefix1 + prefix + language.cannotSetThisPrefix2);
			await prefixes.set(message.guild.id, args[1]);
			return message.channel.send(language.success1 + args[1] + language.success2);
		}

		return message.reply(language.infoPrefix1 + await prefixes.get(message.guild.id) + infoPrefix2 + await prefixes.get(message.guild.id) + infoPrefix3);
        
    },
};