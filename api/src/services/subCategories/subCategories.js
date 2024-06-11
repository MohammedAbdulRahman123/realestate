import { db } from 'src/lib/db'

export const subCategories = () => {
  return db.subCategory.findMany()
}

export const subCategory = ({ id }) => {
  return db.subCategory.findUnique({
    where: { id },
  })
}

export const createSubCategory = ({ input }) => {
  return db.subCategory.create({
    data: input,
  })
}

export const updateSubCategory = ({ id, input }) => {
  return db.subCategory.update({
    data: input,
    where: { id },
  })
}

export const deleteSubCategory = ({ id }) => {
  return db.subCategory.delete({
    where: { id },
  })
}

export const SubCategory = {
  category: (_obj, { root }) => {
    return db.subCategory.findUnique({ where: { id: root?.id } }).category()
  },
  Product: (_obj, { root }) => {
    return db.subCategory.findUnique({ where: { id: root?.id } }).Product()
  },
}
