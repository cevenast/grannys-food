export default function Nav({backgroundColor, textColor, link, children}){
    return(
            <a href={link}>
                <button className={`${backgroundColor} ${textColor} 
                    hover:bg-slate-200 py-1 mb-3 rounded-xl px-4 mr-4 font-semibold
                    sm:py-2 sm:mr-0 sm:hover:text-[#cdbbb2] sm:hover:bg-transparent`
                    }>
                    {children}
                </button>
            </a>
    )
}