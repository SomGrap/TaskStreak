module.exports = {
    name: 'guildDelete',
    async execute(guild) {
        console.log(`TaskStreak quit a Guild! ${guild}`);

        const { prefixes, defaultPrefixes, mainChannels, guildLanguages } = guild.client;

        // Delete data
        await prefixes.delete(guild.id);
        console.log(`SQLite data delete (prefixes): ${guild}`);

        await defaultPrefixes.delete(guild.id);
        console.log(`SQLite data delete (defaultPrefixes): ${guild}`);

        await mainChannels.delete(guild.id);
        console.log(`SQLite data delete (mainChannels): ${guild}`);

        await guildLanguages.delete(guild.id);
        console.log(`SQLite data delete (guildLanguages): ${guild}`);

    },
};