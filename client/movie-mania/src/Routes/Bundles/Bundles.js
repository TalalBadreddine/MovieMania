import { useEffect, useState } from "react"
import  {useNavigate } from 'react-router-dom'
import Bundle from "../../Components/Bundle/Bundle"
import Loading from "../../Components/Loading/Loading"

const Bundles = () => {
    const navigate = useNavigate()
    const [dataFetched, setDataFetched] = useState()

    useEffect( () => {

        const getAllBundles = async () => {
            
            await fetch('/register/payments')
            .then(async (resp) => await resp.json())
            .then(async (data) => {
                await setDataFetched(data)
            })

        }

         getAllBundles()

    }, [])

    if(dataFetched == 'forbidden')return navigate('/')
    
    if(dataFetched == undefined)return(
        <Loading></Loading>
    )
    

    return(
        <div>
            <h1 className="text-5xl text-center mt-10">Our Bundles</h1>
            <div className="flex gap-10 mt-2 mx-12 h-screen flex-wrap">
            {dataFetched.map((data, index) => {
            return <Bundle info ={data} key={index} ></Bundle>
        })}

            </div>
 
        </div>
    )
}

export default Bundles