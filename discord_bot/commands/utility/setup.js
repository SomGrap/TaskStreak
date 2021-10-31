module.exports = {
	name: "setup",
	description: "This command help you to setup TaskStreak on your server!",
	usage: "<opt:pass>",
	permissions: 'ADMINISTRATOR',
	category: "utility",
	async execute(message, args) {

		client = message.client
		guild = message.guild
		
		const { prefixes, defaultPrefixes, mainChannels, guildLanguages } = client;

		const prefix = await prefixes.get(guild.id);
		const defaultPrefix = await defaultPrefixes.get(guild.id);
		const mainChannel = await mainChannels.get(guild.id);
		const guildLanguage = await guildLanguages.get(guild.id);


	}
};