import React from 'react'

interface IProps {
	errorMsg: string
}

const Error: React.FC<IProps> = ({ errorMsg }) => {
	return <div className='alert alert-danger' role='alert'>{errorMsg}</div>
}

export default Error
