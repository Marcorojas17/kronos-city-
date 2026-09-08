import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { titulo, descripcion, area, auditorId, requisitosIds } = body;

  // Crear auditoría y sus checklists
  const auditoria = await prisma.auditoria.create({
    data: {
      titulo,
      descripcion,
      area,
      auditorId,
      checklists: {
        create: requisitosIds.map((reqId: string) => ({
          requisitoId: reqId,
        })),
      },
    },
    include: { checklists: true },
  });

  return NextResponse.json(auditoria, { status: 201 });
}

// GET para obtener todas las auditorías
export async function GET() {
  const auditorias = await prisma.auditoria.findMany({
    include: { auditor: true, checklists: { include: { requisito: true } } },
  });
  return NextResponse.json(auditorias);
}
