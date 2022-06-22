const router = require('express').Router
const registerRouter = router()

const {
    getUserInfo,
    payments,
    makePayment
} = require('../../controllers/user/registerController.js')

registerRouter.post('/', getUserInfo)

registerRouter.get('/payment', payments)

registerRouter.post('/payment', makePayment)

module.exports = registerRouter