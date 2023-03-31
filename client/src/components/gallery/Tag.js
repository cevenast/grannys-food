import { Link } from 'react-router-dom'

export default function Tag({tag}){

    // If tag doesn't exist, don't return
    const tagInfo = tags[tag]
    if (!tagInfo){
        return undefined
    }
    // If tag exists, return the tag with a link
    return( <Link to={`/q?tags=${tag}`}>
            <span className={`${tagInfo.color} ${tagInfo.textColor} w-10 h-6 px-4 mr-2 rounded-xl text-sm font-bold hover:${tagInfo.hoverColor}`}>
                {tagInfo.name}
            </span>
            </Link>
    )
}

const tags = {
    chile: {name: 'Chile', color:'bg-red-600', unCheckedColor:'bg-red-800', hoverColor:'bg-red-500', textColor:'text-white'},
      italia:{name:'Italia',color:'bg-lime-600', unCheckedColor:'bg-lime-900', hoverColor:'bg-lime-400', textColor:'text-white'},
      peru:{name:'Peru', color:'bg-red-600', unCheckedColor:'bg-red-800', hoverColor:'bg-red-500', textColor:'text-white' },
      mexico:{name:'Mexico', color:'bg-lime-600', unCheckedColor:'bg-lime-900', hoverColor:'bg-lime-400', textColor:'text-white'},
      france: { name: "France", color: "bg-blue-500", unCheckedColor: "bg-blue-600", hoverColor: "bg-blue-400", textColor: "text-white" },
      italy: { name: "Italy", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      spain: { name: "Spain", color: "bg-red-500", unCheckedColor: "bg-red-600", hoverColor: "bg-red-400", textColor: "text-white" },
      japan: { name: "Japan", color: "bg-gray-500", unCheckedColor: "bg-gray-600", hoverColor: "bg-gray-400", textColor: "text-white" },
      india: { name: "India", color: "bg-purple-500", unCheckedColor: "bg-purple-600", hoverColor: "bg-purple-400", textColor: "text-white" },
      thailand: { name: "Thailand", color: "bg-pink-500", unCheckedColor: "bg-pink-600", hoverColor: "bg-pink-400", textColor: "text-white" },
      turkey: { name: "Turkey", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      greece: { name: "Greece", color: "bg-blue-500", unCheckedColor: "bg-blue-600", hoverColor: "bg-blue-400", textColor: "text-white" },
      morocco: { name: "Morocco", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      vietnam: { name: "Vietnam", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      lebanon: { name: "Lebanon", color: "bg-red-500", unCheckedColor: "bg-red-600", hoverColor: "bg-red-400", textColor: "text-white" },
      southkorea: { name: "South Korea", color: "bg-blue-500", unCheckedColor: "bg-blue-600", hoverColor: "bg-blue-400", textColor: "text-white" },
      argentina: { name: "Argentina", color: "bg-blue-500", unCheckedColor: "bg-blue-600", hoverColor: "bg-blue-400", textColor: "text-white" },
      usa: { name: "USA", color: "bg-red-500", unCheckedColor: "bg-red-600", hoverColor: "bg-red-400", textColor: "text-white" },
      germany: { name: "Germany", color: "bg-stone-500", unCheckedColor: "bg-stone-600", hoverColor: "bg-stone-400", textColor: "text-white" },
      china: { name: "China", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      australia: { name: "Australia", color: "bg-blue-500", unCheckedColor: "bg-blue-600", hoverColor: "bg-blue-400", textColor: "text-white" },
      canada: { name: "Canada", color: "bg-red-500", unCheckedColor: "bg-red-600", hoverColor: "bg-red-400", textColor: "text-white" },
      portugal: { name: "Portugal", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      belgium: { name: "Belgium", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      england: { name: "England", color: "bg-blue-500", unCheckedColor: "bg-blue-600", hoverColor: "bg-blue-400", textColor: "text-white" },
      ireland: { name: "Ireland", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      israel: { name: "Israel", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      jamaica: { name: "Jamaica", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      malaysia: { name: "Malaysia", color: "bg-red-500", unCheckedColor: "bg-red-600", hoverColor: "bg-red-400", textColor: "text-white" },
      philippines: { name: "Philippines", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      singapore: { name: "Singapore", color: "bg-red-500", unCheckedColor: "bg-red-600", hoverColor: "bg-red-400", textColor: "text-white" },
      southafrica: { name: "South Africa", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      sweden: { name: "Sweden", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      
      
      vegan: { name: "Vegan", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      vegetarian: { name: "Vegetarian", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      pescatarian: { name: "Pescatarian", color: "bg-blue-500", unCheckedColor: "bg-blue-600", hoverColor: "bg-blue-400", textColor: "text-white" },
      flexitarian: { name: "Flexitarian", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      paleo: { name: "Paleo", color: "bg-red-500", unCheckedColor: "bg-red-600", hoverColor: "bg-red-400", textColor: "text-white" },
      keto: { name: "Keto", color: "bg-gray-500", unCheckedColor: "bg-gray-600", hoverColor: "bg-gray-400", textColor: "text-white" },
      mediterranean: { name: "Mediterranean", color: "bg-blue-500", unCheckedColor: "bg-blue-600", hoverColor: "bg-blue-400", textColor: "text-white" },
      rawfood: { name: "Raw Food", color: "bg-orange-500", unCheckedColor: "bg-orange-600", hoverColor: "bg-orange-400", textColor: "text-black" },
      glutenfree: { name: "Gluten Free", color: "bg-yellow-500", unCheckedColor: "bg-yellow-600", hoverColor: "bg-yellow-400", textColor: "text-black" },
      lowcarb: { name: "Low Carb", color: "bg-green-500", unCheckedColor: "bg-green-600", hoverColor: "bg-green-400", textColor: "text-white" },
      whole30: {name: 'Whole30', color: 'bg-green-500', unCheckedColor: 'bg-green-600', hoverColor: 'bg-green-400', textColor: 'text-white'},
      macrobiotic: {name: 'Macrobiotic', color: 'bg-purple-500', unCheckedColor: 'bg-purple-600', hoverColor: 'bg-purple-400', textColor: 'text-white'},
      pescetarian: {name: 'Pescetarian', color: 'bg-blue-500', unCheckedColor: 'bg-blue-600', hoverColor: 'bg-blue-400', textColor: 'text-white'},
      rawVegan: {name: 'Raw Vegan', color: 'bg-yellow-500', unCheckedColor: 'bg-yellow-600', hoverColor: 'bg-yellow-400', textColor: 'text-black'},
      fruitarian: {name: 'Fruitarian', color: 'bg-red-500', unCheckedColor: 'bg-red-600', hoverColor: 'bg-red-400', textColor: 'text-white'},
      ketogenic: {name: 'Ketogenic', color: 'bg-blue-500', unCheckedColor: 'bg-blue-600', hoverColor: 'bg-blue-400', textColor: 'text-white'},
      carnivore: {name: 'Carnivore', color: 'bg-gray-500', unCheckedColor: 'bg-gray-600', hoverColor: 'bg-gray-400', textColor: 'text-white'},
      lowFODMAP: {name: 'Low-FODMAP', color: 'bg-orange-500', unCheckedColor: 'bg-orange-600', hoverColor: 'bg-orange-400', textColor: 'text-white'},
      gaps: {name: 'GAPS', color: 'bg-green-500', unCheckedColor: 'bg-green-600', hoverColor: 'bg-green-400', textColor: 'text-white'},
      alkaline: {name: 'Alkaline', color: 'bg-pink-500', unCheckedColor: 'bg-pink-600', hoverColor: 'bg-pink-400', textColor: 'text-white'},
      ayurvedic: {name: 'Ayurvedic', color: 'bg-yellow-500', unCheckedColor: 'bg-yellow-600', hoverColor: 'bg-yellow-400', textColor: 'text-black'},
      intermittentFasting: {name: 'Intermittent Fasting', color: 'bg-purple-500', unCheckedColor: 'bg-purple-600', hoverColor: 'bg-purple-400', textColor: 'text-white'},
      antiInflammatory: {name: 'Anti-Inflammatory', color: 'bg-red-500', unCheckedColor: 'bg-red-600', hoverColor: 'bg-red-400', textColor: 'text-white'},
      bloodType: {name: 'Blood Type', color: 'bg-blue-500', unCheckedColor: 'bg-blue-600', hoverColor: 'bg-blue-400', textColor: 'text-white'}
}