const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Formatters } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('arata primii 10 interlopi'),
  async execute(interaction) {
    return interaction.reply(
      `Top interlopi:\n${Formatters.codeBlock(
        Client.currency
          .sort((a, b) => b.balance - a.balance)
          .filter((user) => interaction.client.users.cache.get(user.user_id))
          .first(10)
          .map(
            (user, position) =>
              `(${position + 1}) ${
                interaction.client.users.cache.get(user.user_id).tag
              } : ${user.balance} RON`
          )
          .join('\n')
      )}`
    );
  },
};
