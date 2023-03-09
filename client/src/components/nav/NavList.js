import Button from './Button'

export default function NavList({hamburgerShown}){
    // screen smaller than sm: display ul as flex col if hamBurgerShown is true
    // if hamburgerShown is false: ul is hidden anyways. Only Hamburger.js is shown.
    // screen bigger than sm: always display as flex row, no matter what hamburgerShown is

    return(
        <div className='relative'> 
            <ul className={`${!hamburgerShown && 'hidden'} absolute top-8 -right-24 w-40 flex flex-col bg-white rounded-lg shadow
                            sm:static sm:flex sm:flex-row sm:w-full sm:shadow-none sm:justify-end sm:h-full sm:pr-4`}>

                <li><Button backgroundColor="" textColor="" link="#">About</Button></li>
                <li><Button backgroundColor="" textColor="" link="#">Spirit</Button></li>
                <li><Button backgroundColor="" textColor="" link="#">Browse  </Button></li>
            </ul>
        </div>

    )
}