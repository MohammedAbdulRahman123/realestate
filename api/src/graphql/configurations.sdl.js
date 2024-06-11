export const schema = gql`
  type Configuration {
    id: Int!
    heading: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
  }

  type Query {
    configurations: [Configuration!]! @requireAuth
    configuration(id: Int!): Configuration @requireAuth
  }

  input CreateConfigurationInput {
    heading: String!
    extra: JSON
  }

  input UpdateConfigurationInput {
    heading: String
    extra: JSON
  }

  type Mutation {
    createConfiguration(input: CreateConfigurationInput!): Configuration!
      @requireAuth
    updateConfiguration(
      id: Int!
      input: UpdateConfigurationInput!
    ): Configuration! @requireAuth
    deleteConfiguration(id: Int!): Configuration! @requireAuth
  }
`
