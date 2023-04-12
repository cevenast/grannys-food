import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext.js'
import Card from './Card.js'
import SideMenu from './SideMenu.js'
import SideMenuTab from './SideMenuTab.js'
import CountryTags from "../newRecipe/CountryTags"
import DietTags from "../newRecipe/DietTags.js"
import { RiFilter3Line } from 'react-icons/ri'

export default function Gallery(){
  const [recipes, setRecipes] = useState([])
  const { session, setSession } = useContext(UserContext)
  const [active, setActive] = useState({country:false, diet:false})
  const [selectedTags, setSelectedTags] = useState([])
  const [sort, setSort] = useState('createdAt:desc')
  const [showSideMenu, setShowSideMenu] = useState(false)

  //Get all recipes from db on page load
  useEffect(() => {
    const tagsParams = selectedTags.join('&tag=')
    const config = session ? { headers: {Authorization: `Bearer ${session.token}`} } : null

    axios.get(`/api/recipes/?tag=${tagsParams}&sort=${sort}`, config)
      .then(response => response.data)
      .then(initialRecipes => setRecipes(initialRecipes))
      .catch(err => {
        if (err.response.status === 401){ // If user is not logged in, logs out and rerenders.
            setSession(null)
            console.log(err.response.data.error)
        }
      })
  }, [session, setSession, selectedTags, sort]) // Changes the notes state, rerendering the component
  
  // Shows and hides tags in the side menu
  const handleTabClick = (event) => {
    if (event.currentTarget.firstElementChild.innerText === 'Country'){
      setActive({country:!active.country, diet:active.diet })
    }
    else if (event.currentTarget.firstElementChild.innerText === 'Diet'){
      setActive({country:active.country, diet:!active.diet })
    }
  }

    // Adds and removes selected tags
  const handleTagClick = (event) => {

    if (event.target.closest('button')){ // Checks if element clicked has a button as a parent
      const clickedTag = event.target.closest('button').value
      console.log(clickedTag)
      if (!selectedTags.includes(clickedTag)){ // If the value is not in the tags state array, it pushes it
        if (selectedTags.length < 5){
          const currentTags = [...selectedTags]
          currentTags.push(clickedTag)
          setSelectedTags(currentTags)
        }
        else{
          alert('You cannot use more than 5 tags')
        }
      }
      else{ // If the value is already in the tags state array, it removes it.
        const index = selectedTags.indexOf(clickedTag)
        const currentTags = selectedTags.slice(0, index).concat(selectedTags.slice(index + 1))
        setSelectedTags(currentTags)
      }
    }
  }

    // Takes the recipes from the state and creates an array of Card elements
  const cards = recipes.map((recipe, index) => 
      <Card title={recipe.title} 
            username={recipe.user.username} 
            tags={recipe.tags} 
            imgSrc={recipe.imgSrc} 
            id={recipe._id} 
            description={recipe.description}
            isUserFavorite={recipe.isUserFavorite}
            totalFavorites={recipe.totalFavorites}
            key={recipe._id}
      />)

  return(
    <section className='flex justify-start'>
      
      <SideMenu show={showSideMenu} toggleShow={setShowSideMenu}>
        <section className="lg:h-auto grow pr-0 lg:pr-5 pt-6 lg:pb-16 md:pt-4 lg:pt-4 scrolling-touch scrolling-gpu">
          <ul className="">
            <li> <RiFilter3Line size="2em" className="m-4"/> </li>

            <SideMenuTab title="Country" handleClick={handleTabClick} isActive={active.country}/>
            <div className="flex justify-evenly flex-wrap" onClick={event => handleTagClick(event)}>
              {active.country && <CountryTags selectedTags={selectedTags} size='small'/>}
            </div>

            <SideMenuTab title="Diet" handleClick={handleTabClick} isActive={active.diet}/>
            <div className="flex justify-evenly flex-wrap" onClick={event => handleTagClick(event)}>
              {active.diet && <DietTags selectedTags={selectedTags} size='small'/>}
            </div>

          </ul>
        </section>
      </SideMenu>
      
      <section className="w-full md:w-fit mx-auto">
        
        <section className="flex justify-between space-x-4">
          <div className=''>
            {!showSideMenu && <button onClick={() => setShowSideMenu(!showSideMenu)}><RiFilter3Line size="2em" className="ml-4 mt-4 lg:hidden"/></button>}
          </div>
          <div className='align-middle flex flex-col pr-4'>
            <label htmlFor="sort">Sort by</label>
            <select className="border-2 border-slate-200 bg-white p-1" name="sort" id="sort" defaultValue="createdAt:desc" onChange={(e) => setSort(e.currentTarget.value)}>
              <option value="createdAt:desc">Newest first</option>
              <option value="createdAt:asc">Oldest first</option>
              <option value="title:asc">Title from a to z</option>
              <option value="title:desc">Title from z to a</option>
              <option value="favoriteCount:desc">Most times favorite</option>
              <option value="favoriteCount:asc">Least times favorite</option>
            </select>
          </div>

        </section>

        <section className="grid grid-cols-1 min-[550px]:grid-cols-2 md:grid-cols-3 min-[1024px]:min-w-[800px] max-w-4xl mx-auto">
              {cards}
        </section>
      </section>
    </section>
  )
}