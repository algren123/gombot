const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users } = require('../dbObjects.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('Arati tot ce ai'),
  async execute(interaction) {
    const target = interaction.options.getUser('user') ?? interaction.user;
    const user = await Users.findOne({ where: { user_id: target.id } });
    if (!user) return interaction.reply('Userul nu e inregistrat. Fa bani.');
    const items = await user.getItems();

    if (!items.length) return interaction.reply(`<@${target.id}> e chel`);

    return interaction.reply(
      `<@${target.id}> are ${items
        .map((i) => `${i.amount} ${i.item.name}`)
        .join(', ')}`
    );
  },
};
