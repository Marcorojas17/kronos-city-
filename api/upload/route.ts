import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const checklistId = formData.get('checklistId') as string;
  const userId = formData.get('userId') as string;

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Guardar en public/uploads
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  await mkdir(uploadDir, { recursive: true });
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  // Guardar en BD
  const evidencia = await prisma.evidencia.create({
    data: {
      nombre: file.name,
      url: `/uploads/${filename}`,
      tipo: file.type,
      checklistId,
      subidoPor: userId,
    },
  });

  return NextResponse.json(evidencia, { status: 201 });
}
