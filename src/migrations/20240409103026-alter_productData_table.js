const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.addColumn(
    'productData', // Replace with your actual table name
    'isNotFound',
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  );
}

async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('productData', 'isNotFound');
}

module.exports = { up, down };