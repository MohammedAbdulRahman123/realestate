import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import YourOrderCell from 'src/components/YourOrderCell'

const YourOrderPage = () => {
  return (
    <>
      <Metadata title="YourOrder" description="YourOrder page" />

      <YourOrderCell />
    </>
  )
}

export default YourOrderPage
