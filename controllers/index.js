const router = require('express').Router();
const apiRoutes = require('./api');
const homePages = require('./homePages');

router.use('/', homePages);
router.use('/api', apiRoutes);



module.exports = router;
