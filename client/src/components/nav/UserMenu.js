import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import Button from './Button'

export default function UserMenu(){
    const [menuShown, setMenuShown] = useState(false)
    const userMenu = useRef()
    const { session } = useContext(UserContext)

    const handleLogOut = () => {  // When user logs out, session storage is cleared and the page reloaded
        window.localStorage.clear()
        window.location.reload(true)
    }

    if (!session){
        return <Link to="login"><Button backgroundColor="bg-[#4a7b8a]" textColor="text-white">Sign In</Button></Link>
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
            <img className="w-8 h-8 rounded-full" src="https://pporg-cdn.nullcontent.net/monthly_2020_04/1673263168_small.RTDXPortraitFaint.png.782032cddc5ec8aa3cc23fcd22299527.png" alt="user menu"/>
        </button>

        {/* Dropdown Menu */}
        <div ref={userMenu} onClick={() => setMenuShown(false)} className={`${!menuShown && 'sr-only'} absolute w-40 z-50 top-12 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                                
            {/* User Info */}
            <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">@{session.username}</span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">12 recipes</span>
            </div>

            {/* Actual User Menu */}
            <ul className="py-2" aria-labelledby="user-menu-button">
                <Link to="/settings">
                    <li>
                        <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Settings
                        </button>
                    </li>
                </Link>

                <Link to={`/users/${session.username}`}>
                    <li>
                        <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            My Recipes
                        </button>
                    </li>
                </Link>

                <Link to="/favourites">
                    <li>
                        <button className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                            Favourites
                        </button>
                    </li>
                </Link>

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

