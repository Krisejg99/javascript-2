import { Timestamp } from "firebase/firestore"

export type Meme = {
	_id: string
	name: string
	path: string
	type: string
	size: number
	uid: string
	url: string
	created: Timestamp
}
