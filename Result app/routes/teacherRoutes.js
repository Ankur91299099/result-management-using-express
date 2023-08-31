var express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const {redirectToLoggedinUserOnly} =require('../middleware/auth')

router.get('/login',teacherController.teacher_login_get);
router.post('/login',teacherController.teacher_login_post);
router.get('/viewall',redirectToLoggedinUserOnly,teacherController.teacher_viewall_get);
router.get('/edit/:id',redirectToLoggedinUserOnly,teacherController.teacher_edit_get);
router.post('/edit/:id',redirectToLoggedinUserOnly,teacherController.teacher_edit_post);
router.get('/delete/:id',redirectToLoggedinUserOnly,teacherController.teacher_delete_get);
router.get('/option',redirectToLoggedinUserOnly,teacherController.teacher_option_get);
router.post('/add',redirectToLoggedinUserOnly,teacherController.teacher_add_post);
router.get('/add',redirectToLoggedinUserOnly,teacherController.teacher_add_get);

module.exports = router;