const {Comment} = require('../models');

const commData = [
  {
    comment_text: 'nice post',
    user_id: 1,
    post_id: 3,
  },
  {
    comment_text: 'interesting post',
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: 'really cool',
    user_id: 3,
    post_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commData);

module.exports = seedComments;