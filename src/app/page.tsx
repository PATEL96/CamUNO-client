import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "../components/UserCard"
import Game from "../components/Game/Game"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <>
          <UserCard user={session?.user} />
          <Game sessionID={111} playerName="RAJ" />
        </>
      ) : (
        // <h1 className="text-5xl">You Shall Not Pass!</h1>
        <h1>lol</h1>
      )}
    </>
  )
}
