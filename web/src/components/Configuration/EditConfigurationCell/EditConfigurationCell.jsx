import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ConfigurationForm from 'src/components/Configuration/ConfigurationForm'

export const QUERY = gql`
  query EditConfigurationById($id: Int!) {
    configuration: configuration(id: $id) {
      id
      heading
      created_at
      updated_at
      extra
    }
  }
`
const UPDATE_CONFIGURATION_MUTATION = gql`
  mutation UpdateConfigurationMutation(
    $id: Int!
    $input: UpdateConfigurationInput!
  ) {
    updateConfiguration(id: $id, input: $input) {
      id
      heading
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ configuration }) => {
  const [updateConfiguration, { loading, error }] = useMutation(
    UPDATE_CONFIGURATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Configuration updated')
        navigate(routes.configurations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateConfiguration({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Configuration {configuration?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ConfigurationForm
          configuration={configuration}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
