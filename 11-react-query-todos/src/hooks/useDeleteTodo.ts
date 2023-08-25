import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTodo } from "../services/TodosAPI"
import { useNavigate } from "react-router-dom"
import { Todo } from "../types"

const useDeleteTodo = (todoId: number, disableQueries: () => void = () => { return }) => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => deleteTodo(todoId),
		onSuccess: () => {
			disableQueries()

			queryClient.removeQueries(['todo', { id: todoId }])

			queryClient.setQueryData<Todo[]>(['todos'], (prevTodos) => {
				return prevTodos?.filter(todo => todo.id !== todoId) ?? []
			})

			setTimeout(() => {
				navigate('/todos', {
					replace: true,
					state: {
						message: `todo was successfully deleted`
					},
				})
			}, 1500)
		},
	})
}

export default useDeleteTodo
