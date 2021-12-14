const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop.js')(
  sequelize,
  Sequelize.DataTypes
);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize
  .sync({ force })
  .then(async () => {
    const shop = [
      CurrencyShop.upsert({ name: 'Gombot', cost: 1, chance: 0.23 }),
      CurrencyShop.upsert({ name: 'Pruna', cost: 2, chance: 0.26 }),
      CurrencyShop.upsert({ name: 'Bere', cost: 3, chance: 0.2 }),
      CurrencyShop.upsert({
        name: 'Shaorma',
        cost: 4,
        chance: 0.08,
      }),
      CurrencyShop.upsert({ name: 'Tuica', cost: 5, chance: 0.08 }),
      CurrencyShop.upsert({ name: 'Palinca', cost: 6, chance: 0.07 }),
      CurrencyShop.upsert({ name: 'Goulash', cost: 10, chance: 0.05 }),
      CurrencyShop.upsert({
        name: 'Autograf Stunt3r',
        cost: 15,
        chance: 0.02,
      }),
      CurrencyShop.upsert({ name: 'Pula-n cur', cost: 1000, chance: 0.01 }),
    ];

    await Promise.all(shop);
    console.log('Database synced');

    sequelize.close();
  })
  .catch(console.error);
