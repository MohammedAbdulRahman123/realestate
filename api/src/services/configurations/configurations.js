import { db } from 'src/lib/db'

export const configurations = () => {
  return db.configuration.findMany()
}

export const configuration = ({ id }) => {
  return db.configuration.findUnique({
    where: { id },
  })
}

export const createConfiguration = ({ input }) => {
  return db.configuration.create({
    data: input,
  })
}

export const updateConfiguration = ({ id, input }) => {
  return db.configuration.update({
    data: input,
    where: { id },
  })
}

export const deleteConfiguration = ({ id }) => {
  return db.configuration.delete({
    where: { id },
  })
}
