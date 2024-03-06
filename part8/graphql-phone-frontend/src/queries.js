import { gql } from '@apollo/client'


export const ALL_BOOKS = gql`
  query{
    allBooks {
      title
      author
    }
  }
`

export const FIND_AUTHOR_BOOKS = gql`
  query findAuthorBooks($authorToSearch: String!) {
    allBooks(author: $authorToSearch ) {
      title
      published
    }
  }
`
