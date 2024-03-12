import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import UserCard from "../components/UserCard"
import Game from "./Game/page"
import Lobby from "./Lobby/page"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      {session ? (
        <>
          {/* <Game sessionID={111} playerName="RAJ" /> */}
          <Lobby />
        </>
      ) : (
        <>
          <h1>lol</h1>
        </>
      )}
    </>
  )
}
