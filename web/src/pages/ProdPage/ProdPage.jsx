import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ProdCell from 'src/components/ShowProducts/ProdCell'

const ProdPage = ({ id }) => {
  return (
    <>
      <Metadata title="Prod" description="Prod page" />

      <ProdCell id={id} />
    </>
  )
}

export default ProdPage
