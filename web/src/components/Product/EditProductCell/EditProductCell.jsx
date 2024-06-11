import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProductForm from 'src/components/Product/ProductForm'

export const QUERY = gql`
  query EditProductById($id: Int!) {
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
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation($id: Int!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ product }) => {
  const [updateProduct, { loading, error }] = useMutation(
    UPDATE_PRODUCT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Product updated')
        navigate(routes.products())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateProduct({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Product {product?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProductForm
          product={product}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
