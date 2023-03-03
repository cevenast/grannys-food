import Tag from './Tag'

export default function Card({title, userName, userId, tags, imgSrc, id, description}){
    const tagList = tags.map((tag, index) => <Tag tag={tag} key={index}/>)


    return(
        <section className="flex flex-col flex-wrap justify-start h-[22rem] w-60 mb-12 mx-auto p-2 shadow shadow-slate-400">

            <a href={`/recipes/${id}`}><img src={imgSrc} alt={title} className="w-56 h-36"/></a>
            <h3 className="w-full text-2xl pt-2"><a href={`/recipes/${id}`} className=" hover:text-[#4a7b8a]">{title}</a></h3>
            <span className="align-top text-xs text-zinc-400"><a className="hover:text-[#cdbbb2]" href={`user/${userId}`}>{`@${userName}`}</a></span>
            <p className="text-xs pt-4">{description}</p>
            <div className="flex flex-row flex-wrap justify-start pt-4">
                {tagList}
            </div>


            

        </section>
    )
}