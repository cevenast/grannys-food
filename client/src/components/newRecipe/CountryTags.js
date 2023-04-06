import PostTag, {tags} from './PostTag'

export default function CountryTags({ selectedTags, size }){
  return Object.keys(tags.country).map((tag, index) => <PostTag tag={tag} selectedTags={selectedTags} key={index} size={size}/> )
}