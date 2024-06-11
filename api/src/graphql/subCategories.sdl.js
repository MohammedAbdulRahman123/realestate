export const schema = gql`
  type SubCategory {
    id: Int!
    sub_category_name: String!
    category: Category!
    desc: JSON!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    Product: [Product]!
    categoryId: Int!
  }

  type Query {
    subCategories: [SubCategory!]! @requireAuth
    subCategory(id: Int!): SubCategory @requireAuth
  }

  input CreateSubCategoryInput {
    sub_category_name: String!
    desc: JSON!
    extra: JSON
    categoryId: Int!
  }

  input UpdateSubCategoryInput {
    sub_category_name: String
    desc: JSON
    extra: JSON
    categoryId: Int
  }

  type Mutation {
    createSubCategory(input: CreateSubCategoryInput!): SubCategory! @requireAuth
    updateSubCategory(id: Int!, input: UpdateSubCategoryInput!): SubCategory!
      @requireAuth
    deleteSubCategory(id: Int!): SubCategory! @requireAuth
  }
`
