import { Checkbox } from "@/components/ui/checkbox"

interface SidebarPerson {
    bio: string,
    name: string,
    profilePic: string,
    showTick?: boolean
}

const SidebarPerson = ({ bio, name, profilePic,showTick }: SidebarPerson) => {
  return (
    <div className="flex">


        {/* Main Area */}
        <div className="w-full flex gap-4 items-center hover:bg-gray-300 hover:cursor-pointer rounded-lg py-4 px-4
        transition-all">

            <div className="w-full flex gap-4 items-center">
             <img 
              src={profilePic || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
              alt={`${name}'s Profile Picture`}
              className="w-12 h-12 rounded-full"
              />

              <div className="flex flex-col gap-1">
                <p className="font-extrabold text-xl">{name || "Jamaldeen"}</p>
                <p className="text-sm">{bio || "I love football"}</p>
              </div>
            </div>

            <div
             className={`${showTick ? "block" : "hidden"}`}
            >
              <Checkbox />
            </div>
        </div>
    </div>
  )
}

export default SidebarPerson