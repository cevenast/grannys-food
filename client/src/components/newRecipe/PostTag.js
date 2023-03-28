
export default function PostTag({ tag, selectedTags }){

  // Checks if the tag is already in selected tags to change the styles
  const isChecked = selectedTags.includes(tag)

  // Different tags and their properties
  const tags = {
    chile: {name: 'Chile', color:'bg-red-600', unCheckedColor:'bg-red-800', hoverColor:'bg-red-500', textColor:'text-white'},
    argentina: {name: 'Argentina', color:'bg-cyan-400', unCheckedColor:'bg-cyan-600', hoverColor:'bg-cyan-200', textColor:'text-white'},
    italia:{name:'Italia',color:'bg-lime-600', unCheckedColor:'bg-lime-900', hoverColor:'bg-lime-400', textColor:'text-white'},
    india:{name:'India', color:'bg-[#ff671f]', unCheckedColor:'bg-[#dd4410]', hoverColor:'bg-[#ffaa77]'},
    peru:{name:'Peru', color:'bg-red-600', unCheckedColor:'bg-red-800', hoverColor:'bg-red-500', textColor:'text-white' },
    mexico:{name:'Mexico', color:'bg-lime-600', unCheckedColor:'bg-lime-900', hoverColor:'bg-lime-400', textColor:'text-white'},
    vegan:{name:'Vegan', color:'bg-lime-600', unCheckedColor:'bg-lime-900', hoverColor:'bg-lime-400', textColor:'text-white'},
    glutenFree:{name:'Gluten Free', color:'bg-yellow-400', unCheckedColor:'bg-yellow-600', hoverColor:'bg-yellow-200'}
}
  // Info of the current tag
  const tagInfo = tags[tag]
  
  // returns <button> tagname (circle) </button>
  return (
    <button value={tag} className={`${isChecked ? tagInfo.color : tagInfo.unCheckedColor} ${tagInfo.textColor} w-fit h-6 pl-3 pr-2 my-0.5 flex items-center rounded-xl text-sm font-bold`}>
      {tagInfo.name} 
      
      <span
            className={`${tagInfo.color} inline-block h-3 w-3 border-none rounded-xl ml-2 duration-200
                       ${isChecked ? 'bg-lime-500' : 'bg-zinc-800' }
                       focus:ring-0 focus:ring-offset-0`}/>
    </button>
  )
}