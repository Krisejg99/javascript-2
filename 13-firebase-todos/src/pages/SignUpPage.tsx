import { useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { SignUpSchema, signUpSchema } from '../schemas/SignUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import useAuth from '../hooks/useAuth'

const SignUpPage = () => {
	const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpSchema>({
		// resolver: zodResolver(signUpSchema)
	})

	const { signUp } = useAuth()

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const submitForm: SubmitHandler<SignUpSchema> = async (data: SignUpSchema) => {
		await signUp(data.email, data.password)
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title className='mb-3'>Sign Up</Card.Title>

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
									autoComplete='new-password'
								/>

								{errors.password && <span className='text-danger'>{errors.password.message || 'Invalid password'}</span>}
							</Form.Group>

							<Form.Group controlId='confirmPassword'>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type='password'
									autoComplete='off'
									{...register('confirmPassword', {
										validate: (value) => {
											return value === passwordRef.current || "Passwords don't match"
										},
									})}
								/>

								{errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message || 'Invalid password confirmation'}</span>}
							</Form.Group>

							<Button type='submit'>Sign Up</Button>
						</Form>
					</Card.Body>
				</Card>

				<div className="text-center mt-3">
					Already have an account? <Link to="/login">Log In</Link>
				</div>
			</Col>
		</Row>
	)
}

export default SignUpPage
