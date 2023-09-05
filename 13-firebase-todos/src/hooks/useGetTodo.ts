import { Todo } from "../types/Todo.types"
import { useEffect, useState } from "react"
import { db } from "../services/firebase"
import { doc, getDoc } from "firebase/firestore"

const useGetTodo = (id: string) => {
	const [todo, setTodo] = useState<Todo | null>(null)
	const [loading, setLoading] = useState(true)

	const getTodo = async () => {
		setLoading(true)

		const snapshot = await getDoc(doc(db, 'todos', id ?? '0'))
		if (!snapshot.exists) return

		const data = {
			_id: snapshot.id,
			...snapshot.data()
		} as Todo

		setTodo(data)
		setLoading(false)
	}

	useEffect(() => {
		getTodo()
	}, [])

	return {
		todo,
		loading,
		refetch: getTodo
	}
}

export default useGetTodo
