import { render } from '@redwoodjs/testing/web'

import Prod from './Prod'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Prod', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Prod />)
    }).not.toThrow()
  })
})
