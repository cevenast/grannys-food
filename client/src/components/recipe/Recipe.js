import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../gallery/Card'

export default function Recipe(){
  const [recipe, setRecipe] = useState('')
  const id = useParams().id
  
  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then(res => res.data)
      .then(recipeInfo => setRecipe(recipeInfo))
      .catch(err => console.log(err))
  }, [])

  const body = recipe ? <Card title={recipe.title} username={recipe.user.username} userId={recipe.user.userId} tags={recipe.tags} imgSrc={recipe.imgSrc} id={recipe._id} description={recipe.description}/> : 'Loading'

  return(
    <main className="flex justify-center">
      <section className="flex max-w-3xl border-2 border-black justify-center flex-wrap">

        <section className="flex flex-col w-full border-2 border-[#43fb54] px-2 sm:px-4">
          <div className="w-fit max-w-2xl self-center border-2 border-[#ff0000]">
            <h1 className="text-3xl">{recipe.title}</h1>
            <span>@{recipe.user ? recipe.user.username : undefined}</span>
            <img src={recipe.imgSrc} alt={recipe.title} className="bg-black min-w-[24rem] w-full sm:max-w-2xl max-h-80"/>
            <span>Uploaded 2 months ago</span>
            {/* <p className="max-w-max">{recipe.description}</p> */}
          </div>
          
        </section>
        
        <section className="px-4 pt-10">
          <div className="border-2 border-[#5555bc] w-96 text-xl">Ingredients</div>
          <ul className="list-disc pl-4">
            <li>jejeje</li>
            <li>jejeje</li>
            <li>jejeje</li>
            <li>jejeje</li>
            <li>jejeje</li>
          </ul>
        </section>

        <section className="px-4 pt-10">
          <div className="border-2 border-[#5555bc] w-96 text-xl">Preparation</div>
          <ol className="list-decimal pl-4">
            <li>jejeje</li>
            <li>jejeje</li>
            <li>jejeje</li>
            <li>jejeje</li>
            <li>jejeje</li>
          </ol>
        </section>

      </section>


    </main>
    )
}