const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you want to unban')
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    interaction.guild.members.unban(user)?.value;
    interaction.reply(`${interaction.user} has unbanned ${user}`);
  },
};
