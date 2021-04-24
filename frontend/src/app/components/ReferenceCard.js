import React, { useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Card, Input, Select, Form, Descriptions } from 'antd'
import Button from './Button'
import 'antd/dist/antd.css';

import { generateReference } from '../utils'

const typeOptions = [undefined, 'Periodic', 'Proceedings', 'Book', 'Excerpt', 'Eletronic']
const natureOptions = [undefined, 'complete', 'summarized', 'simple', 'expanded']
const reachOptions = [undefined, 'national', 'international']
const statusOptions = [undefined, 'accepted', 'rejected', 'ongoing']

function mapOptions(options) {
	return options.map(option => ({ label: option, value: option }))
}

function ReferenceCard(props, ref) {
	const {
		// Triggers
		onStartEditing,
		onEndEditing,
		onUpdate,
		onDelete,
		// Data
		...data
	} = props

	const [editMode, setEditMode] = useState(false)
	const [updatedValues, setUpdatedValues] = useState({})

	function onChange(name) {
		return function (value) {
			setUpdatedValues({
				...updatedValues,
				[name]: value.target ? value.target.value : value
			})
		}
	}

	const toggleEdit = useCallback(function (target) {
		const value = (target === true || target === false) ? target : !editMode

		if(editMode === value) return

		if (value && onStartEditing) onStartEditing()
		else if (!value && onEndEditing) onEndEditing()
		
		setEditMode(value)
		setUpdatedValues({ })
	}, [editMode, onEndEditing, onStartEditing])

	async function onSubmit() {
		const reference = {
			...data,
			...updatedValues
		}

		const response = await fetch(`http://localhost:3007/references`, {
			method: 'PUT',
			body: JSON.stringify(reference),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if(response.status === 200) {
			toggleEdit(false)
			if(onUpdate) onUpdate(reference)
		} else {
			alert('Erro ao atualizar referência: ' + (await response.json()).message)
		}
	}
 
	function renderExtra() {
		return <Button onClick={toggleEdit}>{editMode ? 'Limpar' : 'Editar'}</Button>
	}

	function getValue(name) {
		return (updatedValues[name] !== undefined) ? updatedValues[name] : data[name]
	}

	useImperativeHandle(ref, () => ({
		toggleEdit
	}), [toggleEdit])

	return (
		<React.Fragment>
			<Form style={{ display: 'flex', margin: 7 }}>
				<Card name={data.id} title={data.title} extra={renderExtra()} style={{ width: 375 }} >
					<div style={{ marginBottom: 12 }}>
						{ generateReference({ 
							...data,
							...updatedValues,
						})}
					</div>
					{ editMode ? (
						<React.Fragment>
							<Select 
								options={mapOptions(typeOptions)} 
								name={"type"} 
								title={"type"} 
								placeholder={"type"} 
								onChange={onChange('type')} 
								value={getValue('type')} 
								style={{ marginBottom: 5, minWidth: '50%' }}
							/>
							<Input style={{ marginBottom: 5 }} name={"title"} title={"title"} placeholder={"title"} onChange={onChange('title')} value={getValue('title')} />
							<Input style={{ marginBottom: 5 }} name={"chapter"} title={"chapter"} placeholder={"chapter"} onChange={onChange('chapter')} value={getValue('chapter')} />
							<Input style={{ marginBottom: 5 }} name={"authors"} title={"authors"} placeholder={"authors"} onChange={onChange('authors')} value={getValue('authors')} />
							<Input style={{ marginBottom: 5 }} name={"edition"} title={"edition"} placeholder={"edition"} onChange={onChange('edition')} value={getValue('edition')} />
							<div style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
								<Input picker="year" placeholder={"year"} style={{ minWidth: '40%', marginRight: 5 }} onChange={onChange('year')} value={getValue('year')} />
								<Input name={"pages"} title={"pages"} placeholder={"pages"} onChange={onChange('pages')} value={getValue('pages')} />
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', marginBottom: 5 }}>
								<Select
									options={mapOptions(natureOptions)} 
									name={"nature"}
									title={"nature"}
									placeholder={ "nature"}
									onChange={onChange('nature')}
									value={getValue('nature')} 
									style={{ marginBottom: 5 }}
								/>
								<Select 
									options={mapOptions(reachOptions)} 
									name={"reach"} 
									title={"reach"} 
									placeholder={"reach"} 
									onChange={onChange('reach')} 
									value={getValue('reach')} 
									style={{ marginBottom: 5 }}
									/>
								<Select 
									options={mapOptions(statusOptions)}
									name={"status"} 
									title={"status"} 
									placeholder={"status"} 
									onChange={onChange('status')} 
									value={getValue('status')} 
									style={{ marginBottom: 5 }}
									/>
							</div>
							<Input style={{ marginBottom: 5 }} name={"accessDate"} title={"accessDate"} placeholder={"accessDate"} onChange={onChange('accessDate')} value={getValue('accessDate')} />
							<Input style={{ marginBottom: 5 }} name={"publicationPlace"} title={"publicationPlace"} placeholder={"publicationPlace"} onChange={onChange('publicationPlace')} value={getValue('publicationPlace')} />
							<Input style={{ marginBottom: 5 }} name={"organizer"} title={"organizer"} placeholder={"organizer"} onChange={onChange('organizer')} value={getValue('organizer')} />
							<Input style={{ marginBottom: 5 }} name={"publisher"} title={"publisher"} placeholder={"publisher"} onChange={onChange('publisher')} value={getValue('publisher')} />
							<Input style={{ marginBottom: 5 }} name={"availableAt"} title={"availableAt"} placeholder={"availableAt"} onChange={onChange('availableAt')} value={getValue('availableAt')} />
							<Input style={{ marginBottom: 5 }} name={"createdAt"} title={"createdAt"} placeholder={"createdAt"} onChange={onChange('createdAt')} value={getValue('createdAt')} />
							<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12  }}>
								<Button onClick={() => onDelete(data)}>{'Deletar'}</Button>
								<Button onClick={onSubmit}>{'Salvar'}</Button>
							</div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Descriptions>
								<Descriptions.Item label="Year">{ data.year }</Descriptions.Item>
								<Descriptions.Item label="Type">{ data.type }</Descriptions.Item>
							</Descriptions>
							<Descriptions>
								<Descriptions.Item label="Nature">{ data.nature }</Descriptions.Item>
								<Descriptions.Item label="Status">{ data.status }</Descriptions.Item>
							</Descriptions>
						</React.Fragment>
						)}
				</Card>
			</Form>
		</React.Fragment>
	)
}

export default forwardRef(ReferenceCard);