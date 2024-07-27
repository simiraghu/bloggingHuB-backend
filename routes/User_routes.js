const router = require('express').Router()
const verify = require('../controllers/auth/verify');
const Change_password = require('../controllers/user/Change_password');
const Create_user = require('../controllers/user/Create_user');
const Delete_user = require('../controllers/user/Delete_user');
const get_user_by_id = require('../controllers/user/get_user_by_id');
const Login_user = require('../controllers/user/Login_user');
const auth = require('../middleware/Auth')

router.post('/create_user', Create_user)
router.post('/login_user', Login_user)
router.get('/get_user_by_id',auth, get_user_by_id)
router.put('/change_password',auth, Change_password)
router.put('/delete_user',auth, Delete_user)
router.get('/verify', verify)

module.exports = router