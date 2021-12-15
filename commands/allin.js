const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('allin')
    .setDescription('pariaza tot ce ai la alba neagra'),
  async execute(interaction) {
    const userBalance = Client.currency.getBalance(interaction.user.id);
    if (userBalance < 1) return interaction.reply('Nu ai niciun RON.');

    Client.currency.add(interaction.user.id, -userBalance);
    const roll = Math.random() < 0.5;

    if (roll) {
      Client.currency.add(interaction.user.id, userBalance * 2);
      interaction.reply(
        `Ti-ai dublat contu. Acum ai ${Client.currency.getBalance(
          interaction.user.id
        )} RON`
      );
    } else {
      interaction.reply(`Ai dat faliment.`);
    }
  },
};
