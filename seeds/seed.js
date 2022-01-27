const sequelize = require('../config/connection');
// const { User, Post, Comment } = require('../models');

const seedUsers = require('./userData');
const seedPost = require('./postData');
const seedComments = require('./commData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedPost();
  await seedComments();
  process.exit(0);
};

seedDatabase();
