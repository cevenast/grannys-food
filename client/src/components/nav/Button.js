export default function Nav({color, type, children, disabled}){
    
    // A color palette is asigned depending on the color.
    const buttonPalette = {
        blue:{
            bg: 'bg-[#4a7b8a]',
            text: 'text-white',
            hoverBg: 'hover:bg-[#285968]'
          },
        gray:{
          bg: 'bg-slate-200',
          text: 'text-slate-700',
          hoverBg: 'hover:bg-slate-300'
        },
        white:{
            bg: 'bg-transparent',
            text: '',
            hoverBg: 'hover:bg-transparent',
            hoverText: 'hover:text-[#cdbbb2]'
        }
      }
      // If no valid color was passed, it's given white by default
      const palette = buttonPalette[color] || buttonPalette.white

    return(

                <button type={type}
                        disabled={disabled}
                        className={`${palette.bg} ${palette.text} sm:mt-0 sm:mr-0 mb-3 py-2 px-4 rounded-xl font-semibold
                                    ${palette.hoverBg} sm:hover:${palette.hoverText}
                                    mt-2 mr-4 `
                }>
                    {children}
                </button>
    )
}