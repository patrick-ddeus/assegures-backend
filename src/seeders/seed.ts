import { Prisma } from '@prisma/client'
import { prisma } from '@/configs'

const seed = async () => {
  try {
    const data: Prisma.XOR<
      Prisma.PropertyCreateInput,
      Prisma.PropertyUncheckedCreateInput
    > = {
      title: 'Exemplo de Imóvel 3',
      slogan: 'A melhor opção para morar',
      description:
        'Este imóvel é espaçoso e bem localizado, perfeito para famílias.',
      short_description: 'Imóvel espaçoso e bem localizado',
      price: '150000',
      type: {
        connect: {
          id: 1
        }
      },
      subtype: {
        connect: {
          id: 1
        }
      },
      emphasis: true,
      goal: 'Venda',
      status: true,
      number_of_rooms: 3,
      number_of_bathrooms: 2,
      number_of_garages: 1,
      suites: 1,
      total_area: 150,
      building_area: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      characteristics: {
        connectOrCreate: [
          {
            where: {
              name: 'Agua'
            },
            create: {
              id: 1,
              name: 'Agua'
            }
          },
          {
            where: {
              name: 'Energia'
            },
            create: {
              id: 2,
              name: 'Energia'
            }
          }
        ]
      },
      address: {
        create: {
          id: 4,
          city: 'São Gonçalo',
          city_index: 'sao goncalo',
          district: 'Alcântara',
          district_index: 'alcantara',
          street: 'Main Street',
          street_index: 'main street',
          state: 'Rio de Janeiro'
        }
      }
    }

    await prisma.property.create({ data })

    console.log('Seed concluído com sucesso')
  } catch (error) {
    console.error('Erro ao executar o seed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
