import React, { useState } from "react";
import './LandingCss.css'
import SignIn from "../../Components/SignInComponents/SignIn";
import { Outlet } from "react-router-dom";

const Landing = () => {
    const [leftDivClass, setLeftDivClass] = useState("w-auto hidden h-1/2 mt-28")
    const [middleDivClass, setMiddleDivClass] = useState("w-1/2  mx-auto titleContainer my-64")
    const [rightDivClass, setRightDivClass] = useState("w-96  hidden mt-28")

    const handleGetStarted = (e) => {
        e.preventDefault()
        setMiddleDivClass(middleDivClass + ' hidden')
        setLeftDivClass(leftDivClass.replace('hidden',' leftDivClass'))
        setRightDivClass(rightDivClass.replace('hidden', ' rightDivClass'))
    }

    return (
        <div className="allContent w-screen">
            
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>

            <div className="flex w-screen bigParent " >


                <div className={leftDivClass} >
                    <SignIn />
                </div>

                <div className={middleDivClass}>

                    <h1 className="text-8xl font-mono font-bold w-screen">Movie Mania</h1>

                    <br />

                    <p className="text-xl text-left font-mono mb-16"> Unlimited movies, TV shows,and more.Watch anywhere. Cancel anytime.</p>

                    <div className="w-full getStartedButtonDivClass">

                        <button className="font-mono py-2 px-4 rounded-full mt-10 getStartedButton w-1/2 h-20 text-2xl" onClick={handleGetStarted}>Get Started</button>

                    </div>

                </div>


                <div className={rightDivClass}>
                    <h1 className="text-2xl text-center mb-10 ">Who are we</h1>
                    <p className="text-xl leading-loose font-mono">                                                                                       no-unused-vars
                        Line 14:11:  'handleChange' is assigned a value but never used                                                                                                                                                                                                                                                                                                                  no-unused-vars
                        Line 57:7:   The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid
                        Line 14:11:  'handleChange' is assigned a value but never used                                                                                                                                                                                                                                                                                                                  no-unused-vars
                        Line 14:11:  'handleChange' is assigned a value but never used                                                                                                                                                                                                                                                                                                                  no-unused-vars

                    </p>
                </div>
            </div>
            <Outlet></Outlet>
        </div>

    )
}

export default Landing