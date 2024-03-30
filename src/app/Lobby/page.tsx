"use client"

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSocket } from "../context/SocketProvider";
import { useGameIdContext } from "../context/GameIdProvider";

export default function Lobby() {
  const [gameId, setGameId] = useState(1258);
  const [playerName, setPlayerName]: any = useState();
  const [message, setMessage] = useState("");
  const [gameSettings, setGameSettings] = useState(3);
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

  return (
    <div>
      <h1>Welcome to the Game Lobby</h1>
      <input type="number" placeholder="GameID" value={gameId} onChange={handleID} style={{ color: "black" }} />
      <button onClick={joinGame}>Join Game</button>
      <button onClick={hostGame}>Host Game</button>
      <br />
      <p>{message}</p>
    </div>
  );
};