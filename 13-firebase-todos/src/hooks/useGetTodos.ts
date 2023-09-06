import useGetCollection from "./useGetCollection"
import { todosCol } from "../services/firebase"
import { Todos } from "../types/Todo.types"

const useGetTodos = () => {
	const { data: todos, loading, error, getCollection: getTodos } = useGetCollection<Todos>(todosCol)

	return {
		todos,
		loading,
		error,
		getTodos,
	}
}

export default useGetTodos
