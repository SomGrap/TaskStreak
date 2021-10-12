const { prefix, owner } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const { pumpkin } = require('../../assets/colors.json');

module.exports = {
    name: 'help',
    description: 'List all commands or give informations about a specific commands.',
    aliases: ['aide', 'h', '?'],
    usage: ' <opt:command>',
    category: 'utility',
    async execute(message, args) {

        const { commands } = message.client;

        const language = message.lang.commands.Utility.help;

        // définition de l'embed de bases
        const helpEmbed = new MessageEmbed()
            .setTitle('Help')
            .setColor(`${pumpkin}`);

        if (!args.length) {
            // help sans argument

            // Liste toutes les commandes par catégorie
            const cmds = commands.map(command => command.name);

            let miscellaneousCommands = [];
            let taskCommands = [];
            let utilityCommands = [];
            let adminCommands = [];

            for (const cmd of cmds) {
                const newCommand = commands.get(cmd);
                switch (newCommand.category) {
                    case 'miscellaneous':
                        miscellaneousCommands.push(`${newCommand.name}`);
                        break;
                    case 'task':
                        taskCommands.push(`${newCommand.name}`);
                        break;
                    case 'utility':
                        utilityCommands.push(`${newCommand.name}`);
                        break;
                    case 'admin':
                        adminCommands.push(`${newCommand.name}`);
                        break;
                }
            }

            // Embed
            helpEmbed.setDescription(`This bot check if you do all tasks on discord.\nYou can send \`${prefix}help <commandName>\` to get information on a specific command!`);
            helpEmbed.addFields(
                { name: 'Miscellaneous', value: `${miscellaneousCommands.join(', ')}`},
                { name: 'Task', value: `${taskCommands.join(', ') || 0}`},
                { name: 'Utility', value: `${utilityCommands.join(', ')}`}
            );

            if (message.author.id == owner) helpEmbed.addFields({ name: 'Admin', value: `${adminCommands.join(', ')}`});

            helpEmbed.setFooter('develop by SomGrap');
        } else {
            // help avec argument

            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            // Commande existante ou non
            if (!command || (command.category === 'admin' && message.author.id != owner)) return message.channel.send(`The command \`${args[0]}\` was not found. Try Again!`);

            // Liste des aliases + nom cmd
            const commandAliases = [];

            commandAliases.push(`${command.name}`);
            if (command.aliases) for(a in command.aliases) commandAliases.push(`${command.aliases[a]}`);
            
            // Embed
            helpEmbed.addFields(
                { name: 'Aliase:', value: `\`${commandAliases.join(', ')}\``, inline: true},
                { name: 'Description:', value: `\`${command.description}\``, inline: true},
                { name: 'Usage', value: `\`${prefix}${command.name}${command.usage}\``, inline: true},
                { name: 'Cooldown', value: `\`${command.cooldown || 3} second(s)\``, inline: true}
            );
            helpEmbed.setFooter(`Command: ${command.name}`);
        }

        // envoie du help en mp si possible
        return message.author.send({embeds: [helpEmbed]})
		.then(() => {
			if (message.channel.type === 'DM') return;
			message.reply(language.DMReply);
		})
		.catch(error => {
			console.error(`Could not send help DM to ${message.author.tag}.`);
			message.reply(language.errorCanNotDM);
		});
    },
};