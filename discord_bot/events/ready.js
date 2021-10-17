const { prefix, defaultPrefix, language } = require('../config.json');

module.exports = {
    name: 'ready',
    once: 'true',
    async execute(client) {
        
        client.user.setActivity('Launching...');

        const { prefixes, defaultPrefixes, mainChannels, guildLanguages, maintenanceMod } = client;
        
        // Initialisation des données des serveurs
        console.log('Servers Data synchronization...');

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
                const guildSystemChannel = guild.systemChannelId || null;
                await mainChannels.set(guild.id, guildSystemChannel);
                console.log(`   -mainChannels synchronized for ${guild.name}-`);
            }

            if (GuildLanguage === undefined) {
                await guildLanguages.set(guild.id, language);
                console.log(`   -guildLanguages synchronized for ${guild.name}-`);
            }
        }

        // Initialisation des bases de données du bot
        console.log('Bot Data synchronization...');

        const mtncMod = await maintenanceMod.get(client.user);
        if (mtncMod === undefined) {
            await maintenanceMod.set(client.user, false);
            console.log(`   -maintenanceMod synchronized for ${client.user.tag}-`);
        }


        console.log(`Data are synchronized.\nTaskStreak logged in as ${client.user.tag}`);
        if (mtncMod) {
            return client.user.setPresence({ activities: [{ name: 'maintenance...' }], status: 'idle' });
        }
        return client.user.setPresence({ activities: [{ name: 'in development...' }], status: 'online' });

    },
};