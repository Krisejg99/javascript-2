import { useMutation, useQueryClient } from '@tanstack/react-query'
import AddTodoForm from '../components/AddTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'
import { Todo } from '../types'

const CreateTodoPage = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate, isSuccess, isError } = useMutation({
		mutationFn: TodosAPI.createTodo,
		onSuccess: (newTodo) => {
			queryClient.setQueryData<Todo[]>(['todos'], (prevTodos) => {
				return [...prevTodos ?? [], newTodo]
			})

			queryClient.setQueryData(['todo', { id: newTodo.id }], newTodo)

			setTimeout(() => navigate('/todos'), 1000 * 0)
		},
	})

	return (
		<>
			<h1>Create todo</h1>

			{isSuccess && <Popup type='success' msg={'Success!'} />}
			{isError && <Popup type='danger' msg={'Failed to create todo'} />}

			<AddTodoForm onAddTodo={(newTodo) => {
				mutate(newTodo)
			}} />
		</>
	)
}

export default CreateTodoPage
