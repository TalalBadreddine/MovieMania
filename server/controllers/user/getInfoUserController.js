const extensions = require('../../helper/extensions.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const userSchema = require('../../models/userSchema.js')
const manageBundleUserSchema = require('../../models/manageBundleUserSchema.js')
const userInfoRouter = require('../../routes/user/getInfoRouter.js')
dotenv.config({path: __dirname + '/../../../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort,
    sessionSecret,
    jwtSecret
} = process.env

// async function getInfoForUserById(userId){
//     try{
//         const results = manageBundleUserSchema.find({
//             bundleId: bundlesId
//         },{
//             EndBundleDate: 1,
//             NumberOfMoviesLeft: 1
//         })

//          return results[results.length - 1]
//      }
//     catch(error){
//          console.log(error.message)
//      }
//  }

const getInfoUser = async (req , res) => {

    try {

        // const userInfo = session.currentUserInfo
        // const userId = userInfo._id
        // const bundlesId = userInfo.bundlesId

        // let MBAU = session.currentManageBundleAndUser
        let MBAU = [{EndBundleDate:'23/6/2022'}]
        let availableBundle = []

        for(let i = 0 ; i < MBAU.length ; i++) {
            let getCurrentDate = new Date();
            let getBundleDate = MBAU[i].EndBundleDate;
            console.log(getCurrentDate)
            console.log(getBundleDate)
                if(moment(getBundleDate).isAfter(getCurrentDate) == true)
                {
                    console.log(moment('getBundleDate').isAfter('getCurrentDate'))
                    availableBundle.push(MBAU[i])
                }
            }
        
        res.send(availableBundle)
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = {getInfoUser}








