export const schema = gql`
  type Product {
    id: Int!
    product_name: String!
    subcategory: SubCategory!
    desc: JSON!
    configuration: JSON!
    price: JSON!
    image: String!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    subCategoryId: Int!
  }

  type Query {
    products: [Product!]! @requireAuth
    showProducts(id: Int!): [Product!]! @skipAuth
    product(id: Int!): Product @skipAuth
  }

  input CreateProductInput {
    product_name: String!
    desc: JSON!
    configuration: JSON!
    price: JSON!
    image: String!
    extra: JSON
    subCategoryId: Int!
  }

  input UpdateProductInput {
    product_name: String
    desc: JSON
    configuration: JSON
    price: JSON
    image: String
    extra: JSON
    subCategoryId: Int
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: Int!, input: UpdateProductInput!): Product! @requireAuth
    deleteProduct(id: Int!): Product! @requireAuth
  }
`
