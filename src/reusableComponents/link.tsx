import React from 'react'

interface Link {
	content: string
	link: string
}

const Link: React.FC<Link> = ({ content, link }) => {
	return <a href={`/${link}`}>{content}</a>
}

export default Link
