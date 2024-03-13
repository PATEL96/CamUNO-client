type User = {
	name?: string | null;
	email?: string | null;
	image?: string | null;
} | undefined

type Props = {
	user: User,
}

type Cards = {
	name: String
	color: String
}

type playedCard = {
	name: String
	color: String
}

export type { User, Props, playedCard, Cards };