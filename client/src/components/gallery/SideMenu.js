import { RiCloseFill } from 'react-icons/ri'

export default function SideMenu({ children, show, toggleShow }){

  // if (show && window.innerWidth < 1024){
    // {console.log('chiquitin')}

    return(
      <div className="lg:-mt-8 lg:w-3/12" >
        <div className={`${show ? 'pt-20 sm:pt-28 w-64 fixed top-0 left-0  py-0 shadow shadow-none'
                                :  "pt-20 sm:pt-28  fixed top-0 left-0  py-0 shadow shadow-none lg:pt-16 fixed lg:sticky top-0 left-0 right-0 py-0 shadow lg:shadow-none"}`}>
          <div className={`${show ? "sticky bg-white top-0 bottom-0 h-[calc(100vh-4rem)] flex flex-col "
                                  : "sticky top-0 lg:bottom-0 lg:h-[calc(100vh-4rem)] flex flex-col"}`}>
            <div className={`${show ? "overflow-y-scroll no-bg-scrollbar grow bg-wash dark:bg-wash-dark"
                                    : "overflow-y-scroll no-bg-scrollbar grow bg-wash dark:bg-wash-dark" }`} style={{overscrollBehavior:'contain'}}>
              <aside className={`${show ? 'grow flex-col w-full pb-8 pb-0 max-w-xs z-10 block'
                                         : "lg:grow flex-col w-full pb-8 lg:pb-0 lg:max-w-xs z-10 hidden lg:block"}`}>
                {show && <button onClick={() => toggleShow(false)} className="lg:hidden inline absolute right-6 top-8"><RiCloseFill size="2em"/></button>}
                {children}

              </aside>
            </div>
          </div>
        </div>
      </div>

    )
    }
  //   return(
  //     <div className="lg:hidden">
  //       <div className="pt-20 sm:pt-28 w-64 fixed top-0 left-0  py-0 shadow shadow-none">
  //         <div className="sticky bg-white top-0 bottom-0 h-[calc(100vh-4rem)] flex flex-col">
  //           <div className="overflow-y-scroll no-bg-scrollbar grow bg-wash dark:bg-wash-dark" style={{overscrollBehavior:'contain'}}>
  //             <aside  className="grow flex-col w-full pb-8 pb-0 max-w-xs z-10 block">
  //               <button onClick={() => toggleShow(false)} className="lg:hidden inline absolute right-6 top-8"><RiCloseFill size="2em"/></button>

  //               {children}

  //             </aside>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  // return(
  //   <div className="lg:-mt-8 lg:w-3/12" >
  //     <div className="lg:pt-16 fixed lg:sticky top-0 left-0 right-0 py-0 shadow lg:shadow-none">
  //       <div className="sticky top-0 lg:bottom-0 lg:h-[calc(100vh-4rem)] flex flex-col">
  //         <div className="overflow-y-scroll no-bg-scrollbar grow bg-wash dark:bg-wash-dark" style={{overscrollBehavior:'contain'}}>
  //           <aside className="lg:grow flex-col w-full pb-8 lg:pb-0 lg:max-w-xs z-10 hidden lg:block">

  //             {children}

  //           </aside>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
// }