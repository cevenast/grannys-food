import { useState, useEffect } from 'react'
import './App.css'
import { UserContext } from './components/UserContext.js'
import Nav from './components/nav/Nav.js'
import Gallery from './components/gallery/Gallery.js'
import Login from './components/login/Login.js'
import Signup from './components/login/Signup'
import NewRecipe from './components/newRecipe/NewRecipe.js'
import Recipe from './components/recipe/Recipe.js'
import Userpage from './components/userpage/userpage'

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Favorites from './components/userpage/Favorites'


function App() {
  const [session, setSession] = useState(false)

  // Keeps the user logged in between browser sessions
  useEffect(() => {
    // If session is stored in localstorage, sets the session state to that value
    const currentSessionJSON = window.localStorage.getItem('loggedGrannyUser')
    if (currentSessionJSON){
      setSession(JSON.parse(currentSessionJSON))
    }
    else{
      setSession(null)
    }
  }, [])

  // While is being determined if session is stored, loading message briefly appears
  if (session === false){
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ session, setSession }}>
          <Nav/>

          <Routes>
            <Route path="/" element ={<Gallery/>} />
            <Route path="/login" element ={<Login/>} />
            <Route path="/signup" element ={ session ? `Already logged in as ${session.username}`:<Signup/>} /> 
            <Route path="/about" element="something about the site"/>
            <Route path="/browse" element="some options so the user can browse recipes"/>
            <Route path="/myrecipes" element="user's uploaded recipes"/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/settings" element="configuracion como cambiar la fotito y la clave y alguna que otra cosa" />

            <Route path="/recipes/:id" element={<Recipe/>} />
            <Route path="/users/:username" element={<Userpage/>}/>

            <Route path="/newRecipe" element ={ session ? <NewRecipe/> : <Navigate to="/login"/>} />
          </Routes>
        </UserContext.Provider>
      </Router>

    </div>
  )
}

export default App;
