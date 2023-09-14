import { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { UpdateProfileSchema } from '../schemas/UpdateProfileSchema'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'

const UpdateProfilePage = () => {
	const { currentUser, setDisplayName, setPhotoURL, setPassword, setEmail, reloadUser } = useAuth()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit, formState: { errors }, watch } = useForm<UpdateProfileSchema>({
		// resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			displayName: currentUser?.displayName ?? '',
			photoURL: currentUser?.photoURL ?? '',
			email: currentUser?.email ?? '',
		}
	})

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const onUpdateProfile: SubmitHandler<UpdateProfileSchema> = async (data: UpdateProfileSchema) => {
		setErrorMessage(null)
		setLoading(true)

		try {
			if (currentUser?.displayName !== data.displayName) {
				await setDisplayName(data.displayName)
			}
			if (currentUser?.photoURL !== data.photoURL) {
				await setPhotoURL(data.photoURL)
			}
			if (currentUser?.email !== data.email) {
				await setEmail(data.email)
			}
			if (data.password) {
				await setPassword(data.password)
			}

			await reloadUser()

			toast.success('Profile successfully updated')
		}
		catch (error) {
			if (error instanceof FirebaseError) setErrorMessage(error.message)
			else setErrorMessage('Something went wrong. Have you tried turning it off and back on again?')
		}

		setLoading(false)
	}

	return (
		<Container className='py-3 center-y'>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card className='mb-3'>
						<Card.Body>
							<Card.Title className='mb-3'>Update Profile</Card.Title>

							{errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

							<Form onSubmit={handleSubmit(onUpdateProfile)}>
								<Form.Group controlId='displayName'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='text'
										placeholder='Sean Banan'
										{...register('displayName', {
											minLength: {
												value: 3,
												message: "If you have a name, it has to be at least 3 characters long"
											}
										})}
									/>

									{errors.displayName && <span className='text-danger'>{errors.displayName.message || 'Invalid email'}</span>}
								</Form.Group>

								<Form.Group controlId='photoURL'>
									<Form.Label>Profile Image</Form.Label>
									<Form.Control
										type='url'
										placeholder='https://www.profile-image.jpg'
										autoComplete='off'
										{...register('photoURL')}
									/>

									{errors.photoURL && <span className='text-danger'>{errors.photoURL.message || 'Invalid image link'}</span>}
								</Form.Group>

								<Form.Group controlId='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='email'
										placeholder='email@gmail.com'
										{...register('email', {
											required: true
										})}
									/>

									{errors.email && <span className='text-danger'>{errors.email.message || 'Invalid email'}</span>}
								</Form.Group>

								<Form.Group controlId='password'>
									<Form.Label>New Password</Form.Label>
									<Form.Control
										type='password'
										{...register('password')}
										autoComplete='new-password'
									/>

									{errors.password && <span className='text-danger'>{errors.password.message || 'Invalid password'}</span>}
								</Form.Group>

								<Form.Group controlId='confirmPassword'>
									<Form.Label>Confirm New Password</Form.Label>
									<Form.Control
										type='password'
										autoComplete='off'
										{...register('confirmPassword', {
											validate: (value) => {
												if (!value && !passwordRef.current) return
												return value === passwordRef.current || "Passwords don't match"
											},
										})}
									/>

									{errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message || 'Invalid password confirmation'}</span>}
								</Form.Group>

								<Button
									type='submit'
									disabled={loading}
									className='mt-3'
								>
									{loading ? 'Saving...' : 'Save'}
								</Button>
							</Form>
						</Card.Body>
					</Card>

					<div className="text-center">
						<Link to="/forgot-password">Forgot password?</Link>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfilePage
