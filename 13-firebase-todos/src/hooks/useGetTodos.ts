import { Todos } from "../types/Todo.types"
import { useEffect, useState } from "react"
import useGetCollection from "./useGetCollection"

const useGetTodos = () => {
	const [todos, setTodos] = useState<Todos | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const { getCollection } = useGetCollection<Todos>('todos')

	const getTodos = async () => {
		setLoading(true)

		const data = await getCollection()
		if (!data) return setError('Could not get todos')

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
		error,
		refetch: getTodos
	}
}

export default useGetTodos
