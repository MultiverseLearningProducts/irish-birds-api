const {Sequelize, sequelize} = require('./db');

const Bird = sequelize.define('bird', {
  name: Sequelize.STRING,
  latin: Sequelize.STRING,
  identification: Sequelize.STRING,
  conservation: Sequelize.STRING,
  where_to_see: Sequelize.STRING,
});

module.exports = { Bird };
