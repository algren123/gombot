const { SlashCommandBuilder } = require('@discordjs/builders');
const { CurrencyShop } = require('../dbObjects');
const { Formatters } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('odds')
    .setDescription('Vezi sansele la ruleta'),
  async execute(interaction) {
    const items = await CurrencyShop.findAll();
    return interaction.reply(
      `Sansele itemelor sa pice la ruleta: ${Formatters.codeBlock(
        items.map((i) => `${i.name}: ${(i.chance * 100).toFixed()}%`).join('\n')
      )}`
    );
  },
};
