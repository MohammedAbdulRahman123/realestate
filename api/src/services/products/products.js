import { db } from 'src/lib/db'

export const products = () => {
  return db.product.findMany()
}

export const product = ({ id }) => {
  return db.product.findUnique({
    where: { id },
  })
}
export const showProducts = ({ id }) => {
  return db.product.findMany({
    where: {
      subCategoryId: id,
    },
  })
}

export const createProduct = ({ input }) => {
  return db.product.create({
    data: input,
  })
}

export const updateProduct = ({ id, input }) => {
  return db.product.update({
    data: input,
    where: { id },
  })
}

export const deleteProduct = ({ id }) => {
  return db.product.delete({
    where: { id },
  })
}

export const Product = {
  subcategory: (_obj, { root }) => {
    return db.product.findUnique({ where: { id: root?.id } }).subcategory()
  },
}
