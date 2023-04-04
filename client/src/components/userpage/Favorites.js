import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'

import UserGallery from './UserGallery'

export default function Favorites(){
  const [recipes, setRecipes] = useState(null)
  const { session } = useContext(UserContext)

  useEffect(() => { // Requests logged in user information on pageload

    const config = session ? { headers: {Authorization: `Bearer ${session.token}`} } : null

    axios.get('/api/recipes/myfavorites', config)
      .then(res => res.data)
      .then(data => setRecipes(data))
      .catch(err => console.log(err))
  },[session])

  // If request isn't finished, return blank page
  if (!recipes){
    return ''
  }

  return(
    <main className="max-w-3xl mx-auto pl-4">

      <div className="flex justify-start items-center  pb-16">
        {/* Title */}
        <h1 className="text-xl pl-3 pb-2 sm:pl-8 sm:pb-4 sm:text-4xl ">My Favorites</h1>
      </div>

      {/* Recipes */}
      <UserGallery recipes={recipes}/>
    </main>
  )
}