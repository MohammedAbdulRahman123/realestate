import { Link, routes } from '@redwoodjs/router'

import SubCategories from 'src/components/SubCategory/SubCategories'

export const QUERY = gql`
  query FindSubCategories {
    subCategories {
      id
      sub_category_name
      desc
      created_at
      updated_at
      extra
      categoryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No subCategories yet. '}
      <Link to={routes.newSubCategory()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ subCategories }) => {
  return <SubCategories subCategories={subCategories} />
}
