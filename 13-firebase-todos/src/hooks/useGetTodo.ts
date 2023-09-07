import useGetDocument from "./useGetDocument"
import { todosCol } from "../services/firebase"
import { Todo } from "../types/Todo.types"

const useGetTodo = (todoId: string) => {
	return useGetDocument<Todo>(todosCol, todoId)
}

export default useGetTodo
