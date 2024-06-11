import Product from 'src/components/Product/Product'

export const QUERY = gql`
  query FindProductById($id: Int!) {
    product: product(id: $id) {
      id
      product_name
      desc
      configuration
      price
      image
      created_at
      updated_at
      extra
      subCategoryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Product not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ product }) => {
  return <Product product={product} />
}
