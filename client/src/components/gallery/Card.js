import { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RiHeart3Line, RiHeart3Fill } from  'react-icons/ri'
import Tag from './Tag'

export default function Card({title, username, tags, imgSrc, id, description, isUserFavorite, totalFavorites}){
    const [isFavourite, setIsFavourite] = useState(isUserFavorite)
    const [totalTimesFavorite, setTotalTimesFavorite] = useState(totalFavorites)
    const { session } = useContext(UserContext)
    const navigate = useNavigate()

    const tagList = tags.map((tag, index) => <Tag tag={tag} key={index}/>)

    const handleHeartClick = async () => {
        
        if (!session){
            return navigate('/login') 
        }
        // Takes the token from the session
        const token = session.token

        try{
            // Sets token as an Authorization header.
            const config = { headers: {Authorization: `Bearer ${token}`} }
            // Makes request to update user favourites
            const res = await axios.put('/api/users/setFavourite', {postId:id}, config)
            // If response is ok, updates favorite state
            setIsFavourite(!isFavourite)
            setTotalTimesFavorite(res.data)
            console.log(res)
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <section className="flex flex-col flex-wrap justify-start h-[26rem] w-[15.5rem] mx-4 my-10 p-2 pb-0 shadow shadow-slate-400">
            {/* Image */}
            <Link to={`/recipes/${id}`}>
                <img src={`https://res.cloudinary.com/demo/image/fetch/w_300,f_auto/${imgSrc}`} alt={title} className="w-full h-36"/>
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
                <span className="relative bottom-2 right-1 font-bold">
                    {totalTimesFavorite}
                </span>
                <button className="pr-2" onClick={handleHeartClick}>
                    {isFavourite ? <RiHeart3Fill color="red" size="32px"/> : <RiHeart3Line size="32px"/>}
                </button>
            </div> 

        </section>
    )
}