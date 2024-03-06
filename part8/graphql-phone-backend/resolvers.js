const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: async (root, args, context) => { return context.currentUser },
    allBooks: async (root, args) => {
      let query = {} //Build the query first and then check the db using the find()
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query.author = author._id
        }
      }
      if (args.genre) {
        query.genres = { $all: args.genre }
      }
      const books = await Book.find(query).populate("author", '_id name born')
      //const books = await Book.find(query)
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const allAuthors = authors.map(author => {
        return {
          name: author.name,
          bookCount: author.books.length,
          born: author.born
        }
      })
      return allAuthors
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extension: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if (args.author.length < 4) {
        throw new GraphQLError('Author name must be atleast 4 characters long')
      }
      if (args.title.length < 5) {
        throw new GraphQLError('Book title must be atleast 5 characters long')
      }
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const newBook = new Book({ ...args, author: author._id, })
        await newBook.save()
        author.books = author.books.concat(newBook._id)
        await author.save()
        return newBook
      } catch (error) {
        console.log('Adding new book failed', error)
        throw new Error('Failed to add book')
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Not authenticated', {
          extension: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      try {
        const author = await Author.findOne({ name: args.name })
        author.born = args.born
        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', {
          extension: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  },
}

module.exports = resolvers