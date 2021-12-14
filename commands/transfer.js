const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('transfer')
    .setDescription('Transfer bancar la vericu')
    .addIntegerOption((option) =>
      option.setName('suma').setDescription('cat sa ii dai').setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName('vericu')
        .setDescription('numele lu vericu')
        .setRequired(true)
    ),
  async execute(interaction) {
    const currentAmount = Client.currency.getBalance(interaction.user.id);
    const transferAmount = interaction.options.getInteger('suma');
    const transferTarget = interaction.options.getUser('vericu');

    if (transferAmount > currentAmount)
      return interaction.reply(
        `${interaction.user} n-ai destui bani, vinde din casa.`
      );

    if (transferAmount <= 0)
      return interaction.reply(`Buna gluma <@${interaction.user}>`);

    Client.currency.add(interaction.user.id, -transferAmount);
    Client.currency.add(transferTarget.id, transferAmount);

    return interaction.reply(
      `${interaction.user} ai dat ${transferAmount} RON la vericu <@${
        transferTarget.id
      }>. Soldul tau e ${Client.currency.getBalance(interaction.user.id)} RON`
    );
  },
};
