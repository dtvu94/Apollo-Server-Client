const Sequelize = require('sequelize');

const sequelize = new Sequelize('apollo', 'root', 'Dt@123456789', {
    host: 'localhost',
    dialect: mssql,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        // The `timestamps` field specify whether or not the `createdAt`
        // and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: false
    }
});

const PersonType = sequelize.define('persontype', {
    // attributes
    ID: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    // options
});

const Person = sequelize.define('person', {
    // attributes
    ID: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    Username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Secret: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    DOB: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    Address: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    // options
});

PersonType.hasMany(Person);
Person.belongsTo(PersonType);

const CourseDefinition = sequelize.define('persontype', {
    // attributes
    ID: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    Code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    Credit: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // options
});



module.exports = { sequelize, PersonType, Person, CourseDefinition };