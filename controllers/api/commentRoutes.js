const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const commentData = await Comment.findAll({
        include: [{ model: User }, { model: Blog }],
    });
    return res.json(commentData);
});

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.findOne({ where: { title: req.body.title } })
        const newComment = await Comment.create({
            text: req.body.comment,
            blog_id: blog.id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;


