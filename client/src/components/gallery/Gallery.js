import { useState} from 'react'
import Card from './Card.js'

export default function Gallery(props){
    // const [recipes, setRecipes] = useState([])
    // useEffect axios /get '/recipes/all' 
    //then recipes = data
    // const cards = recipes.map(recipe => <Card title={recipe.title} user={recipe.user} tags={recipe.tags} imgSrc={recipe.imgSrc} id={recipe.id} description={recipe.description}/>)
    return(

        <section className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
            {/* {cards}    */}
            <Card title="Baba Ganoush" user="cevenast" tags={['india']} imgSrc="./baba-ganoush.jpg" id="abf12bc21d3123faab1232" description="Smoky, rich, and creamy eggplant dip, mixing tender roasted eggplant and nutty tahini with garlic, citrus, and spices."/>
            <Card title="Completo Italiano" user="guatonparrillero" tags={['chile','italia']} imgSrc="./completo.jpg" id="bc6e89ac9db79h797" description="Hot dog variation eaten in Chile, usually served with ingredients such as chopped tomatoes, avocados, mayonnaise,"/>
            <Card title="Baba Ganoush" user="cevenast" tags={['india']} imgSrc="./baba-ganoush.jpg" id="abf12bc21d3123faab1232" description="Smoky, rich, and creamy eggplant dip, mixing tender roasted eggplant and nutty tahini with garlic, citrus, and spices."/>
            <Card title="Completo Italiano" user="guatonparrillero" tags={['chile','italia']} imgSrc="./completo.jpg" id="bc6e89ac9db79h797" description="Hot dog variation eaten in Chile, usually served with ingredients such as chopped tomatoes, avocados, mayonnaise,"/>
            <Card title="Baba Ganoush" user="cevenast" tags={['india']} imgSrc="./baba-ganoush.jpg" id="abf12bc21d3123faab1232" description="Smoky, rich, and creamy eggplant dip, mixing tender roasted eggplant and nutty tahini with garlic, citrus, and spices."/>
            <Card title="Completo Italiano" user="guatonparrillero" tags={['chile','italia']} imgSrc="./completo.jpg" id="bc6e89ac9db79h797" description="Hot dog variation eaten in Chile, usually served with ingredients such as chopped tomatoes, avocados, mayonnaise,"/>
            <Card title="Baba Ganoush" user="cevenast" tags={['india']} imgSrc="./baba-ganoush.jpg" id="abf12bc21d3123faab1232" description="Smoky, rich, and creamy eggplant dip, mixing tender roasted eggplant and nutty tahini with garlic, citrus, and spices."/>
            <Card title="Completo Italiano" user="guatonparrillero" tags={['chile','italia']} imgSrc="./completo.jpg" id="bc6e89ac9db79h797" description="Hot dog variation eaten in Chile, usually served with ingredients such as chopped tomatoes, avocados, mayonnaise,"/>
        </section>
    )
}