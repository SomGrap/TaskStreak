const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const Keyv = require('keyv');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['CHANNEL', 'MESSAGE']});

client.commands = new Collection();
client.cooldowns = new Collection();
client.settings = new Collection();

// Initialisation des bases de données
client.prefixes = new Keyv('sqlite://data/serversSettings/prefixes.sqlite');
client.prefixes.on('error', err => console.error('Keyv connection error:', err));

client.defaultPrefixes = new Keyv('sqlite://data/serversSettings/defaultPrefixes.sqlite');
client.defaultPrefixes.on('error', err => console.error('Keyv connection error:', err));

client.mainChannels = new Keyv('sqlite://data/serversSettings/mainChannels.sqlite');
client.mainChannels.on('error', err => console.error('Keyv connection error:', err));

client.guildLanguages = new Keyv('sqlite://data/serversSettings/guildLanguages.sqlite');
client.guildLanguages.on('error', err => console.error('Keyv connection error:', err));

client.maintenanceMod = new Keyv('sqlite://data/botSettings/maintenanceMod.sqlite');
client.maintenanceMod.on('error', err => console.error('Keyv connection error:', err));

// Initialisation des Handler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./commands');
const settingFiles = fs.readdirSync('./commands/utility/settings').filter(file => file.endsWith('.js'));

// EventHandler
for (const eventFile of eventFiles) {
    const event = require(`./events/${eventFile}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else  {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// CommandHandler
for (const commandFolder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${commandFolder}`).filter(file => file.endsWith('.js'));

    for (const commandFile of commandFiles) {
        const command = require(`./commands/${commandFolder}/${commandFile}`);
        client.commands.set(command.name, command);
    }
}

// SettingHandler
for (const settingFile of settingFiles) {
    const setting = require(`./commands/utility/settings/${settingFile}`);
    client.settings.set(setting.name, setting);
}

// TaskStreak login
client.login(token);