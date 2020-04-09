const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType, Kind } = require('graphql');

var OddType = new GraphQLScalarType({
  name: 'OddScalarType',
  serialize: oddValue,
  parseValue: oddValue,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return oddValue(parseInt(ast.value, 10));
    }
    
    return null;
  }
});

function oddValue(value) {
  return value % 2 === 1 ? value : null;
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar OddScalarType

  type Foo {
    number: OddScalarType
  }

  enum AllowedColor {
    RED
    GREEN
    BLUE
  }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String!
    author: String!
  }

  interface IBook {
    title: String
    author: String
  }

  type TextBook implements IBook {
    title: String
    author: String
    class: OddScalarType
  }
  
  type ColoringBook implements IBook {
    title: String
    author: String
    color: AllowedColor
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    schoolBooks: [IBook]
    foos: [Foo]
    colors: [AllowedColor]
    colorValue(color: AllowedColor): Int
  }

  # The Mutation type is similar in structure and purpose to the Query type.
  # Whereas the Query type defines your data graph's supported read operations,
  # the Mutation type defines supported write operations.
  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const schoolBooks = [
  {
    title: 'Text Book One',
    author: 'author one',
    class: 1
  },
  {
    title: 'Color Book One',
    author: 'author two',
    color: 'RED'
  },
  {
    title: 'Color Book Two',
    author: 'author three',
    color: 'GREEN'
  }
];

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

const foos = [
  {
    number: 1
  },
  {
    number: 2 // not an odd value, return null
  },
  {
    number: 3
  }
];

const colors = [
  "RED", "GREEN", "BLUE"
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  // map data type from outside to insde the graphql
  OddScalarType: OddType,
  IBook: {
    __resolveType(book, context, info){
      if(book.class){
        return 'TextBook';
      }

      if(book.color){
        return 'ColoringBook';
      }

      return null;
    },
  },

  //
  Query: {
    books: () => books,
    schoolBooks: () => schoolBooks,
    foos: () => foos,
    colors: () => colors,
    colorValue: (_, args) => {
      switch(args.color){
        case 'RED':
          return 1;
        case 'GREEN':
          return 2;
        case 'BLUE':
          return 3;
        default:
          return 0;
      }
    }
  },

  //
  Mutation: {
    addBook: (title, author) => {
      console.log("Add successfully!");
      console.log(title);
      console.log(author);
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});