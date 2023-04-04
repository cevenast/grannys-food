import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext.js'
import Card from './Card.js'

export default function Gallery(props){
    const [recipes, setRecipes] = useState([])
    const { session, setSession } = useContext(UserContext)

    //Get all recipes from db on page load
    useEffect(() => {

        const config = session ? { headers: {Authorization: `Bearer ${session.token}`} } : null

        axios.get('/api/recipes', config)
          .then(response => response.data)
          .then(initialRecipes => setRecipes(initialRecipes))
          .catch(err => {
            if (err.response.status === 401){ // If user is not logged in, logs out and rerenders.
                setSession(null)
                console.log(err.response.data.error)
            }
          })
        }, [session, setSession]) // Changes the notes state, rerendering the component
   
        const cards = recipes.map((recipe, index) => 
            <Card title={recipe.title} 
                  username={recipe.user.username} 
                  tags={recipe.tags} 
                  imgSrc={recipe.imgSrc} 
                  id={recipe._id} 
                  description={recipe.description}
                  isUserFavorite={recipe.isUserFavorite}
                  totalFavorites={recipe.totalFavorites}
                  key={index}
            />)

    return(

        <section className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
             {cards}
        </section>
    )
}