import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

const Product = ({ product }) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    onCompleted: () => {
      toast.success('Product deleted')
      navigate(routes.products())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete product ' + id + '?')) {
      deleteProduct({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Product {product.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{product.id}</td>
            </tr>
            <tr>
              <th>Product name</th>
              <td>{product.product_name}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{jsonDisplay(product.desc)}</td>
            </tr>
            <tr>
              <th>Configuration</th>
              <td>{jsonDisplay(product.configuration)}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{jsonDisplay(product.price)}</td>
            </tr>
            <tr>
              <th>Image</th>
              <td>{product.image}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(product.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(product.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(product.extra)}</td>
            </tr>
            <tr>
              <th>Sub category id</th>
              <td>{product.subCategoryId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editProduct({ id: product.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(product.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Product
