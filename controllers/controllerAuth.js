const { Player, Game, PlayGame } = require('../models')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(3)
const nodemailer = require('nodemailer')
const tes = 'tes aja'

class Controller {
    static home(req, res) {
        res.render(`home`)
    }
    
    static register(req, res) {
        let errors = req.query.errors
        res.render('register', { errors })
    }

    static postRegister(req, res) {
        let { username, email, password, favourite_genre, gender } = req.body
        Player.create({ username, email, password, favourite_genre, gender })
        .then( () => {
            req.session.loginStatus = true
            res.redirect('/')
        })
        .catch(err => {
            let errors = err.errors.map(el => el.message)
            if (!gender) errors += `, gender harus di isi`
            res.redirect(`/register?errors=${errors}`)
        })
    }
    
    static formLogin(req, res) {
        let errors = req.query.errors
        res.render('login', { title : 'Login', errors })
    }

    static postLogin(req, res) {
        let { username, password } = req.body
        if (!username || !password) res.redirect(`/?errors=Lengkapi data terlebih dahulu`) 
        else {
            
            Player.findOne( { where : {username : username }})
            .then(data => {
                if (!data) {
                    res.redirect(`/?errors=username atau password salah`)
                } else {
                    
                    let compare = bcrypt.compareSync(password, data.password)
                    if (compare === true) {
                        req.session.loginStatus = true
                        req.session.playerId = data.id
                        console.log(req.session.playerId)
                        let playerId = req.session.playerId
                        res.redirect(`/players/${playerId}`)
                    } else {
                        req.session.loginStatus = false
                        res.redirect('/?errors=username atau password salah')
                    }
                }
            })
            .catch(err => res.send(err))
        }
    }

    static logout(req, res) {
        req.session.loginStatus = false
        res.redirect('/')
    }

    static forgotPassword(req, res) {
        let errors = req.query.errors
        res.render('forgotPassword', { errors })
    }

    static postForgotPassword(req, res) {
        let { email }= req.body
        Player.findOne({where: { email:email}})
        .then( data => {

            if (!data) {
            res.redirect(`/forgotPassword?errors=Email tidak terdaftar`)
            } else {

                let link = `http://localhost:3000/resetPassword?email=${email}`

                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, 
                    auth: {
                    user: 'sanjungliu@gmail.com', 
                    pass: 'ucdmmrzuwqqhxwfb',
                    },
                });

                let info =  transporter.sendMail({
                    from: '"GameBle, Your Favourite Game Forum 👻" <sanjungliu@gmail.com>', 
                    to: email, 
                    subject: "Reset Password Link ✔", 
                    text: `Silahkan klik link ini untuk reset password Anda ${link}`, 
                    html: `<b>Silahkan klik link ini untuk reset password akun GameBle kamu <a href="${link}">Saya mau ubah password saya</a>
                    </b>`, 
                });
                res.redirect('/?errors=Link telah terkirim. Silahkan cek email Anda')
            }
        } )
        .catch( err => {
            res.redirect(`/forgotPassword?errors=Email tidak terdaftar`)
        } )
    }

    static resetPassword(req, res) {
        let errors = req.query.errors
        res.render('resetPassword')
    }

    static postResetPassword(req, res) {
        let { password } = req.body
        password = bcrypt.hashSync(password, salt)
        let email = req.query.email
        Player.update({ password }, {where : {email:email}})
        .then( () => res.redirect('/'))
        .catch(err => res.send(err))
    }
}

module.exports = Controller