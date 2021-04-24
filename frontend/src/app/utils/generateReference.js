function getValue(data, key) {
	if(key === 'authors' && data.authors.split(';').length > 3) {
		return data.authors.split(';')[0] + ' et al'
	} else if(key === 'edition') {
		const number = parseInt(data.edition)

		if(data?.reach?.toLowerCase() === 'international') {
			if(number === 1) {
				return `1st ed`
			} else if(number === 2) {
				return `2nd ed`
			} else if(number === 3) {
				return `3rd ed`
			} else {
				return `${!isNaN(number) ? number : '{edition}'}th ed`
			}
		} else {
			return `${!isNaN(number) ? number : '{edition}'}ª ed`
		}
	} else {
		return data[key]
	}
}

function fromTemplate(template, data) {
	let copy = template + ''
	for(let key of Object.keys(data)) {
		let value = getValue(data, key)
		if(value) {
			copy = copy.replace(`{${key}}`, value)
		}
	}
	return copy
}

function publicationPlaceAndPublisher(publicationPlace, publisher) {
	if(!publicationPlace && publisher) return '[S.l.]: {publisher}'
	else if(publicationPlace && !publisher) return '{publicationPlace}: [s.n]'
	else if(!publicationPlace && !publisher) return '[S.l.:s.n]'
	else if(publicationPlace === '[S.l.]' && publisher === '[s.n]') return '[S.l.:s.n]'
	else return '{publicationPlace}, {publisher}'
}

export default function(data) {
	switch(data.type) {
		case 'Periodic': 
			return fromTemplate(`${data.authors ? '{authors}. ' : ''}{title}. {publisher}, {publicationPlace}, {edition}, p. {pages}, {year}.`, data)
		case 'Book': 
			return fromTemplate(`${data.authors ? '{authors}. ' : ''}{title}. {edition}. ${publicationPlaceAndPublisher(data.publicationPlace, data.publisher)}, {year}.`, data)
		case 'Proceedings': 
		case 'Excerpt': 
			return fromTemplate(`${data.authors ? '{authors}. ' : ''}{chapter}. In: {organizer}. {title}. {edition}. ${publicationPlaceAndPublisher(data.publicationPlace, data.publisher)}, {year}.`, data)
		case 'Eletronic':
			return fromTemplate(`{authors}. {title}. {publicationPlace}, {edition}, {pages}, {year}. ${data.reach === 'national' ? 'Disponível em' : 'Available at'}: <{availableAt}>. ${data.reach === 'national' ? 'Acessado em' : 'Last access'}: {accessDate}.`, data)
		default:
			return 'Select a type' 
	}
}