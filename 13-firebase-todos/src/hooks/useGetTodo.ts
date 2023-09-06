import useGetDocument from "./useGetDocument"
import { todosCol } from "../services/firebase"
import { Todo } from "../types/Todo.types"

const useGetTodo = (todoId: string) => {
	const { data: todo, loading, error, getDocument: getTodo } = useGetDocument<Todo>(todosCol, todoId)

	return {
		todo,
		loading,
		error,
		getTodo
	}
}

export default useGetTodo
