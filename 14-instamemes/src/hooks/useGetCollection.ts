import { CollectionReference, getDocs } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"

const useGetCollection = <T>(colRef: CollectionReference<T>) => {
	const [data, setData] = useState<T[] | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const getData = useCallback(async () => {
		setLoading(true)
		setError(false)

		const snapshot = await getDocs(colRef)

		if (snapshot.empty) {
			setData(null)
			setLoading(false)
			setError(true)
			return
		}

		const data: T[] = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				_id: doc.id,
			}
		})

		setData(data)
		setLoading(false)
	}, [colRef])

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

export default useGetCollection
