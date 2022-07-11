import { Link,Outlet} from "react-router-dom"
import {CgLogOut} from "react-icons/cg"
import styles from './AdminNavBarCss.module.css'

const AdminNavBar = () => {
    return(
        <>
            <div className={["flex justify-end px-10 text-2xl py-2 bg-transparent", styles.navContainer].join(' ')}>

                <div className="flex w-2/3 justify-end space-x-20  ">
                    <Link to = '/admin/dashboard' className={['p-3',styles.newNavPath].join(' ')}>Dashboard</Link>
                    <Link to = '/admin/users' className={['p-3',styles.newNavPath].join(' ')}>Users</Link>
                    <Link to = '/admin/movies' className={['p-3',styles.newNavPath].join(' ')}>Movies</Link>
                    <Link to = '/admin/bundles' className={['p-3',styles.newNavPath].join(' ')}>Bundles</Link>
                </div>

                <div className="flex  w-1/3 justify-end">

                     <Link to = '/admin/logout' className={['p-3',styles.logoutIcon].join(' ')}> <CgLogOut size={32}/> </Link>

                </div>

            </div>
            <Outlet></Outlet>
        </>
    )
}

export default AdminNavBar