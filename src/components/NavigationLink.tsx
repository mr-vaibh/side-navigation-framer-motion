import { motion } from "framer-motion"
import { useNavigation } from "../contexts/NavigationContext"
import { DropdownProvider, useDropdown } from "../contexts/NavigationDropdownContext";
import { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode
  name: string
  dropdownItems?: string[] | null
  isParentSideBar?: boolean
}

const NavigationLinkAnchor = ({ children, isDropDown = false, toggleDropdown }: { children: React.ReactNode, isDropDown?: boolean, toggleDropdown: MouseEventHandler<HTMLAnchorElement> }) => {
  return <a
    href="#"
    className={`flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100
     ${isDropDown ? "w-[11.5rem]" : "w-auto"} `}
    onClick={toggleDropdown}
  >
    {children}
  </a>
}

const NavigationDropdown = ({ dropdownItems, toggleDropdown }: { dropdownItems: string[] | null, toggleDropdown: MouseEventHandler<HTMLAnchorElement> }) => {
  const { isOpen } = useNavigation();
  return <div
    className={`relative text-neutral-400
                ${isOpen ? "left-60" : "left-16"}
                ${isOpen ? "top-[-2.5em]" : "top-[-3em]"}
                bg-neutral-800/20 rounded-md border-neutral-500/50 p-2`}
  >
    <ul>
      {
        dropdownItems?.map((dropDownLinkText, index) => <NavigationLinkAnchor key={index} isDropDown={true} toggleDropdown={toggleDropdown}>{dropDownLinkText}</NavigationLinkAnchor>)
      }
    </ul>
  </div>
}

const NavigationLink = ({ children, name, dropdownItems = null, isParentSideBar = false }: Props) => {
  const { openDropdown, setOpenDropdown } = useDropdown();
  const { isOpen } = useNavigation();

  const toggleDropdown = () => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      <div
        className="relative"
      >
        <NavigationLinkAnchor toggleDropdown={toggleDropdown}>
          {children}
          <motion.div
            className={`transition-opacity ${isParentSideBar ? (isOpen ? "opacity-100" : "opacity-0") : "opacity-100"}`}
          >
            <span className="text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide">
              {name}
            </span>
          </motion.div>

          {
            dropdownItems &&
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          }
        </NavigationLinkAnchor>

        {
          dropdownItems && (
            <div className={`absolute mt-2 transition-all duration-200 ease-in-out transform ${openDropdown === name ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <NavigationDropdown dropdownItems={dropdownItems} toggleDropdown={toggleDropdown} />
            </div>
          )
        }
      </div>
    </>
  )
}

const NavigationWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownProvider>
      {children}
    </DropdownProvider>
  );
};

export { NavigationWrap, NavigationLink };
