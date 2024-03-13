import Image from "next/image"
import {  PersonIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Props } from "@/Types"

export default function UserCard({ user }: Props) {

  const userName = user?.name ? (
    <div className="font-bold text-3xl">
      {user?.name}
    </div>
  ) : null

  const userImage = user?.image ? (
      <Image
        className="border-2 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto"
        src={user?.image}
        width={50}
        height={0}
        alt={user?.name ?? "Profile Pic"}
        priority={true}
      />
  ) : <PersonIcon className="border-2 h-8 w-8 p-1 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto" />

  return (
    <div className="absolute z-10 right-0 m-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            {userImage}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-inherit">
          <DialogHeader>
            <DialogTitle className="w-60 flex justify-center items-center">
              {userImage}
              {userName}
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="default" className=" font-bold text-xl">
                <Link href="/api/auth/signout">SignOut</Link>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
