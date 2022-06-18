const extensions = require('../../helper/extensions.js')
const userSchema = require('../../models/userSchema.js')

const getUserInfo = async (req, res) => {
    const requestBody = req.body
   const user = {
    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    age: requestBody.age,
    email: requestBody.email,
    password: requestBody.password

   }
  await extensions.addToDb(userSchema, user)

}

module.exports = {
    getUserInfo
}