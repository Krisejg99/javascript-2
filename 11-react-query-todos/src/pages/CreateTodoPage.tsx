import { useMutation, useQueryClient } from '@tanstack/react-query'
import AddTodoForm from '../components/AddTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { Todo } from '../types'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'

const CreateTodoPage = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate, isSuccess, isError } = useMutation({
		mutationFn: (newTodo: Todo) => {
			return TodosAPI.createTodo(newTodo)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})

	if (isSuccess) return <Popup type='success' msg={'Success'} />
	if (isError) return <Popup type='danger' msg={'Failed to create todo'} />


	return (
		<AddTodoForm onAddTodo={(newTodo) => {
			mutate(newTodo)

			setTimeout(() => {
				navigate('/todos')
			}, 1500)
		}} />
	)
}

export default CreateTodoPage
