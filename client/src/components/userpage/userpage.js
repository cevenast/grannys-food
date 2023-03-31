import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Card from '../gallery/Card'

export default function Userpage(props){
  const [user, setUser] = useState(null)

  const username = useParams().username

  useEffect(() => { // Requests user information on pageload
    axios.get(`/api/users/${username}`)
      .then(res => res.data)
      .then(data => setUser(data))
      .catch(err => console.log(err))
  },[])

  // If request isn't finished, return blank page
  if (!user){
    return ''
  }

  // Grabs the recipes from the user information and creates a gallery with Cards
  function UserGallery(){
    const cards = user.uploadedRecipes.map(recipe => <Card title={recipe.title} username={user.username} tags={recipe.tags} imgSrc={recipe.imgSrc} id={recipe._id} description={recipe.description} key={recipe._id}/>)
    return(
      <section className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
        {cards}
       </section>
    )
  }

  return(
    <main className="max-w-3xl mx-auto pl-4">

      <div className="flex justify-start items-center  pb-16">
        {/* Image */}
        <span className="inline-block w-8 h-8 sm:w-16 sm:h-16 bg-black rounded-full"></span>
        {/* Username */}
        <h1 className="text-xl pl-3 pb-2 sm:pl-8 sm:pb-4 sm:text-4xl ">{user.username}</h1>
      </div>

      {/* Recipes */}
      <UserGallery/>
    </main>
  )
}