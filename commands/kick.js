const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you want to kick')
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getMember('user');
    user.kick();
    interaction.reply(`${interaction.user} has kicked ${user}`);
  },
};
