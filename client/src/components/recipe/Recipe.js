import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function Recipe(){
  const [recipe, setRecipe] = useState('')
  const id = useParams().id
  
  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then(res => res.data)
      .then(recipeInfo => setRecipe(recipeInfo))
      .catch(err => console.log(err))
  }, [id]) //Passing id even if it's not going to change

  if (recipe === ''){ // Don't show anything until data has been received
    return ''
  }

  const username = recipe.user.username
  const ingredients = recipe.ingredients.map((ingredient, index) => <li key={index} className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>{ingredient}</li>)
  const directions = recipe.directions.map((direction, index) => <li key={index}className='w-full py-4 leading-7 '>{direction}</li> )
  const date = (new Date(recipe.createdAt)).toDateString().slice(3) // sets creation date to Jan 01 2023 format
  const imgSrcRegex = recipe.imgSrc.match(/(.*upload\/)(.*)/)

  return(
    <main className="mx-1">
      <section className="mx-auto flex-row max-w-3xl justify-start flex-wrap sm:px-4">
        {/* Main Information */}
        <section className="flex flex-col align-center w-full ">

          {/* Info */}
          <div className="flex">

              {/* User Image */}
              <Link to={`/users/${username}`}><span className="inline-block w-12 h-12 rounded-full bg-black"></span></Link>

              <div className="inline-block min-w-[85%] sm:min-w-[90%] pl-2 ">

                {/* Title */}
                <div className=" h-fit border-l border-l-[#4a7b8a] ">
                  <h2 className="text-3xl text-zinc-500 font-bold pb-2 pl-2 align-bottom">{recipe.title}</h2>
                </div>

                {/* User */}
                <div className=" h-1/2 pt-1 pl-2 text-xs border-t border-t-[#4a7b8a] font-extralight">
                  By <Link to={`/users/${username}`}>
                      <span className="text-[#4a7b8a] hover:text-[#cdbbb2]">
                        {`@${username}, `}
                      </span>
                    </Link>
                    
                  {/* Date */}
                  <span className="text-zinc-400">{date}</span>
                </div>
              </div>     

          </div>

          {/* Image */}
          <div className="self-center w-full mx-auto px-2 py-8">
            <img src={`${imgSrcRegex[1]}c_scale,w_430/${imgSrcRegex[2]}`} alt={recipe.title} className="bg-black min-w-[20rem] mx-auto md:max-w-2xl max-h-80"/>
          </div>
        </section>
        
        <p className="p-4 w-full border-4 border-dotted border-[#4a7b8a] rounded-xl">{recipe.longDescription}</p>

        {/* Ingredients */}
        <section className="py-8 self-start">
          <h3 className="pl-4 text-2xl font-bold text-zinc-600 pb-4">Ingredients</h3>
          <ul className="pt-4 list-disc list-inside pl-2 flex flex-wrap">
            {ingredients}
          </ul>
        </section>

        {/* Preparation */}
        <section className="py-8">
          <h3 className="pl-4 text-2xl font-bold text-zinc-600 pb-4">Directions</h3>
          <ol className="list-decimal list-inside px-2 marker:text-2xl marker:font-bold marker:border ">
            {directions}
          </ol>
        </section>

      </section>


    </main>
    )
}