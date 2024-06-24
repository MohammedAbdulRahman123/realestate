import { render } from '@redwoodjs/testing/web'

import ViewLayoutPage from './ViewLayoutPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ViewLayoutPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewLayoutPage />)
    }).not.toThrow()
  })
})
