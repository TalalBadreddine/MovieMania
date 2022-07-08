const express = require('express')
const moviesRouter = require('../routes/admin/manageMoviesRoute.js');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const extensions = require('../helper/extensions.js')
const multer = require("multer");
const path = require('path')
const bundleRouter = require('../routes/admin/manageBundlesRoute.js')
const userRegisterRouter = require('../routes/user/register.js')
const getMoviesRouter = require('../routes/user/getMoviesRouter.js')
const manageUsersRouter = require('../routes/admin/manageUsersRoute.js');
const displayDashBoardInfo = require('../controllers/admin/dashBoardController')
const getLikedMoviesRouter = require('../routes/user/getLikedMoviesRouter.js')
const  loginRouter = require('../routes/loginRoute.js')
const userSchema = require('../models/userSchema')
const {validateUser,validateAdmin } = require('../middleware/authMiddleware.js')
const upload = multer();

dotenv.config({path: __dirname + '/../../.env'})

const {
    dbPort,
    dbHost,
    dbName,
    serverPort,
    sessionSecret,
    jwtSecret,
    movieApi,
    apiKey
} = process.env

async function connectDB(){
    const uri = `mongodb+srv://talalbadreddine:Ta07762909@mycluster.bnshd.mongodb.net/?retryWrites=true&w=majority`
    await mongoose.connect(uri)
    console.log("Connected to db!")
}

async function startServer(){
    try{
        await connectDB()

        const app = express()

        app.use(cookieParser())

        app.use(express.json())

        app.use(bodyParser.json())

        upload.array('pictures', 1)

        app.use(bodyParser.urlencoded({ extended: true }))

        app.set('views', path.join(__dirname, '/../views/'))

        app.set('view engine', 'ejs')

        app.use(session({
            secret: sessionSecret,
            resave: false,
            saveUninitialized: false
        }))

        // Insert Routest here

        app.get('/success', (req, res) => {
          
            let currentUserId = req.cookies.uuid
            let userExist = req.session[currentUserId]
            
            if(userExist){
                let currentUser = req.session[currentUserId][0]

                let user = {
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    password: currentUser.password,
                    age: currentUser.age,
                    email: currentUser.email,
                    bundlesId: currentUser.bundlesId
                  }

            extensions.userAlreadyExist(user.email).then( async (result) => {
                if(result){
                    await extensions.existingUserSubscribeToBundle(user.email, user.bundlesId[ user.bundlesId.length - 1])
                    res.json("done")

                }else{
                      await extensions.addToDb(userSchema, user)
                      await extensions.newUserSubscribeToBundle(user.email, user.bundlesId[ user.bundlesId.length - 1])
                      res.json('done')
                } })
      
         }else {
            res.json("forbidden")
         }
         
        })
            

        app.get('/cancel', (req, res) => {
            res.render('cancel.ejs')
        })

        app.use('/login', loginRouter)

        app.use('/register', userRegisterRouter)

        app.use('/admin/dashboard', validateAdmin, displayDashBoardInfo)

        app.use('/user/Movies', validateUser, getMoviesRouter)

        app.use('/admin/manageUsers', validateAdmin, manageUsersRouter)

        app.use('/admin/bundles', validateAdmin, bundleRouter)

        app.use('/admin/movies',validateAdmin, moviesRouter); 

        app.use('/user', getLikedMoviesRouter)

        app.listen(serverPort, () => console.log(`Listening to port ${serverPort}`))

    }catch(error){
       
        console.log(`Error server connection with Db : ${error.message}`)
    }
}

startServer()
