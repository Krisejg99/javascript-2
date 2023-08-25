import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTodo } from '../services/TodosAPI'
import { PartialTodo, Todo } from '../types'
import sortTodos from '../functions/sortTodos'

const useUpdateTodo = (todoId: number) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: PartialTodo) => updateTodo(todoId, data),
		onSuccess: (updatedTodo) => {
			queryClient.setQueryData(['todo', { id: todoId }], updatedTodo)

			const prevTodos = queryClient.getQueryData<Todo[]>(['todos']) ?? []

			queryClient.setQueryData(['todos'], () => {
				const newTodos = [...prevTodos.filter(todo => todo.id !== todoId), updatedTodo]
				return sortTodos(newTodos)
			})
		},
	})
}

export default useUpdateTodo
