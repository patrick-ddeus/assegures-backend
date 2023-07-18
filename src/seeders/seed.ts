import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = async () => {
  try {
    const data = [
      {
        id: 1,
        title: 'Exemplo de Imóvel 3',
        slogan: 'A melhor opção para morar',
        description:
          'Este imóvel é espaçoso e bem localizado, perfeito para famílias.',
        short_description: 'Imóvel espaçoso e bem localizado',
        price: '150000',
        type_id: {
          connect: {
            id: 1
          }
        },
        subtype_id: {
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
              id: 1,
              name: 'Agua'
            },
            {
              id: 2,
              name: 'Energia'
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
      },
      {
        id: 2,
        title: 'Exemplo de Imóvel 4',
        slogan: 'Excelente localização',
        description: 'Imóvel com vista panorâmica e próximo a comércios.',
        short_description: 'Imóvel com vista panorâmica',
        price: '200000',
        type_id: {
          connect: {
            id: 2
          }
        },
        subtype_id: {
          connect: {
            id: 2
          }
        },
        emphasis: false,
        goal: 'Aluguel',
        status: true,
        number_of_rooms: 2,
        number_of_bathrooms: 1,
        number_of_garages: 0,
        suites: 0,
        total_area: 80,
        building_area: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        characteristics: {
          connectOrCreate: [
            {
              id: 3,
              name: 'Ar Condicionado'
            },
            {
              id: 4,
              name: 'Segurança 24 horas'
            }
          ]
        },
        address: {
          create: {
            id: 5,
            city: 'Rio de Janeiro',
            city_index: 'rio de janeiro',
            district: 'Copacabana',
            district_index: 'copacabana',
            street: 'Beach Avenue',
            street_index: 'beach avenue',
            state: 'RJ'
          }
        }
      }
    ]

    await prisma.property.createMany({ data })

    console.log('Seed concluído com sucesso')
  } catch (error) {
    console.error('Erro ao executar o seed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
