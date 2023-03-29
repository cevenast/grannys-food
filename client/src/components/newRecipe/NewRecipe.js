import { useState } from 'react'
import axios from 'axios'
import PostTags from './PostTags.js'
import { useNavigate} from 'react-router-dom'

import Input from '../login/Input'
import Textarea from './Textarea'

// Try using context hook for the session

export default function NewRecipe({ isLoggedIn }){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [directions, setDirections] = useState('')
  const [tags, setTags] = useState([])
  const [image, setImage] = useState(null)
  const navigate = useNavigate()


  const handleTagClick = (event) => {

    if (!event.target.closest('button')){ // Checks if element clicked has a button as a parent
      console.log('no tag')
    }
    else{ // If it does, takes the value of that button
      const clickedTag = event.target.closest('button').value
      console.log(clickedTag)
      if (!tags.includes(clickedTag)){ // If the value is not in the tags state array, it pushes it
        const currentTags = [...tags]
        currentTags.push(clickedTag)
        setTags(currentTags)
      }
      else{ // If the value is already in the tags state array, it removes it.
        const index = tags.indexOf(clickedTag)
        const currentTags = tags.slice(0, index).concat(tags.slice(index + 1))
        setTags(currentTags)
      }
    }
  }

  const createRecipe = async (event) => {
    event.preventDefault() // Prevents page from reloading
    try{
      const recipe = new FormData()
      recipe.append('title', title)
      recipe.append('description', description)
      recipe.append('longDescription', longDescription.length > 0 ? longDescription : description)
      recipe.append('ingredients', ingredients)
      recipe.append('directions', directions)
      recipe.append('tags', JSON.stringify(tags))
      recipe.append('img', image)

      // Takes the token from the localStorage and sets as an Authorization header.
      const token = JSON.parse(window.localStorage.getItem('loggedGrannyUser')).token
      const config = {
        headers: {Authorization: `Bearer ${token}`}
      }
      setTitle('')
      setDescription('')
      setTags([])
      setImage([])

      await axios.post('/api/recipes', recipe, config)
    }
    catch(err) {
      console.log(err)
    }

    navigate('/')
  }

  return (
    <main className="flex justify-center">
      <div className="py-10 w-11/12  max-w-[40rem] flex justify-center">
        <section className="py-8 px-8 w-full h-108 bg-slate shadow-md shadow-slate-400">

          <form onSubmit={createRecipe} className="flex flex-col justify-center">
              <Input inputId="title" changeHandler={setTitle} inputType="text" value={title}/>
              <Textarea inputId="description" changeHandler={setDescription} value={description} maxLength={130} rows={4}/>
              <Textarea inputId="long-description" changeHandler={setLongDescription} value={longDescription} maxLength={1000} placeholder="You can leave it blank to set it equal to description"/>
              <Textarea inputId="ingredients" changeHandler={setIngredients} value={ingredients} rows={10} required={true} placeholder="Put each ingredient on its own line"/>
              <Textarea inputId="directions" changeHandler={setDirections} value={directions} rows={10} required={true} placeholder="Put each direction on its own line"/>
              <div>
                <label className="block" htmlFor="imgUpload" >Image</label>
                <input type="file" accept="image/*" id="imgUpload" name="file" required onChange={(e) => setImage(e.target.files[0])}/>
              </div>

              <PostTags handleClick={handleTagClick} tags={tags}/>

              <button type="submit">SUBMIT RECIPE</button>
            </form>
        
        </section>
      </div>
    </main>

  )
}