import { render } from '@redwoodjs/testing/web'

import ShowProductsPage from './ShowProductsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShowProductsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShowProductsPage />)
    }).not.toThrow()
  })
})
