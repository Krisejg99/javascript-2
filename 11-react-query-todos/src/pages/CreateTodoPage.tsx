import AddTodoForm from '../components/AddTodoForm'
import Popup from '../components/Popup'
import useCreateTodo from '../hooks/useCreateTodo'

const CreateTodoPage = () => {
	const { mutate, isSuccess, isError } = useCreateTodo()

	return (
		<>
			<h1>Create todo</h1>

			{isSuccess && <Popup type='success' msg={'Success!'} />}
			{isError && <Popup type='danger' msg={'Failed to create todo'} />}

			<AddTodoForm onAddTodo={newTodo => mutate(newTodo)} />
		</>
	)
}

export default CreateTodoPage
