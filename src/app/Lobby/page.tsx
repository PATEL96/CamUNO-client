"use client"

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSocket } from "../context/SocketProvider";
import { useGameIdContext } from "../context/GameIdProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import styles from './page.module.css';
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

export default function Lobby() {
  const [gameId, setGameId] = useState(1258);
  const [playerName, setPlayerName]: any = useState();
  const [message, setMessage] = useState("");
  const [gameSettings, setGameSettings] = useState(2);
  const router = useRouter();

  const { data: session } = useSession();

  const { socket } = useSocket();
  const { setValue } = useGameIdContext();

  console.log(socket.id);

  useEffect(() => {
    if (session) {
      setPlayerName(session.user?.name)
    }
  }, [session])

  const joinGame = () => {
    if (!gameId || !playerName) {
      setMessage("Please enter a valid game ID and player name");
      return;
    }

    socket.emit("join", { gameId, playerName, gameSettings });

    socket.on("join_success", (data: any) => {
      setMessage(data);
      setValue(gameId)
      router.push(`/Game?gameId=${gameId.toString()}`)
      // Redirect or navigate to the game page
    });

    socket.on("join_error", (error: any) => {
      setMessage(error);
    });
  };

  const hostGame = () => {
    if (!playerName) {
      setMessage("Please enter a valid player name");
      return;
    }

    socket.emit("host", { playerName, gameSettings });

    socket.on("host_success", (data: any) => {
      const { gameId } = data;
      console.log(gameId);

      setValue(gameId);
      // console.log(message);
      router.push(`/Game?gameId=${gameId.toString()}`)
      // Redirect or navigate to the game page
    });
  };

  const handleID = (event: any) => {
    const val = event.target.value;

    const intGame = parseInt(val)

    setGameId(intGame);

  }

  const handleChangeSettings = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const value = parseInt(event.target.value)
    setGameSettings(parseInt(event.target.value));
  }

  return (
    <div className={styles.lobbyMain}>
      <div className={styles.welcome}>
        Welcome to CamUNO
      </div>
      <div className={styles.container}>
        <div className={styles.JoinButton}>
          <Dialog>
            <DialogTrigger>Join Lobby</DialogTrigger>
            <DialogContent className="w-90 bg-black">
              <DialogHeader>
                <DialogTitle className="text-center p-4" style={{fontFamily: "Monster", fontSize: "26px"}}>Enter Lobby ID</DialogTitle>
                <DialogDescription>
                  <div className=" flex flex-col items-center justify-center">
                    <div className="p-8 text-black text-lg font-extrabold">
                      <input type="number" placeholder="GameID" className="rounded-sm" value={gameId} onChange={handleID} />
                    </div>
                    <Button type="submit" variant="outline" className="px-3 w-20" onClick={joinGame} style={{fontFamily: "Monster", fontSize: "18px"}}>
                      Join
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                {message}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className={styles.HostButton}>
          <Dialog>
            <DialogTrigger>Host Lobby</DialogTrigger>
            <DialogContent className="w-90 bg-black">
              <DialogHeader>
                <DialogTitle className="text-center p-4" style={{fontFamily: "Monster", fontSize: "26px"}} >Set Player Limit</DialogTitle>
                <DialogDescription>
                  <div className=" flex flex-col items-center justify-center">
                    <div className="p-8 text-black text-lg font-extrabold">
                      <select name="gameOpions" onChange={handleChangeSettings} value={gameSettings.toString()}  >
                        <option value="2">2 Players</option>
                        <option value="3">3 Players</option>
                        <option value="4">4 Players</option>
                      </select>
                    </div>
                    <Button type="submit" variant="outline" className="px-3 w-20" onClick={hostGame} style={{fontFamily: "Monster", fontSize: "18px"}}>
                      Host
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {/* <button onClick={joinGame}>Join Game</button> */}
        {/* <button onClick={hostGame}>Host Game</button> */}
      </div>
    </div>
  );
};