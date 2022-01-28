const router = require('express').Router();
const { User, Post,Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const commData = await Comment.findAll({
      attributes:['id', 'comment_text','user_id', 'post_id', 'created_at'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json(commData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find user by its id
  console.log('comment route is running');
  try {
    const commData = await Comment.findAll(req.params.id, {
      attributes: ['id', 'comment_text', 'user_id', 'post_id','created_at'],  
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json(commData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComm = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(200).json(newComm);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedComm = await Comment.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedComm);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commData = await Comment.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!commData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
