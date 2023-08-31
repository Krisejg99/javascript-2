import { Form, Button } from "react-bootstrap"
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewAuthor } from "../../types/BooksAPI.types"
import useCreateAuthor from "../../hooks/useCreateAuthor"
import { AuthorSchema, authorSchema } from "../../schemas/AuthorSchema"
import { zodResolver } from "@hookform/resolvers/zod"

const CreateAuthorForm = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<AuthorSchema>({
		resolver: zodResolver(authorSchema)
	})
	const createAuthorMutation = useCreateAuthor()

	const createAuthor: SubmitHandler<NewAuthor> = (data) => {
		createAuthorMutation.mutate(data)
	}

	return (
		<Form onSubmit={handleSubmit(createAuthor)}>
			<Form.Group className="mb-3" controlId="name">
				<Form.Label>Author Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Type here..."
					{...register('name')}
				/>

				{errors.name && (
					<p className="text-danger">{errors.name.message}</p>
				)}
			</Form.Group>

			<Form.Group className="mb-3" controlId="date_of_birth">
				<Form.Label>Date of Birth</Form.Label>
				<Form.Control
					type="date"
					{...register('date_of_birth')}
				/>

				{errors.date_of_birth && (
					<p className="text-danger">{errors.date_of_birth.message}</p>
				)}
			</Form.Group>

			<div className="d-flex justify-content-end">
				<Button
					variant="success"
					type="submit"
				>Create</Button>
			</div>
		</Form>
	)
}

export default CreateAuthorForm
