const { prefix, owner } = require('../config.json');
const { Collection } = require('discord.js');
const en = require ('../assets/languages/en.json');
const fr = require ('../assets/languages/fr.json');

module.exports = {
	name: 'messageCreate',
	async execute(message) {

        const { cooldowns, prefixes, guildLanguages, defaultPrefixes } = message.client;

        // Ne rien faire si le msg a été envoyer par un bot
		if (message.author.bot) return;

        let args;
        const globalPrefix = prefix;

        // Si le msg provient d'un serveur ou d'un mp
		if (message.guild) {
            let mPrefix;
            let defaultPrefix;

            if (message.channel.type != 'DM') {
                defaultPrefix = await defaultPrefixes.get(message.guild.id);
            } else {
                defaultPrefix = true;
            }

            // Check si le msg commence par le prefix global ou le prefix propre au serveur. Et l'assigne à la variable prefix
            if (message.content.startsWith(globalPrefix)) {
                if (!defaultPrefix) return;
                mPrefix = globalPrefix;
            } else {
                const guildPrefix = await prefixes.get(message.guild.id);
                if (message.content.startsWith(guildPrefix)) mPrefix = guildPrefix;
            }

            // Prefix ou non
            if (!mPrefix) return;
            args = message.content.slice(mPrefix.length).trim().split(/\s+/);
        } else {
            const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
            args = message.content.slice(slice).split(/\s+/);
        }

        // Def du nom de la commmande
        const commandName = args.shift().toLowerCase();

        if (!commandName.length) return;

        // Command aliases
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // Définition de la langue
        let lang;
        let guildLanguage;

        // Récupére la langue du serveur si sur serveur
        if (message.channel.type != 'DM') guildLanguage = await guildLanguages.get(message.guild.id);

        if (guildLanguage === 'fr') {
            lang = fr;
        } else {
            lang = en;
        }

        const language = lang.events.MessageCreate;

        // Permet de récuperer message.lang dans les commandes
        message.lang = lang;

        // Check si la commande existe ou si elle peut être utiliser que par l'owner du bot
        if (!command || (command.category === 'admin' && message.author.id != owner)) return message.channel.send(language.commandNotFound);

        // Check si la commande s'éxécute que sur un serveur ou peut être send en dm
        if (command.guildOnly && message.channel.type === 'DM') return message.reply(language.guildOnlyCommand);

        // Check les permissions de la commande
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                if (message.author.id != owner) {
                    return message.reply(language.notPerm + `\`${command.permissions}\``);
                }
                message.channel.send('Admin pass :)');
            }

        }

        // Cooldowns
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(language.cooldownCommand + `*${timeLeft.toFixed(0)}*` + "s");
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (command.args && !args.length) return message.reply(language.noArgs);

        // Execute command
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply(language.errorExecuteCommand);
        }
        
	},
};