export const schema = gql`
  type Order {
    id: String!
    order_item: JSON!
    total_amount: Float!
    status: String!
    delivary_date: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    user: User!
    userId: Int!
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: String!): Order @requireAuth
  }

  input CreateOrderInput {
    order_item: JSON!
    total_amount: Float!
    status: String!
    delivary_date: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    extra: JSON
    userId: Int!
  }

  input UpdateOrderInput {
    order_item: JSON
    total_amount: Float
    status: String
    delivary_date: DateTime
    created_at: DateTime
    updated_at: DateTime
    extra: JSON
    userId: Int
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: String!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: String!): Order! @requireAuth
  }
`
