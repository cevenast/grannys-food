import { useState } from 'react'

export default function GoogleAuth(props){
  const [showMessage, setShowMessage] = useState(false)

  function handleClick(){
    setShowMessage(true)
    setShowMessage('Google Auth functionality still in development')
    setTimeout(() => setShowMessage(false), 1500)
  }

  return(
    <>
    
    <button className='w-full' onClick={handleClick}>
      <div className="h-11 w-full px-4 py-2 mt-12 text-center bg-slate-200 hover:bg-slate-300 duration-200 ">  
        <span className="text-sm pl-8 align-middle font-bold text-slate-700 bg-[url('../public/bg-google.svg')] bg-no-repeat bg-left bg-contain ">
          Continue with Google
        </span>
      </div>
    </button>

    {showMessage &&
                  <div className="w-screen h-screen bg-slate-100/50 fixed top-0 left-0 flex flex-column justify-center items-center">
                   <p className="text-xl ">{showMessage}</p>
                  </div>
    }

    </>
  )
}