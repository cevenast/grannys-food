import PostTag, {tags} from './PostTag'

export default function AllTags({ handleClick, selectedTags }){

  // Gets the country tags and the diet tags and creates an array of PostTag components for each
  let countryTags = []
  for (let tag of Object.keys(tags.country)){
    countryTags.push(<PostTag tag={tag} selectedTags={selectedTags}/>)
  }
    // Creates [(Chile) (Argentina) (Alemania)....]
  let dietTags = []
  for (let tag of Object.keys(tags.diet)){
    dietTags.push(<PostTag tag={tag} selectedTags={selectedTags}/>)
  }
    // Creates [(Vegan) (GlutenFree) ...]

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