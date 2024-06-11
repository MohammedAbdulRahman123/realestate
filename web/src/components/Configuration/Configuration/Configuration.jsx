import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_CONFIGURATION_MUTATION = gql`
  mutation DeleteConfigurationMutation($id: Int!) {
    deleteConfiguration(id: $id) {
      id
    }
  }
`

const Configuration = ({ configuration }) => {
  const [deleteConfiguration] = useMutation(DELETE_CONFIGURATION_MUTATION, {
    onCompleted: () => {
      toast.success('Configuration deleted')
      navigate(routes.configurations())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete configuration ' + id + '?')) {
      deleteConfiguration({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Configuration {configuration.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{configuration.id}</td>
            </tr>
            <tr>
              <th>Heading</th>
              <td>{configuration.heading}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(configuration.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(configuration.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(configuration.extra)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editConfiguration({ id: configuration.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(configuration.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Configuration
