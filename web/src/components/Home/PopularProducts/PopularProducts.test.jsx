import { render } from '@redwoodjs/testing/web'

import PopularProducts from './PopularProducts'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PopularProducts', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PopularProducts />)
    }).not.toThrow()
  })
})
