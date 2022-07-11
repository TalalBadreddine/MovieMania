import styles from './AdminBundlesCss.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AdminBundles = () => {
    const [fetchedData, setFetchedData] = useState()

    const [bundlesData, setBundlesData] = useState()

    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {

        const getTableData = async () => {

            await axios.request('/admin/bundles')
                .then((data) => {

                    let response = data.data.sort(function(a,b){
                        return a.price - b.price
                    })

                    setFetchedData(response)
                    setBundlesData(response)
                })

        }

        getTableData()
    }, [])

    const handleSearch = (event) => {
        let inputSearch = event.target.value
        
        setSearchInput(inputSearch)

        console.log(inputSearch)

        if(inputSearch == ' '){
            setBundlesData(fetchedData)
            return
        }

        let splitedSearchArr = inputSearch.split(' ')

        let arrOfElement = ['limit', 'price']

        // Normal search

        if(arrOfElement.includes(splitedSearchArr[0].toLowerCase()) && splitedSearchArr.length == 3 ){
            
            let searchBasedOn = splitedSearchArr[0] == 'limit' ? 'movieLimit' : 'price'

            let compareSign = splitedSearchArr[1]
            
            if(compareSign == '>'){
                setBundlesData(fetchedData.filter((bundle) => parseFloat(bundle[`${searchBasedOn}`]) > parseFloat(splitedSearchArr[2]) ))
                return
            }

            if(compareSign == '<'){
                setBundlesData(fetchedData.filter((bundle) => parseFloat(bundle[`${searchBasedOn}`]) < parseFloat(splitedSearchArr[2]) ))
                return
            }

            if(compareSign == '='){
                setBundlesData(fetchedData.filter((bundle) => parseFloat(bundle[`${searchBasedOn}`]) == parseFloat(splitedSearchArr[2]) ))
                return
            }

            if(compareSign == '>='){
                setBundlesData(fetchedData.filter((bundle) => parseFloat(bundle[`${searchBasedOn}`]) >= parseFloat(splitedSearchArr[2]) ))
                return
            }

            if(compareSign == '<='){
                setBundlesData(fetchedData.filter((bundle) => parseFloat(bundle[`${searchBasedOn}`]) <= parseFloat(splitedSearchArr[2]) ))
                return
            }
        }


        setBundlesData(fetchedData.filter((bundle) => bundle.title.toLowerCase().includes(inputSearch.toLowerCase())))
        
    }

    return (
        <div className={["h-screen w-screen p-10", styles.allContentContainer].join(' ')}>

            <div className='text-center text-4xl text-white'>
                <h1>Table Of Bundles</h1>
            </div>

            <div className={['mt-14  h-3/4', styles.contentOfThePage].join(' ')}>

                <div className='text-2xl text-white ml-2 w-2/6 h-auto mb-1'>
                    <form>
                        <div className="flex">
                            <div className=" xl:w-96">
                                <div className="input-group relative flex flex-wrap items-stretch w-full mb-2 rounded">
                                    <input type="search" className={["form-control relative flex-auto min-w-0 block w-full px-10 py-1.5 text-base font-normal text-white bg-white bg-clip-padding  rounded transition ease-in-out m-0 focus:text-white  focus:outline-none", styles.searchInput].join(' ')} placeholder="Search" aria-label="Search" aria-describedby="button-addon2" val={searchInput} onChange={handleSearch}/>
                                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 45" className='absolute w-6 -mt-2 ml-2' width="50px" height="50px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" /></svg>
                                    <span className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className='flex w-full '>

                    <div className='w-4/6'>

                        <table className={["w-full rounded-xl", styles.bundlesTable].join(' ')}>
                            <thead className="flex text-white w-full">
                                <tr className="flex w-full mb-4 pt-4 text-2xl">
                                    <th className=" w-1/4">Title</th>
                                    <th className=" w-1/4">Limit</th>
                                    <th className=" w-1/4">Price</th>
                                    <th className=" w-1/4">Manage</th>
                                </tr>
                            </thead>
                            <tbody className={[" text-center flex flex-col items-center justify-between overflow-y-scroll w-full text-white text-xl", styles.tableCss].join(' ')}>
                                {bundlesData != undefined  && bundlesData != ' ' ? bundlesData.map((bundle, index) => {
                                    return (

                                        <tr className="flex w-full h-64" key={index}>
                                            <td className="py-2 w-1/4">{bundle.title}</td>
                                            <td className="py-2 w-1/4">{bundle.movieLimit}</td>
                                            <td className="py-2 w-1/4">${bundle.price}</td>
                                            <td className="py-2 w-1/4 font-normal"> <span className='pl-2 pr-6 hover:font-bold hover:cursor-pointer'>Edit</span> <span className='hover:font-bold hover:cursor-pointer'>Delete</span></td>
                                        </tr>


                                    )
                                })

                                    :
                                    <tr className="flex w-full mb-4 h-20">
                                        <td className="py-2 w-1/4">No data Yet</td>
                                        <td className="py-2 w-1/4">No data Yet</td>
                                        <td className="py-2 w-1/4">No data Yet</td>
                                        <td className="py-2 w-1/4 "> <span className='px-6 '>Edit</span> <span>Delete</span></td>
                                    </tr>

                                }
                            </tbody>
                        </table>

                    </div>

                    <div className='w-2/6 p-10 '>
                        <div className='w-full bg-red-500 p-10 '>
                                
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
}

export default AdminBundles