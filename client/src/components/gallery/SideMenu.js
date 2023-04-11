import { RiCloseFill } from 'react-icons/ri'

export default function SideMenu({ children, show, toggleShow }){

    return(
      <div className="lg:-mt-8 lg:w-3/12" >
        <div className={`${show ? 'lg:pt-20 sm:pt-28 w-64 fixed top-0 left-0  py-0 shadow shadow-none'
                                :  "lg:pt-20 sm:pt-28 fixed top-0 left-0 py-0 shadow shadow-none lg:pt-16 lg:sticky right-0"}`}>
          <div className={`${show ? "sticky bg-white top-0 bottom-0 h-[calc(100vh-4rem)] flex flex-col "
                                  : "sticky top-0 lg:bottom-0 lg:h-[calc(100vh-4rem)] flex flex-col"}`}>
            <div className={"overflow-y-scroll no-bg-scrollbar grow bg-wash dark:bg-wash-dark"} style={{overscrollBehavior:'contain'}}>
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