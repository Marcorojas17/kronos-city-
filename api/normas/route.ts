import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const normas = await prisma.norma.findMany({
    include: { requisitos: true },
  });
  return NextResponse.json(normas);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { codigo, titulo, descripcion, tipo, version } = body;
  const nueva = await prisma.norma.create({
    data: { codigo, titulo, descripcion, tipo, version },
  });
  return NextResponse.json(nueva, { status: 201 });
}
