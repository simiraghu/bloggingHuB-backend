const router = require('express').Router()
const User_routes = require('../routes/User_routes');
const Blog_routes = require('../routes/Blog_routes');

router.use('/user', User_routes)
router.use('/blog', Blog_routes)

module.exports = router