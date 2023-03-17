import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
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
  const username = recipe.user ? recipe.user.username : 'user'
  const date = (new Date(recipe.createdAt)).toDateString().slice(3)

  return(
    <main className="mx-1">
      <section className="mx-auto flex-row max-w-3xl justify-start flex-wrap sm:px-4">
        {/* Main Information */}
        <section className="flex flex-col align-center w-full ">

          {/* Title */}
          {/* <h1 className="text-3xl text-zinc-600 font-bold pb-2 pl-2">{recipe.title}</h1> */}

          {/* User Info */}
          <div className="flex">
              <Link to={`/user/${username}`}><span className="inline-block w-12 h-12 rounded-full bg-black"></span></Link>

              <div className="inline-block min-w-[85%] sm:min-w-[90%] pl-2 ">
                <div className=" h-1/2 border-l border-l-[#4a7b8a] "><h1 className="text-3xl text-zinc-500 font-bold pb-6 pl-2">{recipe.title}</h1></div>
                <div className=" h-1/2 pt-1 pl-2 text-xs border-t border-t-[#4a7b8a] font-extralight">
                  By <Link to={`/user/${username}`}><span className="text-[#4a7b8a] hover:text-[#cdbbb2]">
                    {`@${username}, `}
                    </span></Link>
                  <span className="text-zinc-400">{date}</span>
                </div>
              </div>     

          </div>

          {/* Image */}
          <div className="self-center w-full mx-auto px-2 py-8">
            <img src={recipe.imgSrc} alt={recipe.title} className="bg-black min-w-[20rem] mx-auto md:max-w-2xl max-h-80"/>
          </div>
        </section>
        
        <p className="p-4 w-full border-4 border-dotted border-[#4a7b8a]">{recipe.description}</p>

        {/* Ingredients */}
        <section className="pt-10 self-start">
          <div className="pl-4 border-2 border-[#5555bc] text-xl font-bold text-zinc-600">Ingredients</div>
          <ul className="pt-4 list-disc list-inside pl-2 flex flex-wrap">
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>2 tazas de porotos</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>1 trozo de zapallos</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>Bicarbonato de sodio (opcional)</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>Un puñado de tallarines 87 (1/2 paquete)</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>Longaniza o chorizos (1 o 2)</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>1/4 cebolla</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>Zanahoria picada</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>1/2 tomate</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>Orégano</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>Ají de color</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>Aliño Completo</li>
            <li className='w-full sm:w-1/2 md:w-1/3 py-0.5 '>Ajo</li>
          </ul>
        </section>

        <section className="pt-10">
          <div className="pl-4 border-2 border-[#5555bc] text-xl font-bold text-zinc-600">Preparation</div>
          <ol className="list-decimal list-inside px-2 marker:text-2xl marker:font-bold marker:border ">
            <li className="py-2">La noche anterior, dejar remojando porotos con bicarbonato de sodio (opcional) para ablandarlos.</li>
            <li className="py-2">Lavar los porotos. Lavar zapallo y picarlo en cuadritos.</li>
            <li className="py-2">En una olla, echar porotos y el zapallo picado y cubrir con agua (cuánto cubra dependerá de qué tan espeso guste servir). Añadir un poco de orégano, un poco de bicarbonato de sodio y un poco de sal. Dejar hirviendo. (En caso de olla a presión, tomar 30 minutos desde que empieza a liberar presión)</li>
            <li className="py-2">Entretanto, en una sartén echar aceite y hacer sofrito con cebolla, pimentón, zanahoria, orégano, ají de color, ajo y aliño completo. Cuando agarren un poco de color, añadir el choricillo o longaniza picaditos.</li>
            <li className="py-2">Añadir al sofrito, cuando ya esté listo, tomate picado fino, para que no se seque y no se pegue. Se le echa un poquito de agüita de los mismos porotos para que se cocine. Se apaga el fuego cuando esté listo.</li>
          </ol>
        </section>

      </section>


    </main>
    )
}