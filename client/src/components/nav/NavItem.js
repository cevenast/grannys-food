export default function Nav({backgroundColor, textColor, link, children}){
    return(
            <a href={link}>
                <li className={`${backgroundColor} ${textColor} 
                    hover:bg-slate-200 py-3 pl-2
                    sm:px-4 sm:py-2 sm:rounded-xl font-semibold sm:hover:text-[#cdbbb2] sm:hover:bg-transparent`
                    }>
                    {children}
                </li>
            </a>
    )
}