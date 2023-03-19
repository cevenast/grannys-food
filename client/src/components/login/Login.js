import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Input from './Input'
import Separator from './Separator'
import GoogleAuth from './GoogleAuth'
import AuthContainer from './AuthContainer'
import AuthButton from './AuthButton'


export default function Login({ handleLogin, session }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleLoginSubmit = async (event) => {
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
      
      <AuthContainer title="jajaj">
        <form action="/login" method="POST" onSubmit={handleLoginSubmit}>

          {/* User Input */}
          <Input inputId="username" changeHandler={setUsername} inputType="text" placeHolder="username123" username={username}/>
          <Input inputId="password" changeHandler={setPassword} inputType="password" placeHolder="********" value={password}/>
          <span className="text-red-600 text-xs">{errorMessage}</span>
          
          <Link to="/accountRecovery"><span className="block text-right text-xs text-slate-500 hover:text-slate-700">Forgot your password?</span></Link>

          {/* Buttons  */}

          <div className="flex justify-evenly pt-14 pb-12">
            <AuthButton type="submit" color="blue" text="Log In"/>
            <Link to="/signup"><AuthButton type='button' color='gray' text='Sign Up'/></Link>
          </div>
        </form>

        <Separator/>
        <GoogleAuth/>
      
      </AuthContainer>
    )


  return( // If user is not logged in, shows the log in form. If it is, redirects to main page
    <section className=" flex justify-center" >
      {session ? `Already logged in as ${session.username}` : form}
    </section>
)
}