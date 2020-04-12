const { gql } = require('apollo-server');

const typeDefs = gql`
scalar Date

type PersonType {
    ID: ID!
    Name: String!
}

type Person {
    ID: ID!
    Username: String!
    Name: String!
    DOB: Date!
    Address: String
    PersonType: PersonType!
}

type CourseDefinition {
    ID: ID!
    Code: String!
    Name: String!
    Description: String
    Credit: Int!
}

type Course {
    ID: ID!
    CourseDefinition: CourseDefinition!
    StartDate: Date!
    EndDate: Date!
    Teacher: Person!
}

type StudentCourse {
    ID: ID!
    Course: Course!
    Student: Person!
    Score: Int
}

type Query {
    Student(ID: ID!): Person
    Teacher(ID: ID!): Person
    People: [Person]
    CourseDefinitions: [CourseDefinition]
    Courses: [Course]
    StudentCourses(StudentID: ID!): [StudentCourse]
}

type Mutation {
    addStudent(Username: String!, Name: String!, DOB: Date!, Address: String): Boolean
    addTeacher(Username: String!, Name: String!, DOB: Date!, Address: String): Boolean
    addCourseDefinition(Code: String!, Name: String!, Description: String, Credit: Int!): Boolean
    addCourse(CourseDefinitionCode: String!, StartDate: Date!, EndDate: Date!, TeacherUsername: String!): Boolean
    registerCourse(CourseID: ID!, StudentUsername: String!): Boolean
    UpdateScore(CourseID: ID!, StudentUsername: String!, Score: Int!): Boolean
}
`;

module.exports = typeDefs;