import { useState } from 'react'
import AddTodoForm from '../components/AddTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { Todo } from '../types'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/Popup'



const CreateTodoPage = () => {
	const [success, setSuccess] = useState<boolean | null>(null)

	const navigate = useNavigate()

	const handleAddTodo = (todo: Todo) => {
		try {
			TodosAPI.createTodo(todo)
			setSuccess(true)
		}
		catch (err: any) {
			setSuccess(false)
		}

		setTimeout(() => {
			navigate('/todos')
		}, 1500)
	}

	return (
		<>
			{success === null && <AddTodoForm onAddTodo={handleAddTodo} />}
			{success === true && <Popup type='success' msg={'Success'} />}
			{success === false && <Popup type='danger' msg={'Failed to create todo'} />}
		</>

	)
}

export default CreateTodoPage
