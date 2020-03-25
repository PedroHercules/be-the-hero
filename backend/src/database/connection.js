const knex = require('knex');
const config = require('../../knexfile');

const connection  = knex(config.development);//Irá criar a conexão de desenvolvimento, que está no arquivo knexfile.js

module.exports = connection;//Irá exportar a conexão cm o BD