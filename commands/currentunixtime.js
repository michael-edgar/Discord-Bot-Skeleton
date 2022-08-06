const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('currentunixtime')
		.setDescription('Replies with the current time in Unix format!'),
	async execute(interaction) {
		const unixDate = new Date();
		const currentUnixTime = Math.trunc(unixDate.getTime()/1000);
        await interaction.reply({content: `This is the current time (${unixDate.toLocaleString('en-us', {timeZoneName:'short'})}) in Unix: ${currentUnixTime}`, ephemeral: true}) ;
	},
};
