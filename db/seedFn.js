const {sequelize} = require('./db');
const {Bird} = require('./');
const birds = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Bird.bulkCreate(birds);
};

module.exports = seed;
