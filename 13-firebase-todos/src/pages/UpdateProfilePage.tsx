import { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { UpdateProfileFormData } from '../types/User.types'
import useAuth from '../hooks/useAuth'
import { FirebaseError } from 'firebase/app'
import Container from 'react-bootstrap/Container'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../services/firebase'

const UpdateProfilePage = () => {
	const { currentUser, setDisplayName, setPhotoURL, setPassword, setEmail, reloadUser } = useAuth()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit, formState: { errors }, watch } = useForm<UpdateProfileFormData>({
		// resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			displayName: currentUser?.displayName ?? '',
			email: currentUser?.email ?? '',
		}
	})

	const passwordRef = useRef('')
	passwordRef.current = watch('password')

	const photoFileRef = useRef<FileList | null>(null)
	photoFileRef.current = watch("photoFile")

	if (!currentUser) return <p>Error, error, error...</p>

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data: UpdateProfileFormData) => {
		setErrorMessage(null)
		setLoading(true)

		try {
			if (currentUser?.displayName !== data.displayName) {
				await setDisplayName(data.displayName)
			}

			if (data.photoFile.length) {
				const photo = data.photoFile[0]
				const fileRef = ref(storage, `photos/${currentUser.uid}/${photo.name}`)

				try {
					const uploadResult = await uploadBytes(fileRef, photo)
					const photoURL = await getDownloadURL(uploadResult.ref)
					await setPhotoURL(photoURL)
				}
				catch (error) {
					setErrorMessage("Upload failed!")
				}
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
				<Col md={{ span: 8, offset: 2 }}>
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

								<Form.Group controlId='photoFile'>
									<Form.Label>Profile Image</Form.Label>
									<Form.Control
										type='file'
										accept="image/gif,image/jpeg,image/png,image/webp"
										{...register('photoFile')}
									/>

									{errors.photoFile && <span className='text-danger'>{errors.photoFile.message || 'Invalid photo file'}</span>}

									<Form.Text>
										{photoFileRef.current && photoFileRef.current.length > 0 && (
											<span>
												{photoFileRef.current[0].name}
												{' '}
												({Math.round(photoFileRef.current[0].size / 1024)} kB)
											</span>
										)}
									</Form.Text>
								</Form.Group>

								<Form.Group controlId='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										type='email'
										placeholder='email@gmail.com'
										{...register('email')}
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
