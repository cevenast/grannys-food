
export default function SideMenu({ children }){
  return(
    <div className="lg:-mt-8 lg:w-3/12" >
      <div className="lg:pt-16 fixed lg:sticky top-0 left-0 right-0 py-0 shadow lg:shadow-none">
        <div className="sticky top-0 lg:bottom-0 lg:h-[calc(100vh-4rem)] flex flex-col">
          <div className="overflow-y-scroll no-bg-scrollbar grow bg-wash dark:bg-wash-dark" style={{overscrollBehavior:'contain'}}>
            <aside className="lg:grow flex-col w-full pb-8 lg:pb-0 lg:max-w-xs z-10 hidden lg:block">

              {children}

            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}