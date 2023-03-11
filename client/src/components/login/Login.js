import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

export default function Login({ handleLogin, session }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  

  const loginForm = (
      <form 
        className="flex flex-col justify-center w-52"
        onSubmit={async (event) => {
          event.preventDefault() // Avoids page reload
          const res = await handleLogin(event, username, password) // Login is handled in App.js
          if (res){
            setErrorMessage(res)
          }
          else{
            setErrorMessage('') // If res returns something it means there was an error
            navigate('/')
          } 
        }}>

        <input type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
        <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button type="submit"></button>
        <span className="text-red-600 text-xs">{errorMessage}</span>
      </form>
    )

  return(
    <section className="h-28 flex justify-center" >
      {session ? `logged in as ${session.username}` : loginForm}
    </section>
  )
}