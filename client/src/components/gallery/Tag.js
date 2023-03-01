export default function Tag({tag}){
    const tags = {
        chile: {name: 'Chile', color:'bg-[#ff0000]', hoverColor:'bg-[#ff6666]'},
        argentina: {name: 'Argentina', color:'bg-[#8888ff]'},
        italia:{name:'Italia',color:'bg-[#00cc00]', hoverColor:'bg-[#66cc66]'},
        india:{name:'India', color:'bg-[#ff671f]', hoverColor:'bg-[#ffaa77]'}
    }
    const tagInfo = tags[tag]
    if (!tagInfo){
        return undefined
    }

    return( <a href={`/q?tags=${tag}`}>
            <span className={`${tagInfo.color} w-10 h-6 px-4 mr-2 rounded-xl text-sm font-bold hover:${tagInfo.hoverColor}`}>
                {tagInfo.name}
            </span>
            </a>
    )
}