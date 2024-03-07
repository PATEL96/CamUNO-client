import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "./components/UserCard"
import Game from "./components/Game/Game"
import { io } from "socket.io-client"

const socket = io("http://192.168.0.103:5000");

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <>
          {/* <UserCard user={session?.user} pagetype={"Home"} /> */}
          <Game sessionID={111} playerName="RAJ" />
        </>
      ) : (
        <h1 className="text-5xl">You Shall Not Pass!</h1>
      )}
    </>
  )
}
