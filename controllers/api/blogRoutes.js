const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {

//     let blogData = await Blog.findAll({
//         include: [{ model: User }, { model: Comment }],
//     });
//     return res.json(blogData);
// });


router.route("/test").post((req, res) => {
    res.json({ success: true })
})

router.post('/', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});







module.exports = router;


