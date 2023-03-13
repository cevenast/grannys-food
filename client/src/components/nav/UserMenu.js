import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserMenu({session}){
    const [menuShown, setMenuShown] = useState(false)
    const userMenu = useRef()
    const navigate = useNavigate()

    const handleLogOut = () => {  // When user logs out, session storage is cleared and the page reloaded
        window.localStorage.clear()
        window.location.reload(true)
    }

    const handleLinkClick = (e) => { // When user clicks a link, they're redirected and menu is hidden again
        const link = e.currentTarget.innerText.replace(' ','').toLowerCase() //
        navigate(`/${link}`)
        setMenuShown(false)
    }

    return(
    <div className="flex items-center md:order-2 relative">

        {/* User Image */}
        <button type="button" className="hover:ring-2 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-2 dark:focus:ring-gray-600" id="user-menu-button"
                /* Menu visibility toggles between image clicks  */
                onClick={() => menuShown ? setMenuShown(false) : setMenuShown(true)}
                /* If click is outside the user menu, the menu is hidden  */
                onBlur={(e) => {
                    if (e.relatedTarget === null || e.relatedTarget.closest('div') !== userMenu.current){
                        setMenuShown(false)
                    }
                    }}
        >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="./totodile.png" alt="user menu"/>
        </button>

        {/* Dropdown Menu */}
        <div ref={userMenu} className={`${!menuShown && 'sr-only'} absolute w-40 z-50 top-12 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                                
            {/* User Info */}
            <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">@{session.username}</span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">12 recipes</span>
            </div>
            {/* Actual User Menu */}
            <ul className="py-2" aria-labelledby="user-menu-button">
                <li onClick={handleLinkClick}>
                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</button>
                </li>
                <li onClick={handleLinkClick}>
                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Recipes</button>
                </li>
                <li onClick={handleLinkClick}>
                <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Favourites</button>
                </li>
                <li>
                    <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={(e) => handleLogOut()}
                    onTouchStart={(e) => handleLogOut()}>
                    Log out</button>
                </li>
            </ul>
        </div>
    </div>
    )
}

