import { MouseEventHandler, useEffect, useState } from 'react'
import type { Cards, playedCard } from '@/Types'
import styles from './Card.module.css'


export function Card(data: Cards) {
	return (
		<div className={styles.Card} style={{ color: data.color as string, border: "10px solid" + data.color }} >
			{
				data.name == "6" || data.name == "9" ?
					<>
						<div className={styles.numberTop} style={{ background: data.color as string, textDecoration: "underLine", textDecorationThickness: "3.5px" }}>{data.name}</div>
						<div className={styles.mainNum} style={{ color: data.color as string, fontSize: "100px", textDecoration: "underLine" }} >{data.name}</div>
						<div className={styles.numberBottom} style={{ background: data.color as string, textDecoration: "underLine", textDecorationThickness: "3.5px" }}>{data.name}</div>
					</> :
					<>
						<div className={styles.numberTop} style={{ background: data.color as string }}>{data.name}</div>
						<div className={styles.mainNum} style={{ color: data.color as string, fontSize: "100px" }} >{data.name}</div>
						<div className={styles.numberBottom} style={{ background: data.color as string }}>{data.name}</div>
					</>
			}
			{/* <div className={styles.numberTop} style={{ background: data.color }}>{data.name}</div>
			<div className={styles.mainNum} style={{ color: data.color, fontSize: "100px" }} >{data.name}</div>
			<div className={styles.numberBottom} style={{ background: data.color }}>{data.name}</div> */}
		</div>
	);
}

export function EmptyCard(data: { addCard: MouseEventHandler<HTMLDivElement> }) {
	return (
		<div className={styles.EmptyCard} onClick={data.addCard}></div>
	);
}

export function GameCards(data: playedCard) {

	const [rot, setRot] = useState(0);

	useEffect(() => {
		setRot(Math.random() * (360 - (-360) + 1) - 360)
	}, []);

	return (
		<div className={styles.GameCard} style={{ color: data.color as string, border: "10px solid" + data.color, rotate: rot.toString() + "deg" }} >
			{
				data.name == "6" || data.name == "9" ?
					<>
						<div className={styles.numberTop} style={{ background: data.color as string, textDecoration: "underLine", textDecorationThickness: "3.5px" }}>{data.name}</div>
						<div className={styles.mainNum} style={{ color: data.color as string, fontSize: "100px", textDecoration: "underLine" }} >{data.name}</div>
						<div className={styles.numberBottom} style={{ background: data.color as string, textDecoration: "underLine", textDecorationThickness: "3.5px" }}>{data.name}</div>
					</> :
					<>
						<div className={styles.numberTop} style={{ background: data.color as string }}>{data.name}</div>
						<div className={styles.mainNum} style={{ color: data.color as string, fontSize: "100px" }} >{data.name}</div>
						<div className={styles.numberBottom} style={{ background: data.color as string }}>{data.name}</div>
					</>
			}
			{/* <div className={styles.numberTop} style={{ background: data.color }}>{data.name}</div>
			<div className={styles.mainNum} style={{ color: data.color, fontSize: "100px" }} >{data.name}</div>
			<div className={styles.numberBottom} style={{ background: data.color }}>{data.name}</div> */}
		</div>
	);
}