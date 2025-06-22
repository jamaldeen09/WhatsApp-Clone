import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowRight, faExclamationTriangle, faGrinStars, faPaperPlane, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { 
    PhoneIcon,
    Cog6ToothIcon, 
    ChatBubbleBottomCenterTextIcon,
    PlayCircleIcon,
    UserCircleIcon,
    SquaresPlusIcon,
    EllipsisVerticalIcon,
    ChevronDownIcon,
    UserGroupIcon,
    ArchiveBoxArrowDownIcon,
    StarIcon,
    ArrowRightStartOnRectangleIcon,
    ArrowLeftIcon,
    UserPlusIcon
  } from '@heroicons/react/24/outline'



export const arrowRight = <FontAwesomeIcon icon={faArrowRight} />
export const errorIcon = <FontAwesomeIcon icon={faExclamationTriangle} />
export const phone = <PhoneIcon className="w-6 h-6 max-lg:w-8 max-lg:h-8 "/>
export const settings = <Cog6ToothIcon className="w-6 h-6 max-lg:w-8 max-lg:h-8 "/>
export const message = <ChatBubbleBottomCenterTextIcon className="w-6 h-6 max-lg:w-8 max-lg:h-8 "/>

export const aiIcon = <img src="https://cdn-icons-png.freepik.com/256/13298/13298257.png" className="w-6 h-6 max-lg:w-8 max-lg:h-8 "/>
export const statusIcon = <PlayCircleIcon className="w-6 h-6 max-lg:w-8 max-lg:h-8 "/>
export const defaultProfile = <UserCircleIcon className="w-6 h-6 max-lg:w-8 max-lg:h-8"/>
export const squaresPlus = <SquaresPlusIcon className="w-6 h-6"/>
export const ellipse = <EllipsisVerticalIcon className="w-6 h-6"/>
export const searchIcon = <FontAwesomeIcon icon={faSearch} />
export const arrowDown = <ChevronDownIcon className="w-6"/>
export const navElipse = <EllipsisVerticalIcon className="w-7 h-7"/>
export const plus = <FontAwesomeIcon icon={faPlus} />
export const grinStars = <FontAwesomeIcon icon={faGrinStars} />
export const paperPlane = <FontAwesomeIcon icon={faPaperPlane} />
export const userGroup = <UserGroupIcon className="w-6 h-6"/>
export const archive = <ArchiveBoxArrowDownIcon className="w-6 h-6" />
export const star = <StarIcon className="w-6 h-6" />
export const logout = <ArrowRightStartOnRectangleIcon className="w-6 h-6"/>
export const arrowLeft = <ArrowLeftIcon className="w-6 h-6"/>
export const userGroup2 = <UserGroupIcon className="w-8 h-8"/>
export const userPlus = <UserPlusIcon className="w-8 h-8"/>
 