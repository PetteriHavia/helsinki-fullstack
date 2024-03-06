describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'cypress',
      name: 'cypress',
      password: 'cypress'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173/')
  })

  it('Front page can be opened', () => {
    cy.contains('Log in application')
  })

  it('login fails with wrong password', function () {
    cy.get('#username').type('cypress')
    cy.get('#password').type('cyp')
    cy.get('#login-button').click()
    cy.contains('Wrong username or password')
  })

  it('User can login', function () {
    cy.get('#username').type('cypress')
    cy.get('#password').type('cypress')
    cy.get('#login-button').click()

    cy.contains('cypress logged in')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress', password: 'cypress' })
    })
    it('a new blog can be created', function () {
      cy.createBlog({ title: 'cypress blog', author: 'cypress', url: 'cypress/url' })
    })

    it('user can like a blog post', function () {
      cy.createBlog({ title: 'cypress blog', author: 'cypress', url: 'cypress/url' })
      cy.contains('View').click()
      cy.get('.like-btn').click()
      cy.contains('Likes: 1')
    })
    it('user can delete blog', function () {
      cy.createBlog({ title: 'cypress blog', author: 'cypress', url: 'cypress/url' })
      cy.contains('View').click()
      cy.get('.remove-btn').click()
      cy.should('not.contain', 'cypress blog')
    })
  })
})