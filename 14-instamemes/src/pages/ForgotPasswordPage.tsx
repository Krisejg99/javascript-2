import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ResetPasswordSchema } from '../schemas/ResetPasswordSchema'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [success, setSuccess] = useState<true | null>(null)
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchema>({
		// resolver: zodResolver(resetPasswordSchema)
	})

	const { resetPassword } = useAuth()

	const onResetPassword: SubmitHandler<ResetPasswordSchema> = async (data: ResetPasswordSchema) => {
		setErrorMessage(null)
		setSuccess(null)
		setLoading(true)

		try {
			await resetPassword(data.email)
			setSuccess(true)
		}
		catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			}
			else {
				setErrorMessage('Something went wrong. Have you tried turning it off and back on again?')
			}
		}

		setLoading(false)
	}

	return (
		<Container className='py-3 center-y'>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title className='mb-3'>Reset Password</Card.Title>

							{errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

							{success &&
								<Alert variant='success'>
									<p>Email sent to reset password.</p>
									<p>1. Follow the instructions in the email to reset your password. Check your spam folder if you haven't recieved the email within a few minutes</p>
									<p>2. <Link to='/login'>Log in</Link> with your new password.</p>
								</Alert>
							}

							<Form onSubmit={handleSubmit(onResetPassword)}>
								<Form.Group controlId='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='email'
										placeholder='example@gmail.com'
										{...register('email')}
									/>

									{errors.email && <span className='text-danger'>{errors.email.message || 'Invalid email'}</span>}
								</Form.Group>

								<Button
									type='submit'
									disabled={loading}
									className='mt-3'
								>
									{loading ? 'Resetting...' : 'Reset'}
								</Button>
							</Form>

						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default ForgotPasswordPage
