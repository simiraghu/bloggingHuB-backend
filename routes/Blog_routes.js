const router = require('express').Router()
const Create_blog = require('../controllers/blogs/Create_blogs');
const auth = require('../middleware/Auth')
const get_all_blogs = require('../controllers/blogs/get_all_blogs');
const get_blogs_by_userid = require('../controllers/blogs/get_blogs_by_userid');
const get_blog_by_id = require('../controllers/blogs/get_blog_by_id');
const update_blog = require('../controllers/blogs/update_blog');
const delete_blog = require('../controllers/blogs/delete_blog');
const Search_blogs = require('../controllers/blogs/Search_blogs');

router.post('/create_blog', auth, Create_blog)
router.get('/get_all_blogs', auth, get_all_blogs)
router.get('/get_blogs_by_userid', auth, get_blogs_by_userid)
router.get('/get_blog_by_id/:id', auth, get_blog_by_id)
router.put('/update_blog/:id', auth, update_blog)
router.put('/delete_blog/:id', auth, delete_blog)
router.get('/search_blog', auth, Search_blogs)

module.exports = router