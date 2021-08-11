const { gql } = require('apollo-server-express');

const typeDefs = ggl`
type Query {
    me: User
}

type Mutation{
   login(email: string!, password: String!): Auth 
createUser(username:String!, email: String!, password:String!): Auth 
saveBook(bookToSave: BookInput): User
deleteBook(bookId: ID!): User
}

type User {
_id: ID!
username: String!
email: String!
password: String!
bookCount: Int
savedBooks:[Book]
}

type Book {
authors: [String]
description: String!
bookId: String!
image: String
link: String
title: String!
}

`;

module.exports = typeDefs;