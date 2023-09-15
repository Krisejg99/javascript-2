import { useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { LogInSchema } from '../schemas/LogInSchema'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import Container from 'react-bootstrap/Container'

const LogInPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit, formState: { errors }, watch } = useForm<LogInSchema>({
		// resolver: zodResolver(logInSchema)
	})

	const { logIn } = useAuth()

	const navigate = useNavigate()

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const onLogIn: SubmitHandler<LogInSchema> = async (data: LogInSchema) => {
		setErrorMessage(null)

		try {
			setLoading(true)
			await logIn(data.email, data.password)

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
		<Container className='py-3 center-y'>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title className='mb-3'>LogIn</Card.Title>

							{errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

							<Form onSubmit={handleSubmit(onLogIn)}>
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

								<Button
									type='submit'
									disabled={loading}
									className='mt-3'
								>
									{loading ? 'Logging in...' : 'Log in'}
								</Button>
							</Form>
						</Card.Body>
					</Card>

					<div className="text-center">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>

					<div className="text-center">
						<Link to='/forgot-password'>Forgot Password?</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default LogInPage
