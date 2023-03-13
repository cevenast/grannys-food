import Button from './Button.js'
import UserMenu from './UserMenu.js'
import Hamburger from './Hamburger.js'
import NavList from './NavList.js'
import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Nav({isLoggedIn}){
  const navigate = useNavigate()
  const [hamburgerShown, setHamburgerShown] = useState(false)

  //
  // If user is logged in, shows user menu. If not, shows Log In button
  //
    let user
    if (isLoggedIn){
      user = <UserMenu session={isLoggedIn}/>
    }
    else{
      user = <Link to="login"><Button backgroundColor="bg-[#4a7b8a]" textColor="text-white" link="">Sign In</Button></Link>
     }

  ///
  // Makes the dropdown menu appear or disappear on smaller devices 
  ///

    const handleHamburgerBlur = (e) => { // When user clicks outside the navlist menu, the menu is hidden
      if (e.relatedTarget == null || e.relatedTarget.closest('div').id !== 'navlist' ){
        setHamburgerShown(false)
      }
    }
    
    const handleHamburgerClick = () => {
      hamburgerShown ? setHamburgerShown(false) : setHamburgerShown(true)
    }

    const handleNavlistClick = (e) => { // When user clicks a link, they're redirected and menu is hidden again
      const link = e.currentTarget.innerText.replace(' ','').toLowerCase() //
      navigate(`/${link}`)
      setHamburgerShown(false)
  }
  

  return(
      <nav className="flex justify-between max-w-3xl mx-auto">

        {/* Logo */}
        <section className="">
          <Link to="/"><img src="/icons/grandma-nobg.png" alt="grandma logo" className="pl-2 py-2 h-20 sm:h-24"/></Link>
        </section>

        {/* Right Side */}
        <section className="flex justify-end items-center h-8/8 pr-4 pt-1">

          {/* List of links*/}
          <NavList hamburgerShown={hamburgerShown} handleClick={handleNavlistClick}/>

          {/* User Menu */}
          {user} {/* If is Logged in is <UserMenu/>. If not, Sign in <Button>*/}

          {/* Hamburger Icon */}
          <Hamburger handleHamburgerClick={handleHamburgerClick}  handleHamburgerBlur={handleHamburgerBlur}/>

        </section>
      </nav>
  )
}