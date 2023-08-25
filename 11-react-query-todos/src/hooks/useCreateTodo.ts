import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo } from '../services/TodosAPI'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../types'
import sortTodos from '../functions/sortTodos'
import useTodos from './useTodos'

const useCreateTodo = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	useTodos()

  return useMutation({
	mutationFn: createTodo,
	onSuccess: (newTodo) => {
		queryClient.setQueryData<Todo[]>(['todos'], (prevTodos) => {
			return [...prevTodos ?? [], newTodo]
		})

		queryClient.setQueryData(['todo', { id: newTodo.id }], newTodo)

		const prevTodos = queryClient.getQueryData<Todo[]>(['todos'])

		queryClient.setQueryData(['todos'], () => {
			const newTodos = [
				...prevTodos?.filter(todo => todo.id !== newTodo.id) ?? [],
				newTodo,
			]
			return sortTodos(newTodos)
		})

		setTimeout(() => navigate('/todos'), 1000 * 0)
	},
})
}

export default useCreateTodo
