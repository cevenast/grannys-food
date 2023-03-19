

export default function GoogleAuth(props){
  return(
    <>
    
    <a href="/auth/google">
    <div className="h-11 w-full px-4 py-2 mt-12 text-center bg-slate-200 hover:bg-slate-300 duration-200 ">  
      <span className="text-sm pl-8 align-middle font-bold text-slate-700 bg-[url('/bg-google.svg')] bg-no-repeat bg-left bg-contain ">Continue with Google</span>
    </div>
    </a>

    </>
  )
}