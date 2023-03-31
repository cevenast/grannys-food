import { useState } from 'react'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'

export default function LoginInput({ inputId, changeHandler, inputType, placeHolder, value }){
  const [passwordVisible, setPasswordVisible] = useState(false)

  return(
  <label htmlFor={inputId} className="block pb-4 relative">

    <span className="block text-sm font-medium text-slate-700">{inputId[0].toUpperCase().concat(inputId.slice(1))}</span>
    <input type={passwordVisible ? (inputId === 'email' ? 'email' : 'text' ) : inputType } 
           id={inputId} 
           name={inputId} 
           autoComplete="off" 
           placeholder={placeHolder} 
           value={value} 
           onChange={(event) => changeHandler(event.target.value)}
           required
           className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none  disabled:bg-slate-50  invalid:text-red-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
    
    {placeHolder === '********' ? 
      <i id="togglePassword" 
         onClick={() => setPasswordVisible(!passwordVisible)} 
         className="text-slate-700 cursor-pointer absolute bottom-6 right-4 hover:text-[#4a7b8a]">
            {passwordVisible === true ? <BsEyeFill/> : <BsEyeSlashFill/>}</i> 
            : 
      undefined}
  </label>
  )
  
}