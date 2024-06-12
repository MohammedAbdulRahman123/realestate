import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ShowProductsCell from 'src/components/ShowProducts/ShowProductsCell'

const ShowProductsPage = ({ id }) => {
  return (
    <>
      <Metadata title="ShowProducts" description="ShowProducts page" />

      <div>
        <ShowProductsCell id={id} />
      </div>
    </>
  )
}

export default ShowProductsPage
