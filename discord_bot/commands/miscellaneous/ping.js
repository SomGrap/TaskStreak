const { MessageEmbed } = require('discord.js');
const { pumpkin } = require('../../assets/colors.json');

module.exports = {
    name: 'ping',
    description: 'Ping!',
    usage: '',
    category: 'miscellaneous',
    cooldown: 60,
    async execute(message) {

        const language = message.lang.commands.Miscellaneous.ping;

        const pingEmbed = new MessageEmbed()
            .setTitle('Ping')
            .setColor(`${pumpkin}`);

        return message.channel.send('Pinging...').then(sent => {
            pingEmbed.setDescription("Pong!\n" + language.websocket + message.client.ws.ping.toString() + "ms.\n" + language.roundtrip + (sent.createdTimestamp - message.createdTimestamp).toString() + "ms");
            sent.delete();
            message.channel.send({ embeds: [pingEmbed] });
        });
        
    },
};