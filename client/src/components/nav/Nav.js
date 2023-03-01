import NavItem from './NavItem.js'
import UserMenu from './UserMenu.js'
import {useState} from 'react'

export default function Nav({isLoggedIn}){

  const [hamburgerShown, setHamburgerShown] = useState(false)

  //
  // If user is logged in, shows user menu. If not, shows Log In button
  //
    let user
    if (isLoggedIn){
      user = <UserMenu/>
    }
    else{
      user = <button className="mr-0 bg-[#4a7b8a] text-white h-fit px-4 py-2 rounded-xl font-semibold hover:text-[#cdbbb2]">Log In</button>
    }

  ///
  // Makes the dropdown menu appear or disappear on smaller devices 
  ///
    const toggleHamburger = () => {
      setHamburgerShown(!hamburgerShown)
    }
  
  return(
      <nav className="flex md:w-fit md:m-auto relative">

        {/* Logo */}
        <section className="w-1/8 border-2 border-black">
          <a href="/"><img src="/icons/grandma-nobg.png" alt="grandma logo" className="pl-2 py-2 h-14 sm:h-24"/></a>
        </section>

        {/* Right Side */}
        <section className="border-2 border-black flex justify-end items-center h-8/8  pr-4 flex pt-1 w-7/8 ml-auto md:pl-64">

          {/* List */}
          <div>
            <ul className={`${!hamburgerShown && 'hidden'} absolute top-12 right-2 w-52 flex flex-col mt-4 border border-gray-300
                            sm:static sm:flex sm:flex-row sm:w-full sm:p-0 sm:mt-0 sm:border:0 sm:border-transparent sm:justify-end sm:align-middle sm:h-full sm:items-center sm:pr-4 sm:pt-0`}>

                <NavItem backgroundColor="" textColor="text-black" link="#">About</NavItem>
                <NavItem backgroundColor="" textColor="text-black" link="#">Spirit</NavItem>
                <NavItem backgroundColor="" textColor="text-slate-600" link="#">Browse Recipees</NavItem>
            </ul>
          </div>

          {/* User Menu */}
          {user}

          {/* Hamburger */}
          <button type="button" onClick={toggleHamburger} className="
                                                                        inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg
                                                                        sm:hidden
                                                                        hover:bg-gray-100 
                                                                        focus:outline-none focus:ring-2 focus:ring-gray-200 
                                                                        dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
                                                                    "                                             >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>

        </section>
      </nav>
  )
}