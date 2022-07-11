import { useState } from 'react'
import styles from './NotificationCss.module.css'


const Notification = (props) => {

    return(
        <div className={ props.hidden == true || props.hidden == 'true' ? 'hidden' : [ ' w-96 px-8 py-6 h-auto top-1/4 left-1/4 rounded-xl absolute ', styles.notification].join(' ')}>
            <h1 className="text-4xl text-white font-bold text-center mb-8">{props.title}</h1>
            <div className="justify-center">
                 <p className="text-white text-center text-xl">{props.content}!</p>

                 <div className="w-24  m-auto mt-6 mb-4">
                    <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-xl" onClick={props.handleDoneBtn}>Done</button>
                 </div>

            </div>

        </div>
    )
}

export default Notification