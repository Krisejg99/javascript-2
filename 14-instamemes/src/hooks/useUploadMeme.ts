import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { memesCol, storage } from '../services/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import useAuth from './useAuth'

const useUploadMeme = () => {
	const [error, setError] = useState<string | null>(null)
	const [isError, setIsError] = useState<boolean | null>(null)
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
	const [isUploading, setIsUploading] = useState<boolean | null>(null)
	const [progress, setProgress] = useState<number | null>(null)

	const { currentUser } = useAuth()


	const upload = async (image: File) => {
		setError(null)
		setIsError(null)
		setIsSuccess(null)
		setIsUploading(true)
		setProgress(null)

		try {
			const uuid = uuidv4()

			const ext = image.name.substring(image.name.lastIndexOf('.') + 1)

			const storageFilename = `${uuid}.${ext}`

			const storageRef = ref(storage, `memes/${storageFilename}`)

			// start upload of image
			const uploadTask = uploadBytesResumable(storageRef, image)

			// attach upload observer
			uploadTask.on('state_changed', (snapshot) => {
				setProgress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 1000) / 10)
			})

			// wait for upload to complete
			await uploadTask.then()

			// get download url to uploaded image
			const url = await getDownloadURL(storageRef)

			// create document in db-collection "memes"
			const docRef = doc(memesCol)

			// create document in db for the uploaded image
			await setDoc(docRef, {
				_id: docRef.id,
				name: image.name,
				path: storageRef.fullPath,
				type: image.type,
				size: image.size,
				uid: currentUser?.uid,
				url: url,
				created: serverTimestamp(),
			})

			// profit 💰
			setIsSuccess(true)
		}
		catch (error) {
			setIsError(true)

			if (error instanceof Error) setError(error.message)
			else setError('Danger, danger...')
		}

		setIsUploading(false)
		setProgress(null)
	}

	return {
		error,
		isError,
		isSuccess,
		isUploading,
		progress,
		upload,
	}
}

export default useUploadMeme
