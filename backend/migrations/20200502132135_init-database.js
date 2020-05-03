
exports.up = function(knex, Promise) {
    return knex.schema.createTable('references', function(t) {
        t.increments('id').unsigned().primary();
        t.string('title').notNull();
        t.string('chapter').nullable();
        t.string('authors').notNull();
        t.string('edition').nullable();
        t.string('year').notNull();
        t.string('pages').nullable();
        t.enum('type', ['Periodic', 'Proceedings', 'Book', 'Excerpt', 'Eletronic']).defaultTo(null);
        t.enum('nature', ['complete', 'summarized', 'simple', 'expanded']).defaultTo(null);
        t.enum('reach', ['national', 'international']).defaultTo('national');
        t.enum('status', ['accepted', 'rejected', 'ongoing']).notNull().defaultTo('ongoing');
        t.date('accessDate').nullable();
        t.string('publicationPlace').defaultTo('[S.l.]');
        t.string('organizer').nullable();
        t.string('publisher').defaultTo('[s.n]');
        t.string('availableAt').nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('references');
};
