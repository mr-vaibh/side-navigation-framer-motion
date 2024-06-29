import { motion } from "framer-motion"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useNavigation } from "../contexts/NavigationContext"

interface Props {
  children: React.ReactNode
  name: string
  setSelectedProject: (val: string | null) => void
}

const ProjectLink = ({ children, name, setSelectedProject }: Props) => {
  const { isOpen } = useNavigation();

  const handleClick = () => {
    setSelectedProject(null)
    setTimeout(() => {
      setSelectedProject(name)
    }, 250)
  }
  return (
    <a
      href="#"
      onClick={handleClick}
      className="flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100"
    >
      {children}
      <div className="flex overflow-clip place-items-center justify-between w-full">
        <p className="text-inherit truncate whitespace-nowrap tracking-wide">
          {name}
        </p>
        <motion.div
          className={`transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <ChevronRightIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
        </motion.div>
      </div>
    </a>
  )
}

export default ProjectLink
