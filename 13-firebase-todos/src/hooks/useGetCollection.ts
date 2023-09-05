import { getDocs, collection } from "firebase/firestore"
import { db } from "../services/firebase"

const useGetCollection = <T>(collectionName: string) => {
	const getCollection = async () => {
		const snapshot = await getDocs(collection(db, collectionName))

		if (snapshot.empty) return

		return snapshot.docs.map(doc => {
			return {
				_id: doc.id,
				...doc.data()
			}
		}) as T
	}

	return {
		getCollection
	}
}

export default useGetCollection
