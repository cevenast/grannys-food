export default function Nav({backgroundColor, textColor, link, children}){

    const hoverBg = backgroundColor === '' ? 'bg-transparent' : 'bg-[#285968]'
    const hoverText = backgroundColor === '' ? 'text-[#cdbbb2]' : 'text-white'

    return(

                <button className={`${backgroundColor} ${textColor} 
                    hover:${hoverBg} py-1 mb-3 rounded-xl px-4 mr-4 font-semibold
                    mt-2 sm:mt-0 py-2 sm:mr-0 sm:hover:${hoverText}`
                    }>
                    {children}
                </button>
    )
}