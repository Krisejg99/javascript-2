import { Form, Button } from 'react-bootstrap'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewBook } from '../..//types/BooksAPI.types'
import useCreateBook from '../../hooks/useCreateBook'
import { useParams } from 'react-router-dom'

const currentYear = new Date().getFullYear()

const CreateBookForm = () => {
	const { id } = useParams()
	const authorId = Number(id)


	const { handleSubmit, register, formState: { errors } } = useForm<NewBook>()

	const createBookMutation = useCreateBook()

	const createBook: SubmitHandler<NewBook> = (data) => {
		createBookMutation.mutate({ ...data, authorId: authorId })
	}

	return (
		<Form onSubmit={handleSubmit(createBook)}>
			<Form.Group className='mb-3' controlId='name'>
				<Form.Label>Book Name</Form.Label>
				<Form.Control
					type='text'
					placeholder='The Life of Abraham Lincoln'
					{...register('title', {
						required: true,
						minLength: 3,
					})}
				/>

				{errors.title && (
					<p className="text-danger">A book without a title is not a book</p>
				)}
			</Form.Group>

			<Form.Group className='mb-3' controlId='published'>
				<Form.Label>Published</Form.Label>
				<Form.Control
					type='number'
					placeholder='1945'
					{...register('published', {
						required: true,
						min: 1500,
						max: currentYear,
					})}
				/>

				{errors.published && (
					<p className="text-danger">That is not a valid published year (has to be between 1500 and {currentYear})</p>
				)}
			</Form.Group>

			<Form.Group className='mb-3' controlId='pages'>
				<Form.Label>Pages</Form.Label>
				<Form.Control
					type='number'
					placeholder='431'
					{...register('pages', {
						required: true,
						min: 1,
					})}
				/>

				{errors.pages && (
					<p className="text-danger">A book has to have at least 1 page</p>
				)}
			</Form.Group>

			<div className='d-flex justify-content-end'>
				<Button
					variant='success'
					type='submit'
				>
					Create
				</Button>
			</div>
		</Form>)
}

export default CreateBookForm
