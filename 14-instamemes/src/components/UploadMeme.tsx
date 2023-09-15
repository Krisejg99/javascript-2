import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadMeme = () => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log('acceptedFiles', acceptedFiles)
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: onDrop,
	})

	return (
		<div {...getRootProps()} id='dropzone-wrapper'>
			<input {...getInputProps()} />

			<div className='indicator'>
				{isDragActive
					? <p>Drop it like it's hot!</p>
					: <p>Your memes belong to me!!!</p>
				}
			</div>
		</div>
	)
}

export default UploadMeme
