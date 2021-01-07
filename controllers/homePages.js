const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');
// GET ALL BLOGS FOR HOMEPAGE
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User, attributes: ['name'],
            },
            ],
        });
        const blogs = blogData.map(blog => blog.get({ plain: true }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//route to view blog by id
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name'] },
                { model: Comment, attributes: ['text'] }

            ],
        });
        const blog = blogData.get({ plain: true });
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
});



router.get('/edit-blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        const blog = blogData.get({ plain: true });
        res.render('editPost', {
            ...blog,
            logged_in: req.session.logged_in
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


