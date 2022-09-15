const Controller = require('../controllers')
const CourseController = require('../controllers/courseController')
const UserController = require('../controllers/userController')
const router = require('express').Router()

//landing page
router.get(`/`, Controller.LandingPage)

//user interface
router.get(`/register`, UserController.register)
router.get(`/login`, UserController.loginForm)

//course
router.get(`/home`, CourseController.home)
router.get(`/course/add`, CourseController.addCourse)
router.post(`/course/add`, CourseController.createCourse)

module.exports = router