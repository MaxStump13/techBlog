const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({
      where: {
        user_id: req.session.user_id
      },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((postData) => {
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('dashboard', {
        posts,
        logged_in: true,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/create',withAuth, (req,res)=>{
    res.render('newPost');
});


router.get('/update/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: 'There is no post with that id' });
      }
      const post = postData.get({ plain: true });

      res.render('updatePost', {
        post,
        logged_in: true,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
