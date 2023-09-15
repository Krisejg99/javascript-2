import classNames from 'classnames'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

const UploadMeme = () => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (!acceptedFiles.length) return toast.error("I don't like you anymore...")

		console.log('acceptedFiles', acceptedFiles)
	}, [])

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

	return (
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
	)
}

export default UploadMeme
