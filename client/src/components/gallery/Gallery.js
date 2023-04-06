import { useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext.js'
import Card from './Card.js'
import SideMenu from './SideMenu.js'
import SideMenuTab from './SideMenuTab.js'
import { RiFilter3Line } from 'react-icons/ri'

export default function Gallery(){
    const [recipes, setRecipes] = useState([])
    const { session, setSession } = useContext(UserContext)
    const [searchParams] = useSearchParams()
    const [active, setActive] = useState({country:false, diet:false})


    const params = searchParams.getAll("tags")
    const tags = params.join('&tags=')

    //Get all recipes from db on page load
    useEffect(() => {

        const config = session ? { headers: {Authorization: `Bearer ${session.token}`} } : null

        axios.get(`/api/recipes/?tags=${tags}`, config)
          .then(response => response.data)
          .then(initialRecipes => setRecipes(initialRecipes))
          .catch(err => {
            if (err.response.status === 401){ // If user is not logged in, logs out and rerenders.
                setSession(null)
                console.log(err.response.data.error)
            }
          })
        }, [session, setSession, tags]) // Changes the notes state, rerendering the component
    
    const handleTabClick = (event) => {
      if (event.currentTarget.firstElementChild.innerText === 'Country'){
        setActive({country:!active.country, diet:active.diet })
      }
      else if (event.currentTarget.firstElementChild.innerText === 'Diet'){
        setActive({country:active.country, diet:!active.diet })
      }
    }
   
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
      <section className='flex justify-start'>
        
        <SideMenu>
          <section className="lg:h-auto grow pr-0 lg:pr-5 pt-6 lg:pb-16 md:pt-4 lg:pt-4 scrolling-touch scrolling-gpu">
            <ul className="">
              <li> <RiFilter3Line size="2em" className="m-4"/> </li>
              <SideMenuTab title="Country" handleClick={handleTabClick} isActive={active.country}/>
              <SideMenuTab title="Diet" handleClick={handleTabClick} isActive={active.diet}/>
            </ul>
          </section>
        </SideMenu>
        

        <section className="grid grid-cols-1 min-[550px]:grid-cols-2 md:grid-cols-3 min-[1024px]:min-w-[800px] max-w-4xl mx-auto">
             {cards}
        </section>
      </section>
    )
}