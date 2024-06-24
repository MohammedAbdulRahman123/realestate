import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/RealLayouts/RealLayoutsesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_REAL_LAYOUTS_MUTATION = gql`
  mutation DeleteRealLayoutsMutation($id: Int!) {
    deleteRealLayouts(id: $id) {
      id
    }
  }
`

const RealLayoutsesList = ({ realLayoutses }) => {
  const [deleteRealLayouts] = useMutation(DELETE_REAL_LAYOUTS_MUTATION, {
    onCompleted: () => {
      toast.success('RealLayouts deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete realLayouts ' + id + '?')) {
      deleteRealLayouts({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            {/* <th>Image</th>
            <th>Markers</th>
            <th>Created at</th> */}
            <th>Updated at</th>
            {/* <th>Extra</th> */}
            {/* <th>User id</th> */}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {realLayoutses.map((realLayouts, ind) => (
            <tr key={realLayouts.id}>
              {/* <td>{truncate(realLayouts.id)}</td> */}
              <td>{ind}</td>
              <td>{truncate(realLayouts.name)}</td>
              {/* <td>{truncate(realLayouts.image)}</td> */}
              {/* <td>{jsonTruncate(realLayouts.markers)}</td> */}
              {/* <td>{timeTag(realLayouts.created_at)}</td> */}
              <td>{timeTag(realLayouts.updated_at)}</td>
              {/* <td>{jsonTruncate(realLayouts.extra)}</td> */}
              {/* <td>{truncate(realLayouts.userId)}</td> */}
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.realLayouts({ id: realLayouts.id })}
                    title={'Show realLayouts ' + realLayouts.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRealLayouts({ id: realLayouts.id })}
                    title={'Edit realLayouts ' + realLayouts.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete realLayouts ' + realLayouts.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(realLayouts.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RealLayoutsesList
