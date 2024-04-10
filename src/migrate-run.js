const Sequelize = require("sequelize");
const { Umzug, SequelizeStorage } = require('umzug');

function runMigrations(config, dbName) {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      dialect: config.dialect
    },
  );

  const umzug = new Umzug({
    migrations: { glob: "./migrations/*.js" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  umzug.up().then(() => {
    console.log(`All migrations performed successfully}`);
  }).catch((err) => {
    console.log(`Migration error on ${dbName}:`, err);
  });
}

const CONFIG = require('./config');

runMigrations(CONFIG.mysql);