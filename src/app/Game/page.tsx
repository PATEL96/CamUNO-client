"use client"
import React, { use, useEffect, useRef, useState } from "react"
import { Card, EmptyCard, GameCards } from "../../components/cards/Card";
import styles from './Game.module.css'
import { useRouter } from "next/navigation";
import { useSocket } from "../context/SocketProvider";
import { useGameIdContext } from "../context/GameIdProvider";

function Game() {

	//? cards for Player And the Game
	const [playerDeck, setPlayerDeck]: any = useState([]);
	const [gameDeck, setGameDeck]: any = useState([]);
	const [saidUNO, setSaidUNO] = useState(false);
	const [chance, setChance] = useState();
	const { socket } = useSocket();
	const playerId = socket.id;

	const Chances = (players: any[]) => {
		const currentPlayerIndex = players.indexOf(chance);
		const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
		setChance(players[nextPlayerIndex]);
	}

	// console.log(socket.id);
	//? cards for Player And the Game

	//? colors required for the Game
	const red = "#FF5555";
	const yellow = "#FFAA00";
	const blue = "#5555FF";
	const green = "#55AA55";
	//? colors required for the Game

	const router = useRouter();
	const { value } = useGameIdContext();

	// const randNo = () => Math.floor(Math.random() * 10);

	//? random Number and Color(with Rotation) Generation for the Cards
	const randNo = (isSpecial: boolean) => {
		if (isSpecial != true) {
			const num = Math.floor(Math.random() * 10).toString();
			return { card: num }
		} else {
			const cards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "🚫", "🔀", "+2"]
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
	const setServerGameDeck = (deck: any) => {
		const data = {
			gameId: value,
			playerName: socket.id,
			deck: deck
		};

		socket.emit('update-game-deck', data);
	}

	useEffect(() => {
		const id = value;
		console.log("line 77:", id)
		// setServerGameDeck(gameDeck);
		if (!hasMounted.current) {
			for (let i = 7; i >= 0; i--) {
				const { color } = randCol();
				const { card } = randNo(true);
				setPlayerDeck((prevCards: any) => [
					...prevCards,
					<Card name={card} color={color} key={prevCards.length} />,
				]);
				socket.emit('set-player-card-count', (playerDeck.length));
			}


			const hostData = {
				gameId: value,
				playerId: socket.id,
			}

			socket.emit('check-host', hostData);

			socket.on('valid-host', (data: any) => {
				const { isValid } = data;
				if (isValid) {
					const { color } = randCol();
					const { card } = randNo(false);

					const cardData = {
						name: card,
						color: color
					}

					setServerGameDeck(cardData);

					setGameDeck((prevDeck: any) => [
						...prevDeck,
						<GameCards name={card} color={color} key={prevDeck.length} />
					]);
					setChance(socket.id);
				}
			});

			hasMounted.current = true;
		}

		socket.on('take-deck', (data: any) => {
			const { cardOnTop } = data

			const { color, name } = cardOnTop

			setGameDeck((prevDeck: any) => [
				...prevDeck,
				<GameCards name={name} color={color} key={prevDeck.length} />
			])
		})
	});
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
		const cardData = {
			name: Card.props.name as string,
			color: Card.props.color as string
		}
		setServerGameDeck(cardData);
	};
	//? Updating Game after a user Plays a Card

	const checkChance = () => {
		var ch = false
		socket.on('next-chance', (data: any) => {
			const { nextChance } = data

			if (nextChance == playerId) {
				console.log("hii")
				ch = true;
			}
		})

		return ch;
	}

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
		const playedData = {
			gameId: value,
			playerId: socket.id,
		}
		socket.emit('i-played', playedData)
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
		if (playerDeck.length === 1) {
			prompt("Say Uno");
			setSaidUNO(true);
		} else if (playerDeck.length > 1) {
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
			const playedData = {
				gameId: value,
				playerId: socket.id,
			}
			socket.emit('i-played', playedData)
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
			{value}
		</div>
	)
}

export default Game;