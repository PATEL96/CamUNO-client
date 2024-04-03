import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "../components/UserCard"
import Game from "./Game/page"
import Lobby from "./Lobby/page"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <div>
      {session ? (
        <>
          <Lobby />
        </>
      ) : (
        <>
          <h1>PLease Login TO Continue</h1>
        </>
      )}
    </div>
  )
}
