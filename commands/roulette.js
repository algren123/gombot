const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const { CurrencyShop, Users } = require('../dbObjects');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roulette')
    .setDescription(
      'dai 5 RON si iti pica un item. /odds pentru a vedea sansele.'
    ),
  async execute(interaction) {
    if (Client.currency.getBalance(interaction.user.id) < 3) {
      return interaction.reply(
        'Fonduri insuficiente. Ai nevoie de 5 RON sa bagi la ruleta.'
      );
    }
    Client.currency.add(interaction.user.id, -3);

    const items = await CurrencyShop.findAll();
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const oddsArray = [];

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < (items[i].chance * 100).toFixed(1); j++) {
        oddsArray.push(items[i]);
      }
    }

    const user = await Users.findOne({
      where: { user_id: interaction.user.id },
    });

    await user.addItem(oddsArray[randomNumber]);
    return interaction.reply(
      `${interaction.user} a castigat ${oddsArray[randomNumber].name} in valoare de ${oddsArray[randomNumber].cost} RON la ruleta!`
    );
  },
};
