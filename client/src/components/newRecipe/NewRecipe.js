import { useState} from 'react'
import axios from 'axios'
import PostTags from './PostTags.js'

// Try using context hook for the session

export default function NewRecipe(props){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])

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

    const recipe = {
      title: title,
      description: description,
      tags: tags
    }

    // Takes the token from the localStorage and sets as an Authorization header.
    const token = JSON.parse(window.localStorage.getItem('loggedGrannyUser')).token
    const config = {
      headers: {Authorization: `Bearer ${token}`}
    }

    await axios.post('/api/recipes', recipe, config)
    setTitle('')
    setDescription('')
    setTags('')
  }

  return (
    <div>
      <form onSubmit={createRecipe}>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>

        <button type="submit">SUBMIT RECIPE</button>
      </form>
      <PostTags handleClick={handleTagClick} tags={tags}/>
    </div>

  )
}