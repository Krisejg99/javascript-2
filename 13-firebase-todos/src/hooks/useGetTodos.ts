import { collection, getDocs } from "firebase/firestore"
import { Todo, Todos } from "../types/Todo.types"
import { useEffect, useState } from "react"
import { db } from "../services/firebase"

const useGetTodos = () => {
	const [todos, setTodos] = useState<Todos | null>(null)
	const [loading, setLoading] = useState(true)

	const getTodos = async () => {
		setLoading(true)

		const snapshot = await getDocs(collection(db, 'todos'))

		const data: Todos = snapshot.docs.map(doc => {
			return {
				_id: doc.id,
				...doc.data()
			} as Todo
		})

		setTodos(data)
		setLoading(false)

		return data
	}

	useEffect(() => {
		getTodos()
	}, [])

	return {
		todos,
		loading,
		refetch: getTodos
	}
}

export default useGetTodos
