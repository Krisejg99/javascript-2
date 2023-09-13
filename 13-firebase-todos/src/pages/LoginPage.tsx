import { useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { LoginSchema, loginSchema } from '../schemas/LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginPage = () => {
	const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginSchema>({
		// resolver: zodResolver(loginSchema)
	})

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const submitForm: SubmitHandler<LoginSchema> = (data: LoginSchema) => {
		console.log('Loggin in:', data)
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title className='mb-3'>Login</Card.Title>

						<Form onSubmit={handleSubmit(submitForm)}>
							<Form.Group controlId='email'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									{...register('email')}
								/>

								{errors.email && <span className='text-danger'>{errors.email.message || 'Invalid email'}</span>}
							</Form.Group>

							<Form.Group controlId='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									{...register('password')}
								/>

								{errors.password && <span className='text-danger'>{errors.password.message || 'Invalid password'}</span>}
							</Form.Group>

							<Button type='submit'>Log In</Button>
						</Form>
					</Card.Body>
				</Card>

				<div className="text-center mt-3">
					Need an account? <Link to="/signup">Sign Up</Link>
				</div>
			</Col>
		</Row>
	)
}

export default LoginPage
