const { SlashCommandBuilder } = require('@discordjs/builders');
let hours = 00;
let minutes = 00;
let seconds = 00;
let timeZone = 'GMT';

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('giveunixtime')
// 		.setDescription('Replies with the given time in Unix format! Note time format = YYYY-MM-DDTHH:mm:ss+/-HH:mm')
// 		.addStringOption((option) => option.setName('datetime').setDescription('Give the datetime you want to see in Unix').setRequired(true)),
// 	async execute(interaction) {
// 		const dateTime = interaction.options.getString('datetime');
// 		const unixDateTime = Math.trunc(Date.parse(dateTime)/1000);
// 		await interaction.reply(`This is ${dateTime} in Unix: ${unixDateTime}`);
// 		await interaction.followUp(`<t:${unixDateTime}>`);
// 	},
// };

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveunixtime')
		.setDescription('Replies with the given time in Unix format!')
		.addIntegerOption((option) => option.setName('day').setDescription('day of the date time').setRequired(true))
		.addIntegerOption((option) => option.setName('month').setDescription('month of the date time').setRequired(true))
		.addIntegerOption((option) => option.setName('year').setDescription('year of the date time').setRequired(true))
		.addIntegerOption((option) => option.setName('hours').setDescription('hours of the date time - defaults to 00'))
		.addIntegerOption((option) => option.setName('minutes').setDescription('minutes of the date time - defaults to 00'))
		.addIntegerOption((option) => option.setName('seconds').setDescription('seconds of the date time - defaults to 00'))
		.addStringOption((option) => option.setName('timezone').setDescription('timezone of the date time - defaults to GMT')),
	async execute(interaction) {
		let year = interaction.options.getInteger('year');
		let month = interaction.options.getInteger('month') - 1;
		let day = interaction.options.getInteger('day');
		const givenHours = interaction.options.getInteger('hours');
		const givenMinutes = interaction.options.getInteger('minutes');
		const givenSeconds = interaction.options.getInteger('seconds');
		const givenTimeZone = interaction.options.getString('timezone');
		if(givenHours) { hours = givenHours; }
		if(givenMinutes) { minutes = givenMinutes; }
		if(givenSeconds) { seconds = givenSeconds; }
		if(givenTimeZone) { timeZone = givenTimeZone; }
		const dateTime = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
		const dateTimeString = dateTime.toLocaleString({timeZone:timeZone});
		let unixDateTime = Math.trunc(Date.parse(dateTimeString)/1000);
		await interaction.reply({content: `This is ${new Intl.DateTimeFormat('en-GB',{ dateStyle: 'full', timeStyle: 'long', timeZone: timeZone}).format(dateTime)} in Unix: ${unixDateTime}`, ephemeral: true});
		await interaction.followUp({content: `<t:${unixDateTime}>`, ephemeral: true});
		await interaction.followUp({content: `${day}/${month+1}/${year}, ${hours}:${minutes}:${seconds} ${timeZone}`, ephemeral: true});
	},
};