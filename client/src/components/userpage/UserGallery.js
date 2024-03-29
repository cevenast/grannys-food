import Card from '../gallery/Card' 

 // Grabs the recipes from the user information and creates a gallery with Cards
export default function UserGallery({ recipes }){
    const cards = recipes.map(recipe => 
      <Card title={recipe.title} 
            username={recipe.user.username}
            tags={recipe.tags} 
            imgSrc={recipe.imgSrc} 
            id={recipe._id} 
            description={recipe.description} 
            isUserFavorite={recipe.isUserFavorite}
            totalFavorites={recipe.totalFavorites}
            key={recipe._id}
      />)
    return(
      <section className="grid grid-cols-1 min-[550px]:grid-cols-2 md:grid-cols-3 min-[1024px]:min-w-[800px] max-w-4xl mx-auto">
        {cards}
       </section>
    )
  }