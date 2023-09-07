import { todosCol } from "../services/firebase"
import { Todo } from "../types/Todo.types"
import useStreamDocument from "./useStreamDocument"

const useGetTodo = (todoId: string) => {
	return useStreamDocument<Todo>(todosCol, todoId)
}

export default useGetTodo
