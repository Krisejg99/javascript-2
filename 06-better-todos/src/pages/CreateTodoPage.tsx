import { useState } from "react"
import AddTodoForm from "../components/AddTodoForm"
import * as TodosAPI from '../services/TodosAPI'
import { Todo } from "../types"
import { useNavigate } from 'react-router-dom'
import Error from '../components/Error'
import Success from "../components/Sucess"



const CreateTodoPage = () => {
	const [error, setError] = useState<string | false>(false)
	const [success, setSuccess] = useState<string | false>(false)

	const navigate = useNavigate()

	const handleAddTodo = (todo: Todo) => {
		try {
			TodosAPI.createTodo(todo)
			setSuccess('Success')
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
			{success && <Success successMsg={success} />}
		</>

	)
}

export default CreateTodoPage
