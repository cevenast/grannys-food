import PostTag from './PostTag'

export default function AllTags({ handleClick, tags }){
  return (
  <fieldset className="border-black border-2 w-40 text-center"
   onClick={(event) =>{
     event.preventDefault()
     handleClick(event)
  }}>
    <legend className="w-full text-center p-0">Choose your tags</legend>
    <PostTag tag="chile" selectedTags={tags} />
    <PostTag tag="argentina" selectedTags={tags}/>
    <PostTag tag="italia" selectedTags={tags}/>
    <PostTag tag="india" selectedTags={tags}/>
  </fieldset>
  )
}