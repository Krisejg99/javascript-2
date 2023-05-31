import AddTodoForm from "../components/AddTodoForm"
import * as TodosAPI from '../services/TodosAPI'
import { Todo } from "../types"
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import { useState } from "react"

const CreateTodoPage = () => {
	const [error, setError] = useState<string | false>(false)
	const navigate = useNavigate()

	const handleAddTodo = async (todo: Todo) => {
		try {
			const newTodo = await TodosAPI.createTodo(todo)
			if (newTodo) {

			}
		}
		catch (err: any) {
			setError(err.message)
		}



		setTimeout(() => {
			navigate('/todos')
		}, 2000)
	}

	return (
		<>
			<AddTodoForm
				onAddTodo={handleAddTodo}
			/>

			{error && <Error errorMsg={error} />}
		</>

	)
}

export default CreateTodoPage
