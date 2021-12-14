const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you want to ban')
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    interaction.guild.members.ban(user);
    interaction.reply(`${interaction.user} has banned ${user}`);
  },
};
