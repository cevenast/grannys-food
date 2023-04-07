import { RiArrowDownSLine, RiArrowRightSLine } from "react-icons/ri"

export default function SideMenuTab({ title, handleClick, isActive,  }) {
  return(
    <li>
      <button className="p-2 pr-2 w-full rounded-none lg:rounded-r-2xl text-left hover:bg-gray-5 dark:hover:bg-gray-80 relative flex items-center justify-between pl-5 text-base font-bold text-base text-link dark:text-link-dark bg-highlight dark:bg-highlight-dark border-blue-40 hover:bg-highlight hover:text-link dark:hover:bg-highlight-dark dark:hover:text-link-dark"
              onClick={(event) => handleClick(event)}>
        <span>{title}</span>
        <span>{isActive ? <RiArrowDownSLine size="1.8em"/> : <RiArrowRightSLine size="1.8em"/>}</span>
      </button>
    </li>
  )
}