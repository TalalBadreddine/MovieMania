import React from "react";
import './LandingCss.css'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";



const Landing = () => {
    return (
        <div className="allContent w-screen ">

            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>

            <ScrollContainer>

                <ScrollPage page={0}>

                    <Animator animation={Zoom()}>
                        <div className="w-1/2  mx-auto titleContainer">

                            <h1 className="text-8xl font-mono font-bold w-screen">Movie Mania</h1>

                            <br />

                            <p className="text-xl text-left font-mono mb-16"> Unlimited movies, TV shows,and more.Watch anywhere. Cancel anytime.</p>

                            <div className="w-full getStartedButtonDivClass">

                                <button className="font-mono py-2 px-4 rounded-full mt-10 getStartedButton w-1/2 h-20 text-2xl">Get Started</button>

                            </div>

                        </div>
                    </Animator>



                </ScrollPage>
               

  
                <ScrollPage page={1}>
                    <div className="emptyDiv"></div>

                    <div className="bigParent">
                        <Animator animation={Move(-200, 0)}>

                            <div className="w-96 bg-green-400 h-96 ml-28 signIn ">
                                <h3>I am the text</h3>
                                <p>testing</p>
                            </div>

                        </Animator>

                        <Animator animation={Move(1300, 0)}>

                            <div className="w-full bg-green-400 h-96 mr-28">
                                <h3>I am the globe three js</h3>
                                <p> testing</p>
                            </div>
                        </Animator>
                    </div>


                </ScrollPage>


            </ScrollContainer>
        </div>

    )
}

export default Landing