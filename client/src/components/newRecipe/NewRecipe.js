import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext.js'
import TagsPool from './TagsPool.js'
import Button from '../nav/Button'
import Input from '../login/Input'
import Textarea from './Textarea'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner.js'
import { isSessionValid } from '../isSessionValid.js'

export default function NewRecipe(){
  const { session, setSession } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [directions, setDirections] = useState('')
  const [tags, setTags] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  // If user expired, logs out
  useEffect(() => isSessionValid(session, setSession), [session, setSession])

  // Adds and removes selected tags
  const handleTagClick = (event) => {

    if (!event.target.closest('button')){ // Checks if element clicked has a button as a parent
      console.log('no tag')
    }
    else{ // If it does, takes the value of that button
      const clickedTag = event.target.closest('button').value
      if (!tags.includes(clickedTag)){ // If the value is not in the tags state array, it pushes it
        if (tags.length < 5){
          const currentTags = [...tags]
          currentTags.push(clickedTag)
          setTags(currentTags)
        }
        else{
          alert('You cannot use more than 5 tags')
        }
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
    setLoading(true)
    try{
      const recipe = new FormData()
      recipe.append('title', title)
      recipe.append('description', description)
      recipe.append('longDescription', longDescription.length > 0 ? longDescription : description)
      recipe.append('ingredients', ingredients)
      recipe.append('directions', directions)
      recipe.append('tags', JSON.stringify(tags))
      recipe.append('img', image)

      // Takes the token from the session and sets as an Authorization header.
      const config = {
        headers: {Authorization: `Bearer ${session.token}`}
      }

      await axios.post('/api/recipes', recipe, config)
      navigate('/')
    }
    catch(err) {
      console.log(err)
      setErrorMessage('Unable to upload recipe')
      setTimeout(() => setErrorMessage(''), 3000)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <main className="flex justify-center">
      <div className="py-10 w-11/12  max-w-[40rem] flex justify-center">
        <section className="py-8 px-8 w-full h-108 bg-slate shadow-md shadow-slate-400">
          <h2 className="text-3xl pb-8">Add New Recipe</h2>

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

              <TagsPool handleClick={handleTagClick} selectedTags={tags}/>

              <Button type="submit" color="blue" textColor="text-white" disabled={loading}>Submit Recipe</Button>
            </form>
        
        </section>
      </div>
  
      {loading && 
            <div className="w-full h-screen bg-slate-100/50 fixed -top-10 flex flex-column justify-center items-center">
               <div className="text-4xl "><LoadingSpinner/></div>
            </div>}
      {errorMessage &&
                  <div className="w-full h-screen bg-slate-100/50 fixed top-0 flex flex-column justify-center items-center">
                  <p className="text-4xl ">{errorMessage}</p>
               </div>}
    </main>

  )
}