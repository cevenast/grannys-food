import Button from './Button'

export default function NavList({hamburgerShown}){
    const showHamburger = hamburgerShown
    return(
        <div>
            <ul className={`${!hamburgerShown && 'hidden'} absolute top-16 right-2 w-40 flex flex-col bg-white border border-gray-300 rounded-xl
                            sm:static sm:flex sm:flex-row sm:w-full sm:border:0 sm:border-transparent sm:justify-end sm:h-full sm:pr-4`}>

                <li><Button backgroundColor="" textColor="text-black" link="#">About</Button></li>
                <li><Button backgroundColor="" textColor="text-black" link="#">Spirit</Button></li>
                <li><Button backgroundColor="" textColor="text-slate-600" link="#">Browse  </Button></li>
            </ul>
        </div>

    )
}