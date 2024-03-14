import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    id
    genres
  }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`
export const ALL_BOOKS = gql`
    query ($genre: [String]){
      allBooks (genre: $genre){
        title
        id
        published
        genres
        author{
          name
        }
      }
    }
`
export const ADD_BOOK = gql`
    mutation ($title: String!, $author: String!, $genres: [String!]!, $published: Int) {
      addBook (
        title: $title,
        author: $author,
        genres: $genres,
        published: $published
      ){
        title
        genres
      }
    }
`

export const UPDATE_AUTHOR = gql`
    mutation ($born: Int!, $name: String!) {
      editAuthor(
        born: $born,
        name: $name
      ){
        born
        name
      }
    }
`

export const FAVORITE_GENRE = gql`
    query ($genre: [String]){
      allBooks (genre: $genre){
        title
        id
        published
        genres
        author{
          name
        }
      }
    }
    `

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
`

export const USER = gql`
    query{
      me {
        username
        favoriteGenre
      }
    }
`

export const ALL_BOOKS_WITH_GENRE = gql`
query getallBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    published
    genres
    author {
      name
    }
  }
}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`