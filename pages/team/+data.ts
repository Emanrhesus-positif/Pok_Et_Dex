import { PrismaClient } from "@prisma/client";
import type { PageContextServer } from "vike/types";

const prisma = new PrismaClient();

export type Data = Awaited<ReturnType<typeof data>>;

export default async function data(_pageContext: PageContextServer) {
    const notes = await prisma.note.findMany();
  return { notes };
}
