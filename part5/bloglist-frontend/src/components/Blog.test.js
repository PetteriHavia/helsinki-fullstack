import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('render blog content', () => {

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test title',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(`Title: ${blog.title} Author: ${blog.author}`)
  expect(element).toBeDefined()
})


test('clicking the View button calls event handler once', async () => {

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test title',
    likes: 100,
    user: { username: 'test user' }
  }

  render(<Blog blog={blog} user={{ id: 1 }} />)

  expect(screen.queryByText('Likes: 100')).toBeNull()
  expect(screen.queryByText('By User: test user')).toBeNull()

  //const mockHandler = jest.fn()
  const button = screen.getByText('View')
  userEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText('Likes: 100')).toBeVisible()
    expect(screen.getByText('By User: test user')).toBeVisible()
  })
})
