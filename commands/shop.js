const { SlashCommandBuilder } = require('@discordjs/builders');
const { Formatters } = require('discord.js');
const { CurrencyShop, Users } = require('../dbObjects');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Uita-te in vitrina magazinului'),
  async execute(interaction) {
    const items = await CurrencyShop.findAll();
    return interaction.reply(
      `Magazia are asa: ${Formatters.codeBlock(
        items.map((i) => `${i.name}: ${i.cost} RON`).join('\n')
      )}`
    );
  },
};
