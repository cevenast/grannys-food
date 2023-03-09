import { useState } from 'react'

export default function UserMenu({session}){
    const [menuShown, setMenuShown] = useState(false)


    return(
    <div className="flex items-center md:order-2 relative">
        {/* User Image */}
        <button type="button" className="hover:ring-2 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-2 dark:focus:ring-gray-600" id="user-menu-button"
                onClick={() => menuShown ? setMenuShown(false) : setMenuShown(true)} 
                onBlur={() => setMenuShown(false)}
        >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="./totodile.png" alt="user menu"/>
        </button>
        {/* Dropdown Menu */}
        <div className={`${!menuShown && 'hidden'} absolute w-40 z-50 top-12 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
            {/* User Info */}
            <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">@{session.username}</span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">12 recipes</span>
            </div>
            {/* Actual User Menu */}
            <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Recipees</a>
                </li>
                <li>
                    <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Favourites</a>
                </li>
                <li>
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> Log out</button>
                </li>
            </ul>
        </div>
    </div>
    )
}

