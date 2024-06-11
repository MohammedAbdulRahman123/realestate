import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ConfigurationForm from 'src/components/Configuration/ConfigurationForm'

const CREATE_CONFIGURATION_MUTATION = gql`
  mutation CreateConfigurationMutation($input: CreateConfigurationInput!) {
    createConfiguration(input: $input) {
      id
    }
  }
`

const NewConfiguration = () => {
  const [createConfiguration, { loading, error }] = useMutation(
    CREATE_CONFIGURATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Configuration created')
        navigate(routes.configurations())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createConfiguration({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Configuration</h2>
      </header>
      <div className="rw-segment-main">
        <ConfigurationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewConfiguration
