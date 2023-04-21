import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios'
import UserGallery from './UserGallery'

export default function Userpage(){
  const [user, setUser] = useState(null)
  const { session, setSession } = useContext(UserContext)
  const username = useParams().username

  useEffect(() => { // Requests user information on pageload

    const config = session ? { headers: {Authorization: `Bearer ${session.token}`} } : null

    axios.get(`/api/users/${username}`, config)
      .then(res => res.data)
      .then(data => setUser(data))
      .catch(err => {
        if (err.response.status === 401){ // If user is not logged in, logs out and rerenders.
          setSession(null)
          console.log(err.response.data.error)
        }
      })
  },[session, username, setSession])

  // If request isn't finished, return blank page
  if (!user){
    return ''
  }

  return(
    <main className="max-w-4xl mx-auto pl-4 flex flex-col">

      <div className="flex justify-start items-center  pb-16">
        {/* Image */}
        <img className="inline-block w-8 h-8 sm:w-16 sm:h-16 bg-black rounded-full" src="https://pporg-cdn.nullcontent.net/monthly_2020_04/1673263168_small.RTDXPortraitFaint.png.782032cddc5ec8aa3cc23fcd22299527.png" alt="User"/>
        {/* Username */}
        <h1 className="text-xl pl-3 pb-2 sm:pl-8 sm:pb-4 sm:text-4xl ">{user.username}</h1>
      </div>

      {/* Recipes */}
      <UserGallery recipes={user.uploadedRecipes}/>
    </main>
  )
}