import { useQuery } from "@tanstack/react-query"
import { getTodos } from "../services/TodosAPI"
import sortTodos from "../functions/sortTodos"

const useTodos = () => {
	return useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const todos = await getTodos()
			return sortTodos(todos)
		},
	})
}

export default useTodos
