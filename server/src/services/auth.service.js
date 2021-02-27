const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userTable = db('users');

const createUser = async (data) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  const newUsers = await userTable.insert({
    ...data,
    password: hashedPassword
  });
  return newUsers[0];
};

const getUser = async (val, col = 'id') => {
  const users = await userTable.select().where({ [col]: val });
  return users[0];
};

const doesPasswordMatch = (rawPass, encPass) => {
  return bcrypt.compare(rawPass, encPass);
};

const encodeJWT = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

const decodeJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createUser,
  getUser,
  doesPasswordMatch,
  encodeJWT,
  decodeJWT
};
