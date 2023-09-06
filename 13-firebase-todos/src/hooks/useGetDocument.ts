import { CollectionReference, DocumentReference, doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

const useGetDocument = <T>(collection: CollectionReference, documentId: string) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const getDocument = async (documentId: string) => {
		setLoading(true)
		setError(false)

		const docRef = doc(collection, documentId) as DocumentReference<T>
		const snapshot = await getDoc(docRef)

		if (!snapshot.exists()) {
			setData(null)
			setLoading(false)
			setError(true)
			return
		}

		const data =  {
			...snapshot.data(),
			_id: snapshot.id,
		} as T

		setData(data)
		setLoading(false)
	}

	useEffect(() => {
		getDocument(documentId)
	}, [documentId])

	return {
		data,
		loading,
		error,
		getDocument,
	}
}

export default useGetDocument
