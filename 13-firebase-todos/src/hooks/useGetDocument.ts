import { doc, getDoc } from "firebase/firestore"
import { db } from "../services/firebase"

const useGetDocument = <T>(name: string, id: string) => {
	const getDocument = async () => {
		const snapshot = await getDoc(doc(db, name, id))

		if (!snapshot.exists()) return

		return {
			_id: snapshot.id,
			...snapshot.data()
		} as T
	}

	return {
		getDocument
	}
}

export default useGetDocument
