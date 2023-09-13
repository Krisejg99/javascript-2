import { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpSchema } from '../schemas/SignUpSchema'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'

const SignUpPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpSchema>({
		// resolver: zodResolver(signUpSchema)
	})

	const { signUp } = useAuth()

	const navigate = useNavigate()

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const onSignUp: SubmitHandler<SignUpSchema> = async (data: SignUpSchema) => {
		setErrorMessage(null)

		try {
			setLoading(true)
			await signUp(data.email, data.password)

			navigate('/')
		}
		catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			}
			else {
				setErrorMessage('Something went wrong. Have you tried turning it off and back on again?')
			}

			setLoading(false)
		}
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }}>
				<Card>
					<Card.Body>
						<Card.Title className='mb-3'>Sign Up</Card.Title>

						{errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

						<Form onSubmit={handleSubmit(onSignUp)}>
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

							<Button
								type='submit'
								disabled={loading}
							>Sign Up</Button>
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
