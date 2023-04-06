import { useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext.js'
import Card from './Card.js'
import CountryTags from '../newRecipe/CountryTags.js'
import DietTags from '../newRecipe/DietTags.js'
import { RiFilter3Line, RiArrowRightSLine, RiArrowDownSLine } from 'react-icons/ri'

export default function Gallery(props){
    const [recipes, setRecipes] = useState([])
    const { session, setSession } = useContext(UserContext)
    const [searchParams] = useSearchParams()
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
        <div className="lg:-mt-16 w-fit" >
          <div className="lg:pt-16 fixed lg:sticky top-0 left-0 right-0 py-0 shadow lg:shadow-none">
            <div className="sticky top-0 lg:bottom-0 lg:h-[calc(100vh-4rem)] flex flex-col">
              <div className="overflow-y-scroll no-bg-scrollbar lg:w-[300px] grow bg-wash dark:bg-wash-dark" style={{overscrollBehavior:'contain'}}>
                <aside className="lg:grow flex-col w-full pb-8 lg:pb-0 lg:max-w-xs z-10 hidden lg:block">

                  <section className="w-full lg:h-auto grow pr-0 lg:pr-5 pt-6 lg:pb-16 md:pt-4 lg:pt-4 scrolling-touch scrolling-gpu">
                    <ul>
                      <RiFilter3Line size="2em" className="m-4"/>
                      <li>
                        <button className="p-2 pr-2 w-full rounded-none lg:rounded-r-2xl text-left hover:bg-gray-5 dark:hover:bg-gray-80 relative flex items-center justify-between pl-5 text-base font-bold text-base text-link dark:text-link-dark bg-highlight dark:bg-highlight-dark border-blue-40 hover:bg-highlight hover:text-link dark:hover:bg-highlight-dark dark:hover:text-link-dark">
                          <span>Country</span>
                          <span><RiArrowRightSLine size="1.8em"/></span>
                        </button>
                        <div className="flex justify-evenly flex-wrap">
                          <CountryTags selectedTags={['chile']} size='small'/>
                        </div>
                      </li>
                      <li>
                        <button className="p-2 pr-2 w-full rounded-none lg:rounded-r-2xl text-left hover:bg-gray-5 dark:hover:bg-gray-80 relative flex items-center justify-between pl-5 text-base font-bold text-base text-link dark:text-link-dark bg-highlight dark:bg-highlight-dark border-blue-40 hover:bg-highlight hover:text-link dark:hover:bg-highlight-dark dark:hover:text-link-dark">
                          <span>Diet</span>
                          <span><RiArrowRightSLine size="1.8em"/></span>
                        </button>
                        <div className="flex justify-evenly flex-wrap">
                          <DietTags selectedTags={['chile']} size='small'/>
                        </div>
                      </li>
                    </ul>
                  </section>

                </aside>
              </div>
            </div>
          </div>
        </div>
        




        <section className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
             {cards}
        </section>
      </section>
    )
}