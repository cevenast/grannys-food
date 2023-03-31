import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiHeart3Line, RiHeart3Fill } from  'react-icons/ri'
import Tag from './Tag'

export default function Card({title, username, tags, imgSrc, id, description}){
    const [isFavourite, setIsFavourite] = useState(false)

    const tagList = tags.map((tag, index) => <Tag tag={tag} key={index}/>)


    return(
        <section className="flex flex-col flex-wrap justify-start h-[26rem] w-[15.5rem] mx-auto my-10 p-2 pb-0 shadow shadow-slate-400">
            {/* Image */}
            <Link to={`/recipes/${id}`}>
                <img src={imgSrc} alt={title} className="w-full h-36"/>
            </Link>

            {/* Title */}
            <h3 className="w-full text-2xl pt-2 hover:text-[#4a7b8a]">
                <Link to={`/recipes/${id}`}>
                    {title}
                </Link>
            </h3>

            {/* Username */}
            <span className="align-top text-xs text-zinc-400 hover:text-[#cdbbb2]">
                <Link to={`/users/${username}`}>
                    {`@${username}`}
                </Link>
            </span>

            {/* Description */}
            <p className="text-xs pt-4 h-20">{description}</p>

            {/* Tag List */}
            <div className="flex flex-row flex-wrap justify-start pt-1 h-20">
                {tagList}
            </div>

            {/* Conditional Heart */}
            <div className="h-30 self-end">
                <span className="relative bottom-2 right-1 font-bold">12</span>
                <button className="pr-2" onClick={() => setIsFavourite(!isFavourite)}>
                    {isFavourite ? <RiHeart3Fill color="red" size="2rem"/> : <RiHeart3Line size="2rem"/>}
                </button>
            </div> 

        </section>
    )
}