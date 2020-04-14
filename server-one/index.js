const { ApolloServer, gql } = require('apollo-server');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model { }
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { sequelize, modelName: 'user', timestamps: false });

sequelize.sync().then(() => {
    User.create({
        username: 'Jane',
        code: 'One'
    });
    User.create({
        username: 'John',
        code: 'Two'
    });
    User.create({
        username: 'Daniel',
        code: 'Three'
    });
    User.create({
        username: 'Jack',
        code: 'Four'
    });
    console.log("Done initialization");
    console.log(" ");
});

const typeDefs = gql`
    type User {
        username: String
        code: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(username: String, code: String): User
    }
`;

const resolvers = {
    Query: {
        users: async () => {
            return await User.findAll();
        },
    },
    Mutation: {
        addUser: async (_, args) => {
            const foundItem = await User.findOne({where: {code: args.code}});
            if (foundItem) {
                return foundItem;
            }

            const item = await User.create({
                username: args.username,
                code: args.code
            });

            return item;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: 4004 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});