import PostTag, {tags} from './PostTag'

export default function DietTags({ selectedTags, size }){
  return Object.keys(tags.diet).map((tag, index) => <PostTag tag={tag} selectedTags={selectedTags} key={index} size={size}/> )
}