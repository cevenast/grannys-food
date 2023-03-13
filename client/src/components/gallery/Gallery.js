import { useState, useEffect} from 'react'
import axios from 'axios'
import Card from './Card.js'

export default function Gallery(props){
    const [recipes, setRecipes] = useState([])

    //Get all recipes from db on page load
    useEffect(() => {
        axios.get('/api/recipes')
          .then(response => response.data) // notes service module in ./services/notes.js fetches the data
          .then(initialRecipes => setRecipes(initialRecipes))
          .catch(err => console.log(err))
        }, []) // Changes the notes state, rerendering the component
   
        const cards = recipes.map((recipe, index) => <Card title={recipe.title} username={recipe.user.username} userId={recipe.user.userId} tags={recipe.tags} imgSrc={recipe.imgSrc} id={recipe._id} description={recipe.description} key={index}/>)

    return(

        <section className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
             {cards}
        </section>
    )
}