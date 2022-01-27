const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData');
const postData = require('./postData.json');
const commData = require('./commData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const comment of commData) {
    await Comment.create({
      ...comment,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
