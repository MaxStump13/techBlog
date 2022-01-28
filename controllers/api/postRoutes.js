const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      attributes:['id, title', 'post_text', 'user_id', 'created_at'],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: ['id', "comment_text", "user_id"]
        }
      ]
    });res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
    

router.get('/:id', async (req, res) => {
  // find user by its id
  console.log('post route is running');
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes:[ 'id','title', 'post_text', 'user_id','created_at'],
      include: [{ model: Comment, as:"comments", attributes: ["id", "comment_text","user_id"] }]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res)=>{
  try{
    const updatedPost = await Post.update({
      title: req.body.title,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedPost);
  }catch (err) {
  res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
