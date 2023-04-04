import axios from 'axios'

export const isSessionValid = (session, setSession) => {

  if (!session){ // If session is not set in state

    // Checks if session is stored in localstorage
    const currentSessionJSON = window.localStorage.getItem('loggedGrannyUser')

    // If it's actually in local storage, checks if the token is still valid with the server
    if (currentSessionJSON){ // Takes token from local storage and sets it as header
      const token = JSON.parse(currentSessionJSON).token
      const config = { headers: {Authorization: `Bearer ${token}`} }

      axios.get(`/login/validateToken`, config) // Server checks if token is valid

      // If token is valid, sets the session state as the session stored in localStorage
      .then(res => {
        setSession(JSON.parse(currentSessionJSON))
        console.log('token was valid so session state was set to the session object of the local storage')
      })

      // If token expired or invalid, clear localStorage and sets session state to null
      .catch(err => {
        if (err.response.status === 401){
          localStorage.clear()
          setSession(null)
          console.log('local storage was cleared and session set to null')
        }
        else{
          console.log('something went wrong')
        }
      })
    }
    else { // If session is not set in state AND is not in session storage, set session to null
      setSession(null)
      console.log('session set to null because no localstorage was found')
    }
  }

  if (session){
    const config = { headers: {Authorization: `Bearer ${session.token}`} }

      axios.get(`/login/validateToken`, config) // Server checks if token is valid

      // If token is valid, don't do anything
      .then(res => console.log('token is valid'))

      // If token expired or invalid, clear localStorage and sets session state to null
      .catch(err => {
        if (err.response.status === 401){
          localStorage.clear()
          setSession(null)
          console.log('local storage was cleared and session set to null')
        }
        else{
          console.log('something went wrong')
        }
      })
  }
}