import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Nav from './components/nav/Nav.js'
import Gallery from './components/gallery/Gallery.js'
import Login from './components/login/Login.js'
import NewRecipe from './components/newRecipe/NewRecipe.js'
import Recipe from './components/recipe/Recipe.js'

import {BrowserRouter as Router, Routes, Route, Link, Navigate, useParams, useNavigate,} from "react-router-dom"


function App() {
  const [session, setSession] = useState(false)

  // Keeps the user logged in between browser sessions
  useEffect(() => {
      // If session is stored in localstorage, sets the session state to that value
    const currentSessionJSON = window.localStorage.getItem('loggedGrannyUser')
    if (currentSessionJSON){ // If there's a session stored, sets it to the state as an object
      const session = JSON.parse(currentSessionJSON)
      setSession(session)
    }
  }, [])

  // // If username and password are valid, the username and token are set localStorage and state
  const handleLogin = async (event,username,password) => {
    try{
      const res = await axios.post('/login', { username, password })
      const user = res.data
      window.localStorage.setItem('loggedGrannyUser', JSON.stringify(user))
      //set token so it can be used in headers on recipes post requests
      setSession(user)
    }
    // If username and passoword are invalid, returns the error message. If there's another error, returns 'something happened' 
    catch(err){
      console.log(err.response)
      return err.response.status === 401 ? err.response.data : 'something happened'
    }

  }

  return (
    <div className="App">
      <Router>
        <Nav isLoggedIn={session}></Nav>

        <Routes>
          <Route path="/" element ={<Gallery/>} />
          <Route path="login" element ={<Login session={session} handleLogin={handleLogin}/>} />
          <Route path="/about" element="something about the site"/>
          <Route path="/browse" element="some options so the user can browse recipes"/>
          <Route path="/myrecipes" element="user's uploaded recipes"/>
          <Route path="/favourites" element="user's saved recipes"/>
          <Route path="/settings" element="configuracion como cambiar la fotito y la clave y alguna que otra cosa" />

          <Route path="recipes/:id" element={<Recipe/>} />
          {/*   const id = useParams().id ==> useEffect findById(id) */}

          <Route path="/newRecipe" element ={<NewRecipe/>} />
        </Routes>

      </Router>

    </div>
  )
}

export default App;
