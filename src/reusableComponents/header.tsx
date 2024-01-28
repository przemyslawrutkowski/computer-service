import React from 'react'

interface Header {
	content: string
}

const Header: React.FC<Header> = ({ content }) => {
	return <h3>{content}</h3>
}

export default Header
