import { CollectionReference, doc, getDoc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"

const useGetDocument = <T>(colRef: CollectionReference<T>, documentId: string) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const getData = useCallback(async () => {
		setLoading(true)
		setError(false)

		const docRef = doc(colRef, documentId)
		const snapshot = await getDoc(docRef)

		if (!snapshot.exists()) {
			setData(null)
			setLoading(false)
			setError(true)
			return
		}

		const data: T =  {
			...snapshot.data(),
			_id: snapshot.id,
		}

		setData(data)
		setLoading(false)
	}, [colRef, documentId])

	useEffect(() => {
		getData()
	}, [getData])

	return {
		data,
		loading,
		error,
		getData,
	}
}

export default useGetDocument
