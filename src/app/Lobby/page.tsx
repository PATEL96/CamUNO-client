"use client"

import React, { useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

const Lobby = () => {
  const [gameId, setGameId] = useState("9696");
  const [playerName, setPlayerName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const socket = io("http://134.209.155.223:5000"); // Replace PORT with your server port

  const joinGame = () => {
    if (!gameId || !playerName) {
      setMessage("Please enter a valid game ID and player name");
      return;
    }

    socket.emit("join", { gameId, playerName });

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

    socket.emit("host", {gameId, playerName});

    socket.on("host_success", (data) => {
      setMessage(data);
	  router.push(`/Game?gameId=${gameId.toString()}`)
      // Redirect or navigate to the game page
    });
  };

  return (
    <div>
      <h1>Welcome to the Game Lobby</h1>
      <br />
      <input
        type="text"
        placeholder="Enter Your Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <br />
      <button onClick={joinGame}>Join Game</button>
      <button onClick={hostGame}>Host Game</button>
      <br />
      <p>{message}</p>
    </div>
  );
};

export default Lobby;
