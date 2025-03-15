import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createNewData(tableName: string, content: string) {
  try {
    const data = await (prisma as any)[tableName].create({ 
      data: {
        content 
      }
    });
    return data;
  } 
  catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getAllData(tableName: string) {
  try {
    const data = await (prisma as any)[tableName].findMany();
    return data;
  }
  catch (error) {
    return { error: (error as Error).message };
  }
}

export async function updateDataByAny(tableName: string, id: string, content: string) {
  try {
    const data = await (prisma as any)[tableName].update({
      where: {id},
      data: {content}
    });
    return data;
  } 
  catch (error) {
    return { error: (error as Error).message };
  }
}

export async function deleteDataByAny(tableName: string, id: string) {
  try {
    const data = await (prisma as any)[tableName].delete({
      where: {id} 
    });
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}