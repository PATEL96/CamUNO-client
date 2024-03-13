"use client"

import React, { useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Lobby() {
  const [gameId, setGameId] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [message, setMessage] = useState("");
  const [gameSettings, setGameSettings] = useState(2);
  const router = useRouter();
  const socket = io("http://134.209.155.223:5000");
  // const socket = io('http://192.168.0.102:5000')

  const session = await getServerSession(options);

  if(session?.user?.name){
    const name = session?.user?.name;
    setPlayerName(name);
  }

  const joinGame = () => {
    if (!gameId || !playerName) {
      setMessage("Please enter a valid game ID and player name");
      return;
    }

    socket.emit("join", { gameId, playerName, gameSettings });

    socket.on("join_success", (data) => {
      setMessage(data);
      router.push(`/Game?gameId=${gameId.toString()}`)
      // Redirect or navigate to the game page
    });

    socket.on("join_error", (error) => {
      setMessage(error);
    });
  };

  const hostGame = () => {
    if (!playerName) {
      setMessage("Please enter a valid player name");
      return;
    }

    socket.emit("host", { playerName, gameSettings });

    socket.on("host_success", (data) => {
      const { gameId } = data;
      console.log(gameId);
      // console.log(message);
      router.push(`/Game?gameId=${gameId.toString()}`)
      // Redirect or navigate to the game page
    });
  };

  return (
    <div>
      <h1>Welcome to the Game Lobby</h1>
      <button onClick={joinGame}>Join Game</button>
      <button onClick={hostGame}>Host Game</button>
      <br />
      <p>{message}</p>
    </div>
  );
};
