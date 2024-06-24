import { db } from 'src/lib/db'

export const orders = () => {
  return db.order.findMany()
}

export const order = ({ id }) => {
  return db.order.findUnique({
    where: { id },
  })
}

export const yourOrder = () => {
  return db.order.findMany({
    where: {
      userId: 2,
    },
    orderBy: {
      created_at: 'desc',
    },
  })
}
export const orderById = ({ id }) => {
  return db.order.findUnique({
    where: { id },
  })
}
export const createOrder = ({ input }) => {
  return db.order.create({
    data: input,
  })
}

export const updateOrder = ({ id, input }) => {
  return db.order.update({
    data: input,
    where: { id },
  })
}

export const deleteOrder = ({ id }) => {
  return db.order.delete({
    where: { id },
  })
}

export const Order = {
  user: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).user()
  },
}
