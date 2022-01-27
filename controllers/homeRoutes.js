const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', (req, res) => {
//   Post.findAll({
//     attributes: [
//       'id',
//       'title',
//       'post_text',
//       'created_at'
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: Comment,
//         attributes: ['id','comment_text', 'user_id', 'post_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }

//       }
//     ]

//   }).then(postData => {
    
//     // Serialize data so the template can read it
//     const posts = postData.map(post=> post.get({plain:true}));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       posts, 
//       logged_in: req.session.logged_in 
//     });
//   }).catch (err => {
//     res.status(500).json(err);
//   });
// });
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id','comment_text', 'user_id', 'post_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/post/:id', (req, res) => {
//     Post.findOne({
//       where: {
//         id:req.params.id
//       },
//       attributes:[
//         'id',
//         'title',
//         'post_text',
//         'created_at'
//         ],
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//         {
//           model: Comment,
//           attributes: ['id','comment_text', 'user_id', 'post_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         }
//       ]
//     }).then(postData=>{
//         if(!postData){
//           res.status(404).json({message: 'There is no post with that id'});
//         }
//         const post = postData.get({ plain: true });

//         res.render('singlePost', {
//           post,
//           logged_in: req.session.logged_in
//         });
//       }).catch (err=> {
//     res.status(500).json(err);
//   });
// });
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id','comment_text', 'user_id', 'post_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('singlePost', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
