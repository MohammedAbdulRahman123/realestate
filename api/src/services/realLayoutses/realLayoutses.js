import { db } from 'src/lib/db'

export const realLayoutses = () => {
  return db.realLayouts.findMany()
}

export const realLayouts = ({ id }) => {
  return db.realLayouts.findUnique({
    where: { id },
  })
}

export const createRealLayouts = ({ input }) => {
  return db.realLayouts.create({
    data: input,
  })
}

export const updateRealLayouts = ({ id, input }) => {
  return db.realLayouts.update({
    data: input,
    where: { id },
  })
}

export const deleteRealLayouts = ({ id }) => {
  return db.realLayouts.delete({
    where: { id },
  })
}

export const RealLayouts = {
  user: (_obj, { root }) => {
    return db.realLayouts.findUnique({ where: { id: root?.id } }).user()
  },
}
