const Sequelize = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('productData', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    productId: {
      allowNull:false,
      type: Sequelize.INTEGER
    },
    isprocessed:{
     type:Sequelize.BOOLEAN,
     defaultValue:false,
    },
    error: {
      defaultValue:null,
      type: Sequelize.TEXT('long'),
    },
    date: {
      allowNull: false,
      type: Sequelize.DATE,
    }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('productData');
}
module.exports = { up, down };

// first_name
// city
// country_code
// last_name
// address1