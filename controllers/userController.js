const { User } = require(`../models`)

class UserController {
    static register(req,res) {
        res.render('register-form')
    }
    static loginForm(req,res) {
        res.render('login-form')
    }
    static createUser(req,res) {
        const {firstName,lastName,email,username,password,gender} = req.body
        User.create({firstName,lastName,email,username,password,gender})

    }
}

module.exports = UserController