import React from 'react'
import { useDispatch } from 'react-redux'
import DarkModeToggel from '../../components/DarkModeToggel'
import { logout } from '../../store/features/AuthSlice'

function NavBar() {
    const dispatch = useDispatch()
    const onLogoutClick = () => {
        dispatch(logout())
    }
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-b dark:bg-gray-900 shadow-md">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <div className="self-center text-xl font-semibold whitespace-nowrap font-mono dark:text-white">Repo Search</div>
                <div className="block w-auto" id="navbar-default">
                    <ul className="flex p-4 border-0 rounded-lg flex-row space-x-8 mt-0 text-sm font-medium bg-white dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <DarkModeToggel />
                        </li>
                        <li>
                            <button onClick={() => onLogoutClick()} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-red-500 p-0 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar