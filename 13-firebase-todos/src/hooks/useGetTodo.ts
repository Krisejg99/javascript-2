import { Todo } from "../types/Todo.types"
import { useEffect, useState } from "react"
import useGetDocument from "./useGetDocument"

const useGetTodo = (id: string) => {
	const [todo, setTodo] = useState<Todo | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const { getDocument } = useGetDocument<Todo>('todos', id)

	const getTodo = async () => {
		setLoading(true)

		const data = await getDocument()
		if (!data) return setError('Could not get todo')

		setTodo(data)
		setLoading(false)
	}

	useEffect(() => {
		getTodo()
	}, [])

	return {
		todo,
		loading,
		error,
		refetch: getTodo
	}
}

export default useGetTodo
