module.exports = {
    name: 'maintenance',
    description: 'Enables or disables bot maintenance mode.',
    usage: ' <opt:args>',
    category: 'admin',
    execute(message, args) {

        if (!args.length) {
            return message.channel.send('msg');
        }

    },
};