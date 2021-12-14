const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const { Op } = require('sequelize');
const { CurrencyShop, Users, UserItems } = require('../dbObjects');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sell')
    .setDescription('amaneteaza item')
    .addStringOption((option) =>
      option
        .setName('item')
        .setDescription('itemul pe care vrei sa il amanetezi')
        .setRequired(true)
    ),
  async execute(interaction) {
    const itemName = interaction.options.getString('item');
    const user = await Users.findOne({
      where: { user_id: interaction.user.id },
    });

    if (!user) return interaction.reply('Userul nu e inregistrat. Fa bani.');

    // Find the item in the shop
    const item = await CurrencyShop.findOne({
      where: { name: { [Op.like]: itemName } },
    });

    if (!item) return interaction.reply('Acest item nu exista.');

    // Get the user's inventory
    let userInventory = await user.getItems();

    // Check if the user owns at least one of the items
    userInventory = userInventory.filter((userItem) => {
      return userItem.item.id === item.id;
    });

    if (userInventory.length < 1) {
      interaction.reply(`Nu detii ${item.name}`);
    } else {
      Client.currency.add(interaction.user.id, item.cost);
      await user.sellItem(item);
      interaction.reply(
        `Ai vandut ${item.name} pe ${
          item.cost
        } RON. Acum ai ${Client.currency.getBalance(interaction.user.id)} RON`
      );
    }
  },
};
