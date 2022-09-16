const { Op } = require("sequelize")
const { Category, Course, Video, User } = require(`../models`)

class CourseController {
    static home(req,res) {
        const {search} = req.query
        let option = {
            include : [Category,User],
            where: {}
        }
        if(search) {
            option.where.name = {
                [Op.iLike]: `%${search}%`
            }
        }
        Course.findAll(option)
        .then(courses => {
            // res.send(courses)
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
    static courseDetail(req,res) {
        const id = +req.params.id
        const option = {
            include: [Video,User]
        }
        Course.findByPk(+id, option)
        .then(courses => {
            // res.send(courses)
            res.render('startCourse',{courses})
        })
        .catch(err => {
            res.send('err')
        })
    }
    
    static addVideo(req,res) {
        const id = +req.params.id
        Course.findByPk(id)
        .then(courses => {
            // res.send(courses)
            res.render('add-video', {courses})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static createVideo(req,res) {
        const {link} = req.body
        const CourseId = +req.params.id
        Video.create({CourseId, link})
        .then(() => {
            res.redirect(`/course/${CourseId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editCourse(req,res) {
        const id = +req.params.id
        Course.findOne({
            include: [Video, Category],
            where: {
                id: id
            }
        })
        .then(courses => {
            // res.send(courses)
            res.render('edit-course', {courses})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateCourse(req,res) {
        const id = +req.params.id
        const {name, description, duration, price, CategoryId} = req.body
        Course.update({name, description, duration, price, CategoryId}, {
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect('/home')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteCourse(req,res) {
        const id = +req.params.id
        Video.destroy({
            where: {
                CourseId: id
            }
        })
        .then(() => {
            Course.destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                res.redirect('/home')
            })
        })
        .catch(err => {
            res.render(err)
        })
    }
}
module.exports = CourseController