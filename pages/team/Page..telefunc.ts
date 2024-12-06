import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const onCreateNote = async (title: string) => {
    const note = await prisma.note.create({ data: {title} });
    return note;
};

export const onDelete = async (id: number) => {
    await prisma.note.delete({ where: { id } });
};

export const onUpdate = async (id: number, title: string) => {
    await prisma.note.update({ where: { id }, data: { title } });
};