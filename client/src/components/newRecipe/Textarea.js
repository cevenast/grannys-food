export default function LoginInput({ inputId, changeHandler, placeholder, value, maxLength, rows, required }){

  return(
  <label htmlFor={inputId} className="block pb-4 relative">

    <span className="block text-sm font-medium text-slate-700">{inputId[0].toUpperCase().concat(inputId.slice(1))}</span>
    <textarea
           id={inputId} 
           name={inputId}
           maxLength={maxLength}
           placeholder={placeholder} 
           value={value} 
           onChange={(event) => changeHandler(event.target.value)}
           rows={rows}
           required={required}
           className="mt-1 block w-full px-3 py-2 resize-none bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none"/>

  </label>
  )
  
}