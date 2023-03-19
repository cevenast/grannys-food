export default function AuthContainer({title, children}){
  return(
    <main className="flex justify-center py-10">
    <section className="py-8 px-8 w-full h-108 bg-slate shadow-md shadow-slate-400">
      <h2 className="text-3xl font-bold pb-12">{title}</h2>
      {children}
    
    </section>
    </main>
  )
}