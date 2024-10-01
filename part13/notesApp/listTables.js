const { Sequelize, QueryTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const listTables = async () => {
  try {
    // Authenticate the connection
    await sequelize.authenticate();

    // Query to list all the tables in the database
    const tables = await sequelize.query(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = 'public'
       AND table_type = 'BASE TABLE';`,
      { type: QueryTypes.SELECT }
    );

    // Log the list of tables
    console.log('Tables in the database:', tables);

    // Optional: Close the connection after query
    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database or fetch tables:', error);
  }
};

// Call the function
listTables();