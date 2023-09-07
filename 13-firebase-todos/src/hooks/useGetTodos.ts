import useGetCollection from "./useGetCollection"
import { todosCol } from "../services/firebase"
import { Todo } from "../types/Todo.types"

const useGetTodos = () => {
	return useGetCollection<Todo>(todosCol)
}

export default useGetTodos
