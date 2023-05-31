import AddTodoForm from "../components/AddTodoForm"
import * as TodosAPI from '../services/TodosAPI'
import { Todo } from "../types"

const CreateTodoPage = () => {
	const handleAddTodo = async (newTodo: Todo) => {
		await TodosAPI.createTodo(newTodo)
	}

	return (
		<AddTodoForm
			onAddTodo={handleAddTodo}
		/>
	)
}

export default CreateTodoPage
