import { useState} from 'react'
import axios from 'axios'
import PostTags from './PostTags.js'
import { useNavigate} from 'react-router-dom'
import DragFile from './DragFile.js'

// Try using context hook for the session

export default function NewRecipe(props){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
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

    const recipe = new FormData()
    recipe.append('title', title)
    recipe.append('description', description)
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

    navigate('/')
  }

  return (
    <div>
      <form onSubmit={createRecipe}>
        <div>
          <label for="title" class="form-label">Title</label>
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
         <label for="title" class="form-label">Description</label>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div class="mb-3">
          <label for="imgUpload" class="form-label">Image</label>
          <input type="file" class="" accept="image/*" id="imgUpload" name="file" onChange={(e) => setImage(e.target.files[0])}/>
        </div>
        <PostTags handleClick={handleTagClick} tags={tags}/>

        <button type="submit">SUBMIT RECIPE</button>
      </form>
      
    </div>

  )
}