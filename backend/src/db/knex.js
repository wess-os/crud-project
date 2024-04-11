const dotenv = require('dotenv');

dotenv.config();

const knex = require('knex')({
    client: 'mysql', // ou 'mysql', 'sqlite3', etc., dependendo do seu banco de dados
    connection: {
       host: process.env.HOST,
       user: process.env.USER,
       password: process.env.PASSWORD,
       database: process.env.DATABASE
    }
});
   
module.exports = knex;