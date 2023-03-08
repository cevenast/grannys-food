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
            {/* {cards}    */}
            <Card title="Completo Italiano" username="guatonparrillero" tags={['chile','italia','india','argentina']} imgSrc="./completo.jpg" id="bc6e89ac9db79h797" description="Hot dog variation eaten in Chile, usually served chopped tomatoes, avocados, mayonnaise and ketchup."/>
            <Card title="Baba Ganoush" username="cevenast" tags={['india']} imgSrc="./baba-ganoush.jpg" id="abf12bc21d3123faab1232" description="Smoky, rich, and creamy eggplant dip, mixing tender roasted eggplant and nutty tahini with garlic, citrus, and spices."/>
            {/* <Card title="Completo Italiano" user="guatonparrillero" tags={['chile','italia']} imgSrc="./completo.jpg" id="bc6e89ac9db79h797" description="Hot dog variation eaten in Chile, usually served with ingredients such as chopped tomatoes, avocados, mayonnaise,"/> */}
            {cards}
        </section>
    )
}