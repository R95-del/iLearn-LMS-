const { Router} = require('express');
const authcontroller = require('../controller/authcontroller');

const router = Router();

router.get('/signup',authcontroller.signup_get);
router.post('/signup',authcontroller.signup_post);
router.get('/login',authcontroller.login_get);
router.post('/login',authcontroller.login_post);
router.get('/logout',authcontroller.logout_get);
router.get('/tasks',authcontroller.task_get);
router.post('/add',authcontroller.add_task_post);
router.post('/delete',authcontroller.delete_task_post);
router.post('/update',authcontroller.update_task_post);





module.exports = router;