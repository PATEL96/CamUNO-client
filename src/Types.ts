type User = {
	name?: string | null | undefined;
	email?: string | null | undefined;
	image?: string | null | undefined;
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