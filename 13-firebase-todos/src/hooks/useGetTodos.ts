import { Todos } from "../types/Todo.types"
import { useEffect, useState } from "react"
import useGetCollection from "./useGetCollection"

const useGetTodos = () => {
	const [todos, setTodos] = useState<Todos | null>(null)
	const [loading, setLoading] = useState(true)

	const { getCollection } = useGetCollection<Todos>('todos')

	const getTodos = async () => {
		setLoading(true)

		const data = await getCollection()

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
