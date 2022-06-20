const extensions = require('../../helper/extensions.js')
const userSchema = require('../../models/userSchema.js')

const getUserInfo = async (req, res, next) => {
    const requestBody = req.body
    let userExist 

    extensions.userAlreadyExist(requestBody.email).then( async (result) => {
        if(result){
            res.send("User Already Exist")
        }else{
            const user = {
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
                age: requestBody.age,
                email: requestBody.email,
                password: extensions.hashString(requestBody.password)
               }         
              await extensions.addToDb(userSchema, user)
        }
    })
}

module.exports = {
    getUserInfo
}