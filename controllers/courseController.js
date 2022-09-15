const { Category, Course, Video } = require(`../models`)

class CourseController {
    static home(req,res) {
        Course.findAll({
            include: Category
        })
        .then(courses => {
            res.render('courseList', {courses})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static addCourse(req,res) {
        Category.findAll()
        .then(categories => {
            // res.send(categories)
            res.render('add-course', {categories})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static createCourse(req,res) {
        const {name, description, duration, price, CategoryId} = req.body
        Course.create({name, description, duration, price, CategoryId})
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => {
            res.send(err)
        })
    }
}
module.exports = CourseController