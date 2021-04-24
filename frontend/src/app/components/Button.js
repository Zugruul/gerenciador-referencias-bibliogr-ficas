import React from 'react'

function Button({ children, ...props }) {
	return (
		<div {...props} style={{ cursor: 'pointer', color: 'black', fontWeight: 'bolder', margin: 3, padding: 3 }}>
			{ children }
		</div>
	)
}

export default Button