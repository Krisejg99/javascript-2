import React from 'react'

interface IProps {
	errorMsg: string
}

const Error: React.FC<IProps> = ({ errorMsg }) => {
	return (
		<div className="alert alert-warning">{errorMsg}</div>
	)
}

export default Error
