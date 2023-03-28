import PostTag from './PostTag'

export default function AllTags({ handleClick, tags }){
  return (
  <fieldset className="w-full text-center flex justify-between flex-wrap"
   onClick={(event) =>{
     event.preventDefault()
     handleClick(event)
  }}>
    <legend className="w-full text-center p-4 text-lg font-bold">Choose your tags</legend>
    <h5 className="w-full text-center p-4 text-md font-bold">Country</h5>

    <PostTag tag="argentina" selectedTags={tags}/>
    <PostTag tag="chile" selectedTags={tags} />
    <PostTag tag="india" selectedTags={tags}/>
    <PostTag tag="italia" selectedTags={tags}/>
    <PostTag tag="mexico" selectedTags={tags}/>
    <PostTag tag="peru" selectedTags={tags}/>
    <h5 className="w-full text-center p-4 text-md font-bold">Diet</h5>
    <PostTag tag="glutenFree" selectedTags={tags}/>
    <PostTag tag="vegan" selectedTags={tags}/>
  </fieldset>
  )
}