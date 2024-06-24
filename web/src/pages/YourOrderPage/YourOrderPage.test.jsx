import { render } from '@redwoodjs/testing/web'

import YourOrderPage from './YourOrderPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('YourOrderPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<YourOrderPage />)
    }).not.toThrow()
  })
})
