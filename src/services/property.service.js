import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getProperties({ city, district, priceMin, priceMax }) {
    const where = {};

    if (city) {
        where.address = {
            city: {
                contains: city,
                mode: "insensitive"
            }
        };
    }

    if (district) {
        where.address = {
            district: {
                contains: district,
                mode: "insensitive"
            }
        };
    }

    if (priceMin && priceMax) {
        where.AND = [
            {
                price: {
                    gte: priceMin
                }
            },
            {
                price: {
                    lte: priceMax
                }
            }
        ];
    } else if (priceMin) {
        where.price = {
            gte: priceMin,
        };
    } else if (priceMax) {
        where.price = {
            lte: priceMax,
        };
    }

    try {
        const result = await prisma.property.findMany({
            where,
            include: {
                characteristics: true,
                address: true,
            },
        });
        return result;
    } catch (error) {
        throw new Error(`Error ao pegar as propriedades: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

export default {
    getProperties
};