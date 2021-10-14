module.exports = {
    name: 'test',
    description: 'A test command.',
    usage: ' <opt:args>',
    category: 'utility',
    async execute(message, args) {

        const guildOwner = message.guild.members; // A modifer afin d'en tirer l'owner
        const guildSystemChannel = message.guild.systemChannelId;
        console.log(guildOwner);
        return console.log(guildSystemChannel);

    },
};