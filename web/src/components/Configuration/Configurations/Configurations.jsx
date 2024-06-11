import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Configuration/ConfigurationsCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_CONFIGURATION_MUTATION = gql`
  mutation DeleteConfigurationMutation($id: Int!) {
    deleteConfiguration(id: $id) {
      id
    }
  }
`

const ConfigurationsList = ({ configurations }) => {
  const [deleteConfiguration] = useMutation(DELETE_CONFIGURATION_MUTATION, {
    onCompleted: () => {
      toast.success('Configuration deleted')
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
    if (confirm('Are you sure you want to delete configuration ' + id + '?')) {
      deleteConfiguration({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Heading</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {configurations.map((configuration) => (
            <tr key={configuration.id}>
              <td>{truncate(configuration.id)}</td>
              <td>{truncate(configuration.heading)}</td>
              <td>{timeTag(configuration.created_at)}</td>
              <td>{timeTag(configuration.updated_at)}</td>
              <td>{jsonTruncate(configuration.extra)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.configuration({ id: configuration.id })}
                    title={'Show configuration ' + configuration.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editConfiguration({ id: configuration.id })}
                    title={'Edit configuration ' + configuration.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete configuration ' + configuration.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(configuration.id)}
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

export default ConfigurationsList
