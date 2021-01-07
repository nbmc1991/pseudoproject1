const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const bcrypt = require('bcrypt');

// router.get('/', async (req, res) => {
//     //find all users
//     const userData = await User.findAll({ include: [{ model: Blog }] });
//     return res.json(userData);
// });

router.post("/", async (req, res) => {
    try {
        //User model
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        console.log('HAPPY HAPPY NEW YEAR')
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }

        });
        if (!userData) {
            console.log('im here')
            res.status(400).json({
                message: 'Your email or password is incorrect, please try again'
            });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Your email or password is incorrect, please try again' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Welcome! You are now logged in!' });
        });
    } catch (err) {

        res.status(400).json(err);

    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});



module.exports = router;