import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const onCreatePokemon = async (name: string, imageUrl: string) => {
    const pokemon = await prisma.pokemon.create({ 
        data: {
            name,
            imageUrl,
        } });
    return pokemon;
};

export const onDelete = async (id: number) => {
    await prisma.pokemon.delete({ where: { id } });
};

export const onUpdate = async (id: number, name: string) => {
    await prisma.pokemon.update({ where: { id }, data: { name } });
};
