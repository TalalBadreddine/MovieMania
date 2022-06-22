const router = require('express').Router
const registerRouter = router()

const {
    getUserInfo,
    payments,
    makePayment
} = require('../../controllers/user/registerController.js')

registerRouter.post('/', getUserInfo)

registerRouter.get('/payments', payments)

registerRouter.post('/payments', makePayment)

module.exports = registerRouter