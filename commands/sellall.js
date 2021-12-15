const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users } = require('../dbObjects');
const { Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sellall')
    .setDescription('Amaneteaza tot inventarul'),
  async execute(interaction) {
    const user = await Users.findOne({
      where: { user_id: interaction.user.id },
    });

    let userInventory = await user.getItems();
    if (userInventory < 1) return interaction.reply('Nu detii niciun item.');

    let totalAmount = 0;

    for (item of userInventory) {
      Client.currency.add(interaction.user.id, item.dataValues.item.cost);
      totalAmount += item.dataValues.item.cost;
      await user.sellItem(item.dataValues.item);
    }

    interaction.reply(`Toate itemele au fost vandute pe ${totalAmount} RON`);
  },
};
