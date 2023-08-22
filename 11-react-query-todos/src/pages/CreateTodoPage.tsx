import { useMutation, useQueryClient } from '@tanstack/react-query'
import AddTodoForm from '../components/AddTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'

const CreateTodoPage = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate, isSuccess, isError } = useMutation({
		mutationFn: TodosAPI.createTodo,
		onSuccess: () => {
			setTimeout(() => navigate('/todos'), 1500)
			queryClient.refetchQueries({ queryKey: ['todos'] })
		},
	})

	if (isSuccess) return <Popup type='success' msg={'Success'} />
	if (isError) return <Popup type='danger' msg={'Failed to create todo'} />

	return (
		<>
			<h1>Create todo</h1>

			<AddTodoForm onAddTodo={(newTodo) => {
				mutate(newTodo)
			}} />
		</>
	)
}

export default CreateTodoPage
