import { prisma } from '@/configs'

export async function createPropertyType() {
  return prisma.propertyType.create({
    data: {
      name: 'Residencial',
      properties_sub_types: {
        create: {
          name: 'Casa'
        }
      }
    },
    include: {
      properties_sub_types: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}
