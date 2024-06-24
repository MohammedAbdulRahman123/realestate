import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import RealLayoutsCell from 'src/components/RealLayouts/RealLayoutsCell'

const ViewLayoutPage = ({ id }) => {
  return (
    <>
      <Metadata title="ViewLayout" description="ViewLayout page" />

      <RealLayoutsCell id={id} />
    </>
  )
}

export default ViewLayoutPage
