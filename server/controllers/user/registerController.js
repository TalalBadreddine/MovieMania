const extensions = require('../../helper/extensions.js')
const userSchema = require('../../models/userSchema.js')
const session = require('express-session')
const dotenv = require('dotenv')

dotenv.config({path: "../../.env"})

const {
    stripPublishKey,
    stripSecretKey
} = process.env

const stripe = require('stripe')(stripSecretKey)

const getUserInfo = async (req, res, next) => {
  const requestBody = req.body

  const user = {

    firstName: requestBody.firstName,
    lastName: requestBody.lastName,
    age: requestBody.age,
    email: requestBody.email.trim(),
    password: extensions.hashString(requestBody.password)

   }      

    session.currentUserInfo = user
    let userExist 

    extensions.userAlreadyExist(requestBody.email).then( async (result) => {
        if(result){
            res.send("User Already Exist")
        }else{
              
              await extensions.addToDb(userSchema, user)
              return res.redirect('/login')
        }
    })
}


const payments = (req, res, next) => {
 let userInfo = session.currentUserInfo

    if(userInfo == undefined){
      console.log("get out")
      res.redirect('/login')
      return
    }

    let testBundle = [ 
        {
        bundleName: "FirstBundl",
        price: 10,
        limit: 20
    }
]
    res.render('payments', {data: testBundle})
    
}


const makePayment = async (req, res) => {
    try {
        let bundleToBuy = {
            price_data: {
              currency: "usd",
              product_data: {
                name: req.body.items.bundleName,
              },
              unit_amount: parseInt(req.body.items.bundlePrice) * 100,
            },
            quantity: 1,
          }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [bundleToBuy],
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
        })
  
        res.json({ url: session.url})
        
      } catch (e) {
        res.status(500).json({ error: e.message })
      }

}

module.exports = {
    getUserInfo,
    makePayment,
    payments
}