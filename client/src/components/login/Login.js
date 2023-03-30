import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios'
import Input from './Input'
import Separator from './Separator'
import GoogleAuth from './GoogleAuth'
import AuthContainer from './AuthContainer'
import AuthButton from './AuthButton'


export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const {session, setSession} = useContext(UserContext)
  const navigate = useNavigate()
    
  // If username and password are valid, the username and token are set localStorage and state
  const handleLogin = async (event) => {
    event.preventDefault() // Avoids page reload
    try{
      const res = await axios.post('/login', { username, password })
      const user = res.data
      window.localStorage.setItem('loggedGrannyUser', JSON.stringify(user))
      //set token so it can be used in headers on recipes post requests
      setSession(user)
      setErrorMessage('') 
      navigate('/')  // Redirects to main page if login was successful
    }
    // If username and passoword are invalid, returns the error message. If there's another error, returns 'something happened' 
    catch(err){
      console.log(err.response)
      setErrorMessage(err.response.status === 401 ? err.response.data : 'something happened')
    }
  }

  if (session){
    return (
      <section className=" flex justify-center" >
        {`Already logged in as ${session.username}`}
      </section>
    )
  }

  return( // If user is not logged in, shows the log in form. If it is, redirects to main page
  <section className=" flex justify-center" >
    <AuthContainer title="Log In">
      <form action="/login" method="POST" onSubmit={handleLogin}>

        {/* User Input */}
        <Input inputId="username" changeHandler={setUsername} inputType="text" placeHolder="username123" />
        <Input inputId="password" changeHandler={setPassword} inputType="password" placeHolder="********" value={password}/>
        <span className="text-red-600 text-xs">{errorMessage}</span>
        
        <Link to="/accountRecovery"><span className="block text-right text-xs text-slate-500 hover:text-slate-700">Forgot your password?</span></Link>

        {/* Buttons */}
        <div className="flex justify-evenly pt-14 pb-12">
          {/* Log In */}
          <AuthButton type="submit" color="blue" text="Log In"/>
          {/* Sign Up */}
          <Link to="/signup"><AuthButton type='button' color='gray' text='Sign Up'/></Link>
        </div>
      </form>

      <Separator/>
      <GoogleAuth/>

    </AuthContainer>
  </section>
  )
}