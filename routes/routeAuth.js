const router = require('express').Router()
const Controller = require('../controllers/controllerAuth')
const loginCheck = require('../middleware/loginCheck')

//login
router.get('/', Controller.formLogin)
router.post('/', Controller.postLogin)

//register
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)

//forgot password
router.get('/forgotPassword', Controller.forgotPassword)
router.post('/forgotPassword', Controller.postForgotPassword)

//reset password
router.get('/resetPassword', Controller.resetPassword)
router.post('/resetPassword', Controller.postResetPassword)


router.use(loginCheck)

//HOME (player)
// router.get('/', Controller.home)

//logout
router.get('/logout', Controller.logout)


module.exports = router