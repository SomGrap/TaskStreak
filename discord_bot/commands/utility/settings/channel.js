module.exports = {
    name: 'channel',
    async execute(message, args) {

        const { prefixes, mainChannels } = message.client;

        const language = message.lang.commands.Utility.settings.channel;

        let channel;
        let channelId;

        // Check si info ou définition d'un nouveau channel
        if (args[1] != null) {

            
            if (args[1].startsWith('<')) {
                // Si le joueur mentionne le channel, on récupère l'id
                const slice = args[1].split('#');
                channelId = slice[1].slice(0, -1);
            } else if (args[1] === 'this') {
                // Si le joueur selectionne le channel dans lequel il écrit
                channelId = message.channel.id;
            } else {
                // Si le joueur envoit l'id d'un channel
                channelId = args[1];
            }

            channel = message.client.channels.cache.get(channelId);

            // Test si le channel existe et est valide. Si oui définition du nouveau channel principal
            try {

                channel.send('This channel ?').then(sent => {
                    sent.edit(language.successMainChannel);
                });
                await mainChannels.set(message.guild.id, channelId);
                return message.reply(language.successPart1 + channel + language.successPart2);

            } catch (error) {

                console.error(error);
                return message.reply(language.cannotBeMainChannel);

            }
            
		}

        // Si juste info
        channelId = await mainChannels.get(message.guild.id);
        channel = message.client.channels.cache.get(channelId);

        return message.reply(language.infoMainChannel1 + channel + language.infoMainChannel2 + await prefixes.get(message.guild.id) + language.infoMainChannel3);

    },
};