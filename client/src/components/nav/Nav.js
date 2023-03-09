import Button from './Button.js'
import UserMenu from './UserMenu.js'
import Hamburger from './Hamburger.js'
import NavList from './NavList.js'
import {useState} from 'react'

export default function Nav({isLoggedIn}){

  const [hamburgerShown, setHamburgerShown] = useState(false)

  //
  // If user is logged in, shows user menu. If not, shows Log In button
  //
    let user
    if (isLoggedIn){
      user = <UserMenu session={isLoggedIn}/>
    }
    else{
      user = <Button backgroundColor="bg-[#4a7b8a]" textColor="text-white" link="">Sign In</Button>
     }

  ///
  // Makes the dropdown menu appear or disappear on smaller devices 
  ///

    const handleHamburgerBlur = () => {
      setHamburgerShown(false)
    }
    
    const handleHamburgerClick = () => {
      hamburgerShown ? setHamburgerShown(false) : setHamburgerShown(true)
    }
  

  return(
      <nav className="flex justify-between max-w-3xl mx-auto">

        {/* Logo */}
        <section className="">
          <a href="/"><img src="/icons/grandma-nobg.png" alt="grandma logo" className="pl-2 py-2 h-20 sm:h-24"/></a>
        </section>

        {/* Right Side */}
        <section className="flex justify-end items-center h-8/8 pr-4 pt-1">

          {/* List of links*/}
          <NavList hamburgerShown={hamburgerShown}/>

          {/* User Menu */}
          {user} {/* If is Logged in is <UserMenu/>. If not, Sign in <Button>*/}

          {/* Hamburger Icon */}
          <Hamburger handleHamburgerClick={handleHamburgerClick}  handleHamburgerBlur={handleHamburgerBlur}/>

        </section>
      </nav>
  )
}