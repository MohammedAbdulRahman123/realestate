export const schema = gql`
  type RealLayouts {
    id: Int!
    name: String!
    image: String!
    markers: JSON!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    user: User!
    userId: Int!
  }

  type Query {
    realLayoutses: [RealLayouts!]! @requireAuth
    realLayouts(id: Int!): RealLayouts @requireAuth
  }

  input CreateRealLayoutsInput {
    name: String!
    image: String!
    markers: JSON!
    extra: JSON
    userId: Int!
  }

  input UpdateRealLayoutsInput {
    name: String
    image: String
    markers: JSON
    extra: JSON
    userId: Int
  }

  type Mutation {
    createRealLayouts(input: CreateRealLayoutsInput!): RealLayouts! @requireAuth
    updateRealLayouts(id: Int!, input: UpdateRealLayoutsInput!): RealLayouts!
      @requireAuth
    deleteRealLayouts(id: Int!): RealLayouts! @requireAuth
  }
`
