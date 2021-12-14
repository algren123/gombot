const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Verifica fondurile europene'),
  async execute(interaction) {
    const target = interaction.options.getUser('user') ?? interaction.user;
    return interaction.reply(
      `<@${target.id}> are ${Client.currency.getBalance(target.id)} RON`
    );
  },
};
