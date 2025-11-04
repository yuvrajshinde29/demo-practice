const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE ,
  process.env.DB_USERNAME ,
  process.env.DB_PASSWORD ,
  {
    host: process.env.DB_HOST ,
    dialect: process.env.DB_DIALECT ,
    logging: false,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("connection established");
  } catch (error) {
    console.log("DB connection Error: ", error);
  }
}
testConnection(); 

module.exports = sequelize;
