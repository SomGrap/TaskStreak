module.exports = {
    name: 'invite',
    description: 'Sends a link to invite TaskStreak to your server.',
    aliases: ['link', 'inv'],
    usage: '',
    category: 'miscellaneous',
    async execute(message) {

        const language = message.lang.commands.Miscellaneous.invite;

        // envoie du invite en mp si possible
        return message.author.send(language.invite)
        .then(() => {
            if (message.channel.type === 'DM') return;
            message.reply(language.alertDM);
        })
        .catch(error => {
            console.error(`Could not send help DM to ${message.author.tag}.`);
            message.reply(invite.cannotDM);
        });

    },
};