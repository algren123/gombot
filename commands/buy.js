const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const { Op } = require('sequelize');
const { CurrencyShop, Users } = require('../dbObjects');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Cumpara ceva de la magazin')
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('itemu care vrei sa cumperi')
        .setRequired(true)
    ),
  async execute(interaction) {
    const itemName = interaction.options.getString('item');
    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: itemName } },
    });

    if (!item) return interaction.reply('N-avem');

    if (item.cost > Client.currency.getBalance(interaction.user.id))
      return interaction.reply(
        `Tu ai ${Client.currency.getBalance(interaction.user.id)} RON si ${
          item.name
        } costa ${item.cost} RON cumetre`
      );

    const user = await Users.findOne({
      where: { user_id: interaction.user.id },
    });

    Client.currency.add(interaction.user.id, -item.cost);
    await user.addItem(item);

    return interaction.reply(
      `<@${interaction.user.id}> a achizitionat: ${item.name}`
    );
  },
};
