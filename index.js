const fs = require('fs');
const Op = require('sequelize');
const { Client, Collection, Formatters, Intents } = require('discord.js');
const { token } = require('./botconfig.json');
const { Users, CurrencyShop } = require('./dbObjects.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
Client.client = client;
Client.currency = new Collection();

// Add or remove money
Reflect.defineProperty(Client.currency, 'add', {
  value: async function add(id, amount) {
    const user = Client.currency.get(id);

    if (user) {
      user.balance += Number(amount);
      return user.save();
    }

    const newUser = await Users.create({ user_id: id, balance: amount });
    Client.currency.set(id, newUser);
  },
});

// Display current balance
Reflect.defineProperty(Client.currency, 'getBalance', {
  value: function getBalance(id) {
    const user = Client.currency.get(id);
    return user ? user.balance : 0;
  },
});

client.once('ready', async () => {
  const storedBalances = await Users.findAll();
  storedBalances.forEach((b) => Client.currency.set(b.user_id, b));
  console.log(
    `${client.user.username} is online on ${client.guilds.cache.size} servers!`
  );
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  Client.currency.add(message.author.id, 1);
});

// Commands [START]
client.commands = new Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(token);
