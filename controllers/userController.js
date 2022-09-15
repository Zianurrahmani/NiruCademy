const { User } = require(`../models`)
const bcrypt = require('bcryptjs')

class UserController {
    static register(req,res) {
        res.render('register-form')
    }

    static postRegister(req,res) {
        const {name, username, password, email, role, gender} = req.body
        User.create({name, username, password, email, role, gender})
        .then(newUser => {
            res.redirect(`/login`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static loginForm(req,res) {
        const {error} = req.query
        res.render('login-form', {error})
    }

    static postLogin(req,res) {
        const { username, password } = req.body
        User.findOne({
            where: {
                username: username
            }
        })
        .then(user => {
            if(user){
                const validPassword = bcrypt.compareSync(password, user.password)
                if(validPassword) {

                    req.session.userId = user.id
                    req.session.role = user.role

                    return res.render(`profile`, {user})
                } else {
                    const error = 'invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = 'invalid username/password'
                return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
    static logout(req,res) {
        req.session.destroy((err) => {
            if(err) res.send(err)
            else {
                res.redirect('/')
            }
        })
    }
}

module.exports = UserController