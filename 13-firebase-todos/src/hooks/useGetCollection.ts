import { CollectionReference, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

const useGetCollection = <T>(collection: CollectionReference) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const getCollection = async () => {
		setLoading(true)
		setError(false)

		const snapshot = await getDocs(collection)

		if (snapshot.empty) {
			setData(null)
			setLoading(false)
			setError(true)
			return
		}

		const data = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id,
			}
		}) as T

		setData(data)
		setLoading(false)
	}

	useEffect(() => {
		getCollection()
	}, [])

	return {
		data,
		loading,
		error,
		getCollection,
	}
}

export default useGetCollection
