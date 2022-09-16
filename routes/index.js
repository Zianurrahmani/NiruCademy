const Controller = require('../controllers')
const CourseController = require('../controllers/courseController')
const UserController = require('../controllers/userController')
const router = require('express').Router()

//landing page
router.get(`/`, Controller.LandingPage)

// //user interface
router.get(`/register`, UserController.register)
router.post(`/register`, UserController.postRegister)

router.get(`/login`, UserController.loginForm)
router.post(`/login`, UserController.postLogin)

//middleware
router.use(function(req, res, next) {
    // console.log(req.session)
    if(!req.session.userId) {
        const error = 'please login first!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})
const restrict = function(req, res, next) {
    if(req.session.role !== 'admin') {
        const error = 'you have no accsess'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}

router.get('/logout', UserController.logout)

//course
router.get(`/home`, CourseController.home)
router.get(`/course/add`, restrict, CourseController.addCourse)
router.post(`/course/add`, restrict, CourseController.createCourse)
router.get(`/course/:id`, CourseController.courseDetail)
router.get(`/course/:id/add-video`, restrict, CourseController.addVideo)
router.post(`/course/:id/add-video`, restrict, CourseController.createVideo)
router.get(`/course/:id/edit`, restrict,  CourseController.editCourse)
router.post(`/course/:id/edit`, restrict, CourseController.updateCourse)
router.get(`/course/:id/delete`, restrict, CourseController.deleteCourse)

module.exports = router