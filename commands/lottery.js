const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, User } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lottery')
    .setDescription('5 RON sa bagi un numar lotto prono 6/49')
    .addIntegerOption((option) =>
      option
        .setName('number')
        .setDescription('numarul norocos')
        .setRequired(true)
    ),
  async execute(interaction) {
    if (Client.currency.getBalance(interaction.user.id) < 5)
      return interaction.reply('Nu ai fonduri suficiente. Biletul este 5 RON.');

    Client.currency.add(interaction.user.id, -5);

    const number = interaction.options.getInteger('number');

    if (number > 500 || number < 1)
      return interaction.reply('Alege un numar intre 1 si 500');

    const lottoNumber = (Math.random() * 500 + 1).toFixed();

    if (number === lottoNumber) {
      Client.currency.add(interaction.user.id, 10000);
      interaction.reply(
        `${interaction.user} A CASTIGAT LOTO PRONO 6/49 SI 10.000 RON!!`
      );
    } else {
      interaction.reply(`Numarul tras a fost ${lottoNumber}. Mai incearca.`);
    }
  },
};
