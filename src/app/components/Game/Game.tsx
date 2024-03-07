"use client"
import React, { useEffect, useRef, useState } from "react"
import { Card, EmptyCard, GameCards } from "../cards/Card";
import styles from './Game.module.css'

type gameData = {
	gameId: number;
}

const Game: React.FC<{sessionID: number; playerName: string}> = function({sessionID, playerName}) {
	//? cards for Player And the Game
	const [playerDeck, setPlayerDeck] = useState([]);
	const [gameDeck, setGameDeck] = useState([]);
	const [test, setTest] = useState("");
	//? cards for Player And the Game

	//? colors required for the Game
	const red = "#FF5555";
	const yellow = "#FFAA00";
	const blue = "#5555FF";
	const green = "#55AA55";
	//? colors required for the Game

	// const randNo = () => Math.floor(Math.random() * 10);

	//? random Number and Color(with Rotation) Generation for the Cards
	const randNo = (isSpecial: boolean) => {
		if(isSpecial != true){
			const num = Math.floor(Math.random() * 10).toString();
			return{card: num}
		}else{
			const cards = ["1","2","3", "4", "5", "6", "7", "8", "9", "0", "skip", "rev", "+2"]
			const num = cards[Math.floor(Math.random() * cards.length)]
			return{card: num}
		}
	}
	
	const randCol = () => {
		const colors = [red, yellow, blue, green];
		const col = Math.floor(Math.random() * colors.length);
		return {
			color: colors[col]
		};
	};

	// const sayUno = () => {
	// 	if(playerDeck.length == 2){
	// 		alert("Say UNO!");
	// 		return true
	// 	}
	// 	return false
	// }
	//? random Number and Color(with Rotation) Generation for the Cards

	//? Giving out the Starting Hand for Begining the Game
	const hasMounted = useRef(false);
	
	useEffect(() => {
		if (!hasMounted.current) {
			for (let i = 7; i >= 0; i--) {
				const { color, rot } = randCol();
				const{ card } = randNo(true);
				setPlayerDeck((prevCards) => [
					...prevCards,
					<Card name={card} color={color} key={prevCards.length} playaerDeck={playerDeck} />,
				]);
			}
			const {color} = randCol();
			const{ card } = randNo(false);
			setGameDeck((prevDeck) => [
				...prevDeck,
				<GameCards name={card} color={color} key={prevDeck.length} />
			]);
			hasMounted.current = true;
			// socket.emit('join', {"Name": "RAJ", "GameId": gameId})
		}
	}, []);
	//? Giving out the Starting Hand for Begining the Game
	
	//? Updating Game after a user Plays a Card
	const updateGamedeck = (Card) => {
		setGameDeck((prevDeck) => [
			...prevDeck,
			<GameCards
			key={prevDeck.length}
			name={Card.props.name}
			color={Card.props.color}
			/>,
		]);
	};
	//? Updating Game after a user Plays a Card
	
	//? Updating Players Hand After he picks a Card
	const pickNewCard = () => {
		const { color } = randCol();
		const{ card } = randNo(true);
		setPlayerDeck((prevCards) => [
			...prevCards,
			<Card
			name={card}
			key={prevCards.length}
			color={color}
			/>,
		]);
	};
	//? Updating Players Hand After he picks a Card

	//? Automated Sorting Algo to Sort al cards according to color and number
	const sortedDeck = (a, b) => {
		const ele1 = a.props.color.toLowerCase();
		const ele2 = b.props.color.toLowerCase();
		
		return ele1.localeCompare(ele2);
	}
	
	playerDeck.sort((a, b) => (a.props.name > b.props.name) ? 1 : -1);
	
	const coloredDeck = playerDeck.slice().sort(sortedDeck);
	//? Automated Sorting Algo to Sort al cards according to color and number
	
	//? Function to Place a card from Deck
	const placeCard = (index) => {
		const updatedDeck = [...coloredDeck];
		if (coloredDeck[index].props.name == gameDeck[gameDeck.length - 1].props.name || coloredDeck[index].props.color == gameDeck[gameDeck.length - 1].props.color) {
			updateGamedeck(coloredDeck[index]);
			updatedDeck.splice(index, 1);
			setPlayerDeck(updatedDeck);
		}
	}
	//? Function to Place a card from Deck
	
	return (
		<div className={styles.main}>
			<div className={styles.Deck}>
				<EmptyCard addCard={pickNewCard} />
			</div>
			<div className={styles.gameDeck}>
				{gameDeck}
			</div>
			<div className={styles.playerDeck}>
				{coloredDeck.map((Cards, index) => (
					<div key={index} onClick={() => placeCard(index)}>{Cards}</div>
					))}
			</div>
			{sessionID + " " +playerName}
		</div>
	)
}

export default Game;