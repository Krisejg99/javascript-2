import React from 'react'

interface IProps {
	successMsg: string
}

const Success: React.FC<IProps> = ({ successMsg }) => {
	return <div className='alert alert-success' role='alert'>{successMsg}</div>
}

export default Success
