"use client"
import React, { useEffect, useRef, useState } from "react"
import { Card, EmptyCard, GameCards } from "../../components/cards/Card";
import styles from './Game.module.css'
import { useRouter } from "next/navigation";

function Game() {

	//? cards for Player And the Game
	const [playerDeck, setPlayerDeck]: any = useState([]);
	const [gameDeck, setGameDeck]: any = useState([]);
	const [gameId, setGameId] = useState("");
	const [saidUNO, setSaidUNO] = useState(false);
	//? cards for Player And the Game

	//? colors required for the Game
	const red = "#FF5555";
	const yellow = "#FFAA00";
	const blue = "#5555FF";
	const green = "#55AA55";
	//? colors required for the Game

	const router = useRouter();

	const getParamsFromUrl = () => {
		const params = new URLSearchParams(window.location.search);
		const gameId = params.get('gameId');
		if (gameId) {
			setGameId(gameId);
		}
	};

	// const randNo = () => Math.floor(Math.random() * 10);

	//? random Number and Color(with Rotation) Generation for the Cards
	const randNo = (isSpecial: boolean) => {
		if (isSpecial != true) {
			const num = Math.floor(Math.random() * 10).toString();
			return { card: num }
		} else {
			const cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "skip", "rev", "+2"]
			const num = cards[Math.floor(Math.random() * cards.length)]
			return { card: num }
		}
	}

	const randCol = () => {
		const colors = [red, yellow, blue, green];
		const col = Math.floor(Math.random() * colors.length);
		return {
			color: colors[col]
		};
	};
	//? random Number and Color(with Rotation) Generation for the Cards

	//? Giving out the Starting Hand for Begining the Game
	const hasMounted = useRef(false);

	useEffect(() => {
		getParamsFromUrl();
		if (!hasMounted.current) {
			for (let i = 7; i >= 0; i--) {
				const { color } = randCol();
				const { card } = randNo(true);
				setPlayerDeck((prevCards: any) => [
					...prevCards,
					<Card name={card} color={color} key={prevCards.length} />,
				]);
			}
			const { color } = randCol();
			const { card } = randNo(false);
			setGameDeck((prevDeck: any) => [
				...prevDeck,
				<GameCards name={card} color={color} key={prevDeck.length} />
			]);
			hasMounted.current = true;
			// socket.emit('join', {"Name": "RAJ", "GameId": gameId})
		}
	}, []);
	//? Giving out the Starting Hand for Begining the Game

	//? Updating Game after a user Plays a Card
	const updateGamedeck = (Card: any) => {
		setGameDeck((prevDeck: any) => [
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
		const { card } = randNo(true);
		setPlayerDeck((prevCards: any) => [
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
	const sortedDeck = (a: any, b: any) => {
		const ele1 = a.props.color.toLowerCase();
		const ele2 = b.props.color.toLowerCase();

		return ele1.localeCompare(ele2);
	}

	playerDeck.sort((a: any, b: any) => (a.props.name > b.props.name) ? 1 : -1);

	const coloredDeck = playerDeck.slice().sort(sortedDeck);
	//? Automated Sorting Algo to Sort al cards according to color and number

	//? Function to Place a card from Deck

	const checkWin = (playerDeck: any) => {
		if (playerDeck.length === 0 && saidUNO) {
			router.push('/');
		}
	}

	const sayUno = (playerDeck: any) => {
		if(playerDeck.length === 1){
			prompt("Say Uno");
			setSaidUNO(true);
		}else if(playerDeck.length > 1){
			setSaidUNO(false);
		}
	}

	const placeCard = (index: any) => {
		const updatedDeck = [...coloredDeck];
		if (coloredDeck[index].props.name == gameDeck[gameDeck.length - 1].props.name || coloredDeck[index].props.color == gameDeck[gameDeck.length - 1].props.color) {
			updateGamedeck(coloredDeck[index]);
			updatedDeck.splice(index, 1);
			setPlayerDeck(updatedDeck);
			sayUno(updatedDeck);
			checkWin(updatedDeck);
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
				{coloredDeck.map((Cards: any, index: any) => (
					<div key={index} onClick={() => placeCard(index)}>{Cards}</div>
				))}
			</div>
			{gameId.toString()}
			{/* <button onClick={handleLeave}>leave</button> */}
		</div>
	)
}

export default Game;