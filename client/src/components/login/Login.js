import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'

export default function Login({ handleLogin, session }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
      event.preventDefault() // Avoids page reload
      const res = await handleLogin(event, username, password) // Login is handled in App.js
      if (res){
        setErrorMessage(res) // If res returns something it means there was an error
      }
      else{
        setErrorMessage('') 
        navigate('/')  // Redirects to main page if login was successful
      } 
    }

  const form = 
    (
      <main className="flex justify-center py-10">

        {/* Left Column */}
        <section className="py-8 px-8 w-full h-108 bg-slate shadow-md shadow-slate-400">

          <h2 className="text-3xl font-bold pb-12">Log In</h2>

          <form action="/login" method="POST" onSubmit={handleSubmit}>

            {/* User Input */}
            <label htmlFor="username" className="block pb-4">
              <span className="block text-sm font-medium text-slate-700">Username</span>
              <input type="text" id="username" name="username" autoComplete="off" placeholder="username123" value={username} 
                onChange={(event) => setUsername(event.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none  disabled:bg-slate-50  invalid:border-red-500 invalid:text-red-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>

            {/* Password Input */}
            <label htmlFor="password" className="block pr relative pb-2">
              <span className="block text-sm font-medium text-slate-700">Password</span>
              <input type={passwordVisible ? 'text' : 'password'} id="password" name="password" placeholder="********" value={password} 
                onChange={(event) => setPassword(event.target.value)}
                className="w-full mt-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none   disabled:bg-slate-50  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"/>
              <i id="togglePassword" onClick={() => setPasswordVisible(!passwordVisible)} className="text-slate-700 cursor-pointer absolute bottom-1/4 right-4 hover:text-[#4a7b8a]">{passwordVisible === true ? <BsEyeFill/> : <BsEyeSlashFill/>}</i>
            </label>
            <span className="text-red-600 text-xs">{errorMessage}</span>
            
            <a href="#"><span className="block text-right text-xs text-slate-500 hover:text-slate-700">Forgot your password?</span></a>

            {/* Buttons  */}

            <div className="flex justify-evenly pt-14 pb-12">
              
              <button type="submit" className="py-1.5 px-3 inline-block w-36 bg-[#4a7b8a] text-white text-center rounded-2xl font-bold text-sm hover:bg-[#285968] duration-100 ">
                Log In
              </button>

              <Link to="/signup"><span className="py-1.5 px-3 inline-block w-36 bg-slate-200 text-slate-700 text-center rounded-2xl font-bold text-sm hover:bg-slate-300 duration-100 ">
                Sign Up</span>
              </Link>

            </div>
          </form>

          {/* Separation */}
          <h2 className="relative w-full text-center border-b border-slate-300 flex justify-center " >
            <span className="absolute -top-3 bg-white text-slate-500 text-sm px-2">or</span>
          </h2>

          {/* Google Auth */}

          <a href="/auth/google">
            <div className="h-11 w-full px-4 py-2 mt-12 text-center bg-slate-200 hover:bg-slate-300 duration-200 ">  
              <span className="text-sm pl-8 align-middle font-bold text-slate-700 bg-[url('/bg-google.svg')] bg-no-repeat bg-left bg-contain ">Continue with Google</span>
            </div>
          </a>
        </section>

      </main>
    )


  return(
    <section className=" flex justify-center" >
      {session ? `logged in as ${session.username}` : form}
    </section>
)
}

// function LoginForm(props){
//   return(
//     <main className="flex justify-center py-10">

//       {/* Left Column */}
//       <section className="py-8 px-8 w-96 h-108 bg-slate shadow-md shadow-[#cdbbb2]">
//         <h2 className="text-3xl font-bold pb-12">Log In</h2>

//         <form action="/login" method="POST"
//             onSubmit={async (event) => {
//               event.preventDefault() // Avoids page reload
//               const res = await handleLogin(event, username, password) // Login is handled in App.js
//               if (res){
//                 setErrorMessage(res)
//               }
//               else{
//                 setErrorMessage('') // If res returns something it means there was an error
//                 navigate('/')
//               } 
//             }}>

//           {/* User Input */}

//           <label htmlFor="username" className="block pb-4">
//             <span className="block text-sm font-medium text-slate-700">Username</span>
//             <input type="text" id="username" name="username" autoComplete="off" placeholder="username123" value={username} 
//               onChange={(event) => setUsername(event.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none  disabled:bg-slate-50  invalid:border-red-500 invalid:text-red-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
//           </label>

//           {/* Password Input */}

//           <label htmlFor="password" className="block pr relative pb-2">
//             <span className="block text-sm font-medium text-slate-700">Password</span>
//             <input type="password" id="password" name="password" placeholder="********" value={password} 
//               onChange={(event) => setPassword(event.target.value)}
//               className="mt-1  w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400  focus:outline-none   disabled:bg-slate-50  invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"/>
//             <i id="togglePassword" onclick="myFunction()" className="text-slate-700 fas fa-eye-slash cursor-pointer absolute bottom-4 right-4 hover:text-lime-600"></i>
//           </label>
//           <span className="text-red-600 text-xs">{errorMessage}</span>
          
//           <a href="#"><span className="block text-right text-xs text-slate-500 hover:text-slate-700">Forgot your password?</span></a>

//           {/* Buttons  */}

//           <div className="flex justify-evenly pt-14 pb-12">
//             <button type="submit" className="py-1.5 px-3 inline-block w-36 bg-[#4a7b8a] text-white text-center rounded-2xl font-bold text-sm hover:bg-lime-700 duration-200 ">Log In</button>
//             <a href="/signup"><span className="py-1.5 px-3 inline-block w-36 bg-slate-200 text-slate-700 text-center rounded-2xl font-bold text-sm hover:bg-slate-300 duration-200 ">Sign Up</span></a>
//           </div>
//         </form>

//         {/* Separation */}
//         <h2 className="relative w-full text-center border-b border-slate-300 flex justify-center " >
//           <span className="absolute -top-3 bg-white text-slate-500 text-sm px-2">or</span>
//         </h2>

//         {/* Google Auth */}

//         <a href="/auth/google">
//           <div className="h-11 w-full px-4 py-2 mt-12 text-center bg-slate-200 hover:bg-slate-300 duration-200 ">  
//             <span className="text-sm pl-8 align-middle font-bold text-slate-700 bg-[url('/imgs/bg-google.svg')] bg-no-repeat bg-left bg-contain ">Continue with Google</span>
//           </div>
//         </a>
//       </section>

//     </main>
//   )
// }