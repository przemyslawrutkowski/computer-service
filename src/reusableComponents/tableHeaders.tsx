import React from 'react'

interface Content {
	titles: string[]
	optionalLast: Boolean
}

const TableHeaders: React.FC<Content> = ({ titles, optionalLast }) => {
	return (
		<thead>
			<tr>
				{titles.map((title, index) => {
					if (index === titles.length - 1 && !optionalLast) {
						return null
					}
					return <th key={index}>{title}</th>
				})}
			</tr>
		</thead>
	)
}

export default TableHeaders
