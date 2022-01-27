const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComm = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.session.post_id,
    });

    res.status(200).json(newComm);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        post_id: req.session.post_id,
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
