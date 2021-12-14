const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gamble')
    .setDescription('alba neagra')
    .addIntegerOption((option) =>
      option
        .setName('suma')
        .setDescription('Suma data la pariuri')
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger('suma');

    if (amount > Client.currency.getBalance(interaction.user.id))
      return interaction.reply('Nu ai fonduri necesare.');

    const roll = Math.random() < 0.5;
    if (roll) {
      Client.currency.add(interaction.user.id, amount * 2);
      interaction.reply(
        `Ai castigat ${amount * 2} RON. Acum ai ${Client.currency.getBalance(
          interaction.user.id
        )} RON`
      );
    } else {
      Client.currency.add(interaction.user.id, -amount);
      interaction.reply(
        `Ai pierdut ${amount} RON. Acum ai ${Client.currency.getBalance(
          interaction.user.id
        )} RON`
      );
    }
  },
};
