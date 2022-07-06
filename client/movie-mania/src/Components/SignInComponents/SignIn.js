import { useState } from "react"
import './signInCss.css'
import {BiError} from 'react-icons/bi'
import SignInWithGoogle from "./SignInWithGoogle"
import {Link} from 'react-router-dom'

let userObjectSkeleton = {
    email: '',
    password: ''
}

let errorObjectSkeleton = {
    errorClass: 'text-red-500 flex mt-6 hidden ',
    errorContent:'',
}

const SignIn = () => {
    const [errorObject, setErrorObject] = useState(errorObjectSkeleton)
    const {errorClass, errorContent} = errorObject

    const [userObject, setUserObject] = useState(userObjectSkeleton)
    const { email, password } = userObject

    const showError = (bool = true) => {

        if(bool){

            setErrorObject({...errorObject,['errorClass']: errorClass.replace('hidden', '') })

        }else{
            if(errorClass.includes('hidden'))return
            setErrorObject({...errorObject,['errorClass']: errorClass + ' hidden' })
        }
        
    }

    const handleChange = async (event) => {
        const {name, value} = event.target
        await setUserObject({ ...userObject, [name]: value })
        showError(false)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if((email.length <= 5 || !email.includes('@') || !email.includes('.') ) && email.toLowerCase() != 'admin'){
            setErrorObject({...errorObject, ['errorContent']: 'Please Insert Email Properly', ['errorClass']: errorClass.replace('hidden', '')})
            return
        }
 
        if(password.length <= 3){
            setErrorObject({...errorObject, ['errorContent']: 'Please Insert Password Properly', ['errorClass']: errorClass.replace('hidden', '')})
            return
        }

        (async () => { const response = await fetch('/login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({email: email, password: password})
            });
            const content = await response.json();

            if(content.toLowerCase == 'admin')alert('Redirect To Admin Page')

            const isUser = content 
            ? alert('Redirect Home') 
            : setErrorObject({...errorObject, ['errorContent']: 'User does not exist', ['errorClass']: errorClass.replace('hidden', '')})

          })();

    }

    return (

        <div className="w-full">

            <form className="bg-white shadow-md rounded-lg px-12 pt-6 pt-12 pb-20 mb-4" onSubmit={handleSubmit}>

                <h1 className=" text-3xl mb-8 font-bold text-center text-black ">Welcome Back!</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" onChange={handleChange} name="email" value={email}  required />
                </div>

                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*************" onChange={handleChange} name="password"  value={password} required/>
                </div>

                <div className="text-black mb-10">
                    <span>Don't have a account ? <Link to = "/register"className="text-blue-700 hover:text-blue-300 hover:cursor-pointer">Register</Link> </span>
                    <br></br>
                    <span className={errorClass}><span className="animate-bounce mr-1"><BiError size={20}></BiError></span><span className="text-red-500 text-sm ml-1">{errorContent}</span></span>
                </div>

                <div className="items-center justify-between mt-4">
                <button className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="Submit">
                        Sign In
                    </button>
                    {/* <button className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8" type="button">
                     Sign In With Google
                    </button> */}
                    <SignInWithGoogle className="googleButton"></SignInWithGoogle>
                </div>

                <div className="mt-6">

                    <p className="text-center text-gray-500 text-xs">
                          &copy;2022 Movie Mania. All rights reserved.
                    </p>
                </div>


            </form>
        </div>
    )
}

export default SignIn