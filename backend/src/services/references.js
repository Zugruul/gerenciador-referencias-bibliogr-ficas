const knex = require('../knex')

const instance = function() {
	return knex.table('references')
}

module.exports.create = function(reference) {
	return instance()
		.insert(reference)
}

module.exports.list = function(params) {
	const { orderBy, isDesc } = params || {}
	const order = isDesc ? 'desc' : 'asc'

	return instance()
		.select()
		.orderBy(orderBy || 'id', order)
}

module.exports.read = function(id) {
	return instance()
		.select()
		.where({ id: id })
		.first()
}

module.exports.update = function(reference) {
	return instance()
		.update(reference)
		.where({ id: reference.id })
}

module.exports.delete = function(id) {
	return instance()
		.delete()
		.where({ id: id })
}