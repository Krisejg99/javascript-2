import classNames from 'classnames'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import useUploadMeme from '../hooks/useUploadMeme'
import { Alert, ProgressBar } from 'react-bootstrap'

const UploadMeme = () => {
	const uploadMeme = useUploadMeme()

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (!acceptedFiles.length) {
			return toast.error("I don't like you anymore...")
		}

		uploadMeme.upload(acceptedFiles[0])
	}, [uploadMeme])

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		onDrop: onDrop,
		maxFiles: 1,
		maxSize: 4 * 1024 * 1024, // 4 MB
		accept: {
			'image/gif': [],
			'image/jpeg': [],
			'image/png': [],
			'image/webp': [],
		}
	})

	const dropzoneWrapperClasses = classNames({
		'drag-accept': isDragAccept,
		'drag-reject': isDragReject,
	})

	return <>
		<div {...getRootProps()} id='dropzone-wrapper' className={dropzoneWrapperClasses}>
			<input {...getInputProps()} />

			<div className='indicator'>
				{!isDragActive
					? <p>Your memes belong to me!!!</p>
					: isDragAccept
						? <p>Drop it like it's hot!</p>
						: <p>No no, not that...</p>
				}
			</div>
		</div>

		{uploadMeme.progress !== null && (
			<ProgressBar
				now={uploadMeme.progress}
				variant='success'
				animated
				label={`${uploadMeme.progress}%`}
			/>
		)}

		{uploadMeme.isError && <Alert variant="danger">😳 {uploadMeme.error}</Alert>}
		{uploadMeme.isSuccess && <Alert variant="success">😂 that was a funny meme!</Alert>}

	</>
}

export default UploadMeme
