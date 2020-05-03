import React from 'react'

function Button({ children, ...props }) {
	return (
		<div {...props} style={{ cursor: 'pointer', color: 'black', fontWeight: 'bolder' }}>
			{ children }
		</div>
	)
}

export default Button