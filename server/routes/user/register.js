const router = require('express').Router
const registerRouter = router()

const {
    getUserInfo
} = require('../../controllers/user/registerController.js')

registerRouter.post('/', getUserInfo)

module.exports = registerRouter