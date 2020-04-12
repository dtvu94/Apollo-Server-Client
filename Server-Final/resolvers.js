const ScarlarType = require('./scalarTypes');

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const resolvers = {
    Date: ScarlarType.DateType,
    Query: {
        books: () => books,
    },
};


module.exports = resolvers;