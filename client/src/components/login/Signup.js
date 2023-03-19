import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Input from './Input'
import Separator from './Separator'
import GoogleAuth from './GoogleAuth'
import AuthContainer from './AuthContainer'
import AuthButton from './AuthButton'

export default function Signup(){
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSignupSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword){
      setErrorMessage("Passwords don't match")
      return
    }
    if (!username || !email || !password || !confirmPassword){
      setErrorMessage('Please fill all fields')
    }
    else{
      try{
        const res = await axios.post('/api/users', {username, password, email})
        const user = res.data.username
        setErrorMessage(`User ${user} Created Succesfully!`)
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        navigate('/')
      }
      catch(err){
        console.log(err)
        setErrorMessage(`${err.response.data.error || ''}\n ${err.response.data.username || ''}\n ${err.response.data.email || ''}`)
      }
    }
  }

  return(
    <section className="flex justify-center" >
      <AuthContainer title="Sign Up">
        <form action="/login" method="POST" onSubmit={handleSignupSubmit}>

          {/* User Input */}
          <Input inputId="username" changeHandler={setUsername} inputType="text" placeHolder="username123" value={username}/>
          <Input inputId="email" changeHandler={setEmail} inputType="email" placeHolder="user@email.com" value={email}/>
          <Input inputId="password" changeHandler={setPassword} inputType="password" placeHolder="********" value={password}/>
          <Input inputId="confirmPassword" changeHandler={setConfirmPassword} inputType="password" placeHolder="********" value={confirmPassword}/>
          <span className="text-red-600 text-xs">{errorMessage}</span>


          {/* Buttons  */}

          <div className="flex justify-evenly pt-14 pb-4">
            <AuthButton type="submit" color="blue" text="Sign Up"/>
          </div>
        </form>

        <p className="pb-12 text-center text-xs text-slate-500 hover:text-slate-700 duration-200"><Link to="/login">Already have an account? Log In</Link></p>

        <Separator/>
        <GoogleAuth/>


      </AuthContainer>
    </section>
  )
}