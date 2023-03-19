export default function AuthButton({color, text, buttonType}){
  const buttonPalette = {
    gray:{
      bg: 'bg-slate-200',
      text: 'text-slate-700',
      hoverBg: 'hover-bg-slate-300'
    },
    blue:{
      bg: 'bg-[#4a7b8a]',
      text: 'text-white',
      hoverBg: 'hover:bg-[#285968]'
    }
  }

  const palette = buttonPalette[color] || buttonPalette.gray

  return(
    <button type={buttonType} 
            className={`inline-block w-36 py-1.5 px-3 ${palette.bg} ${palette.text} text-center rounded-2xl font-bold text-sm 
                       ${palette.hoverBg} duration-100`}>
      {text}
    </button>
  )
}