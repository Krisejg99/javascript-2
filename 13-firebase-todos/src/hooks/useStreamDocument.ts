import { CollectionReference, doc, getDoc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

const useStreamDocument = <T>(colRef: CollectionReference<T>, documentId: string) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		const docRef = doc(colRef, documentId)

		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			if (!snapshot.exists()) {
				setData(null)
				setLoading(false)
				setError(true)
				return
			}

			const data: T = {
				...snapshot.data(),
				_id: snapshot.id,
			}

			setData(data)
			setLoading(false)
		})

		return unsubscribe
	}, [colRef, documentId])

	return {
		data,
		loading,
		error,
	}
}

export default useStreamDocument
