const knex = require('knex');
const dbConfig = require('./knexfile');

const db = knex(dbConfig);

module.exports = db;
