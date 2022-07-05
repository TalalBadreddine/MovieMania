import React from "react";
import './LandingCss.css'


const Landing = () => {
    return (
        <>
            <div className="w-100 h-screen allContent w-screen ">

                {/* <div className="text-center w-auto h-auto bg-red-500 my-auto">
                        <h1 className="text-8xl">Movie Mania</h1>
                        <p className="text-xl">Unlimited movies, TV shows, and more.Watch anywhere. Cancel anytime.</p>
                    </div> */}

                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                
                    <div className="w-1/2  mx-auto titleContainer">

                        <h1 className="text-8xl font-mono font-bold ">Movie Mania</h1>

                        <br />

                        <p className="text-xl text-left font-mono mb-16"> Unlimited movies, TV shows,and more.Watch anywhere. Cancel anytime.</p>

                        <div className="w-full getStartedButtonDivClass">

                                  <button className="font-mono py-2 px-4 rounded-full mt-10 getStartedButton w-1/2 h-20 text-2xl">Get Started</button>       

                        </div>
       
                    </div>

                   <div>

                   </div>

            </div>
        </>

    )
}

export default Landing