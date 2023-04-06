import PostTag, {tags} from './PostTag'
import CountryTags from './CountryTags'
import DietTags from './DietTags'

export default function AllTags({ handleClick, selectedTags }){

  return (
  <fieldset className="w-full text-center flex justify-center flex-wrap pb-20"
    onClick={(event) =>{
      event.preventDefault()
      handleClick(event) // Adds of removes tag from state in NewRecipe
    }}
  >

    <legend className="w-full text-center p-4 text-2xl font-bold">Tags</legend>
    <h5 className="w-full text-center p-4 text-lg font-bold">Country</h5>
      <CountryTags selectedTags={selectedTags}/>
    <h5 className="w-full text-center p-4 text-lg font-bold">Diet</h5>
      <DietTags selectedTags={selectedTags}/>

  </fieldset>
  )
}