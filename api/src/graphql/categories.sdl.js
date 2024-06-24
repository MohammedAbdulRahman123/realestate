export const schema = gql`
  type Category {
    id: Int!
    category_name: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    SubCategory: [SubCategory]!
  }

  type Query {
    categories: [Category!]! @skipAuth
    category(id: Int!): Category @requireAuth
  }

  input CreateCategoryInput {
    category_name: String!
    extra: JSON
  }

  input UpdateCategoryInput {
    category_name: String
    extra: JSON
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category! @requireAuth
    updateCategory(id: Int!, input: UpdateCategoryInput!): Category!
      @requireAuth
    deleteCategory(id: Int!): Category! @requireAuth
  }
`
