const { gql } = require('apollo-server-express');

const typeDefs = ggl`
type Me {
    username: String!
}

type Mutation{

}

type User {
username: String!
email: String!
password: String!
savedBooks(_bookId: String):[Book]
}

type Book {
authors: String
description: String!
bookId: String!
image: String
link: string
title: String!
}

type Auth{

}
`