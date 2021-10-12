const { prefix, defaultPrefix, language } = require('../config.json');

module.exports = {
    name: 'ready',
    once: 'true',
    async execute(client) {
        
        client.user.setActivity('Launching...');

        const { prefixes, defaultPrefixes, mainChannels, guildLanguages } = client;
        
        // Initialisation des données des serveurs
        console.log('Data synchronization...');

        const Guilds = client.guilds.cache.map(guild => guild.id);

        // Creation of missing databases
        console.log('   Creation of missing databases...');

        for (const Guild of Guilds) {
            const guild = client.guilds.cache.get(Guild);

            const Prefix = await prefixes.get(guild.id);
            const DefaultPrefix = await defaultPrefixes.get(guild.id);
            const MainChannel = await mainChannels.get(guild.id);
            const GuildLanguage = await guildLanguages.get(guild.id);

            // ATTENTION Utilise config.json
            if (Prefix === undefined) {
                await prefixes.set(guild.id, prefix);
                console.log(`   -prefixes synchronized for ${guild.name}-`);
            }

            if (DefaultPrefix === undefined) {
                await defaultPrefixes.set(guild.id, defaultPrefix);
                console.log(`   -defaultPrefixes synchronized for ${guild.name}-`);
            }

            if (MainChannel === undefined) {
                await mainChannels.set(guild.id, guild.systemChannelId);
                console.log(`   -mainChannels synchronized for ${guild.name}-`);
            }

            if (GuildLanguage === undefined) {
                await guildLanguages.set(guild.id, language);
                console.log(`   -guildLanguages synchronized for ${guild.name}-`);
            }
        }

        console.log(`Data are synchronized.\nTaskStreak logged in as ${client.user.tag}`);
        client.user.setActivity('in development...');

    },
};