import { render } from '@redwoodjs/testing/web'

import ProdPage from './ProdPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProdPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProdPage />)
    }).not.toThrow()
  })
})
