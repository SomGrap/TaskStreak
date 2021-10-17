module.exports = {
    name: 'channel',
    description: 'Send a message in the main channel.',
    usage: ' <opt:args>',
    guildOnly: true,
    args: true,
    category: 'admin',
    async execute(message, args) {

        const { mainChannels } = message.client;

        const channelId = await mainChannels.get(message.guild.id);

        const channel = message.client.channels.cache.get(channelId);

        const arg = args.join(' ');

        channel.send(arg).then(sent => {
            return message.reply('The test is a success !');
        })
        .catch(err => {
            console.log(err);
            return message.reply('There was an error trying to execute that command!');
        });

    },
};