import React, { useEffect, useState } from 'react'
import { ReferenceCard, Button } from '../components'

function ListPage() {
	// Inicializando um estado com lista vazia
	const [references, setReferences] = useState([])

	async function refresh() {
		// Estamos usando a Syntax do Async Await, você pode ver mais sobre ela aqui: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/funcoes_assincronas
		const response = await fetch('http://localhost:3007/references', {
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// transformo o retorno da api em JSON
		const responseJson = await response.json()
		// pego o dado especifico que desejo
		const references = responseJson.data

		// salvo no estado do componente (página) as referencias
		setReferences(references)
	}

	useEffect(() => {
		refresh()
	}, [])
	
	function onUpdate(reference) {
		let copy = [...references]
		const index = copy.findIndex(ref => ref.id === reference.id)

		copy[index] = reference

		setReferences(copy)
	}

	async function onDelete(reference) {
		await fetch(`http://localhost:3007/references?id=${reference.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		})

		await refresh()
	}

	async function onNew() {
		await fetch('http://localhost:3007/references', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: '',
				authors: '',
				year: null,
				type: null,
				nature: null,
				reach: 'national',
				status: 'ongoing',
				publicationPlace: null,
				publisher: null
			})
		})

		await refresh()
	}

	return (
		<>
			<Button onClick={onNew}>New</Button>
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
				{references.map((item) => {
					// Todo item de uma lista de components precisa explicitamente de uma key ÚNICA
					// É importante que essa key seja unica para determinado dado, visto que é utilizada
					// para fins de controle de estado e renderização do React.js
					return <ReferenceCard key={item.id} {...item} onUpdate={onUpdate} onDelete={onDelete} />
				})}
			</div>
		</>
	)
}

export default ListPage
