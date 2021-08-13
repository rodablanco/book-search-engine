// import dependency
import { gql } from "@apollo/client";

//login mutation
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
    token
    user{
    _id
    username
    email
        }
    }
}`;


//adding user mutation
export const ADD_USER = gql `
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

//mutation to save book

export const SAVE_BOOK = gql `
mutation saveBook($bookToSave: BookInput) {
    saveBook(bookToSave: $bookToSave) {
        _id
        username
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;


export const DELETE_BOOK = gql `
mutation deleteBook($bookId:ID!) {
    deleteBook(bookId: $bookId) {
        _id
        username
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }

    }
}
`;