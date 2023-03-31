import PostTag, {tags} from './PostTag'

export default function AllTags({ handleClick, selectedTags }){

  // Gets the country tags and the diet tags and creates an array of PostTag components for each

  const countryTags = Object.keys(tags.country).map((tag, index) => <PostTag tag={tag} selectedTags={selectedTags} key={index}/> )
  const dietTags = Object.keys(tags.diet).map((tag, index) => <PostTag tag={tag} selectedTags={selectedTags} key={index}/>)


  return (
  <fieldset className="w-full text-center flex justify-center flex-wrap pb-20"
   onClick={(event) =>{
     event.preventDefault()
     handleClick(event) // Adds of removes tag from state in NewRecipe
  }}>
    <legend className="w-full text-center p-4 text-2xl font-bold">Tags</legend>
    <h5 className="w-full text-center p-4 text-lg font-bold">Country</h5>
    {countryTags}

    <h5 className="w-full text-center p-4 text-lg font-bold">Diet</h5>
    {dietTags}

  </fieldset>
  )
}