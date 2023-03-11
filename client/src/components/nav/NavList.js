import Button from './Button'
import { Link } from 'react-router-dom'

export default function NavList({hamburgerShown}){
    // screen smaller than sm: display ul as flex col if hamBurgerShown is true
    // if hamburgerShown is false: ul is hidden anyways. Only Hamburger.js is shown.
    // screen bigger than sm: always display as flex row, no matter what hamburgerShown is

    return(
        <div className='relative'> 
            <ul className={`${!hamburgerShown && 'hidden'} absolute top-8 -right-24 w-40 flex flex-col bg-white rounded-lg shadow
                            sm:static sm:flex sm:flex-row sm:w-full sm:shadow-none sm:justify-end sm:h-full sm:pr-4`}>

                <Link to="/about"><li><Button backgroundColor="" textColor="">About</Button></li></Link>
                <Link to="/browse"><li><Button backgroundColor="" textColor="" link="#">Browse  </Button></li></Link>
                <Link to="/newRecipe"><li><Button backgroundColor="" textColor="">+Recipe</Button></li></Link>
            </ul>
        </div>

    )
}