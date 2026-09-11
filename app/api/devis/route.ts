import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'devis.json');

async function ensureFile() {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf-8');
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, telephone, type, message } = body ?? {};

    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Les champs nom, email et message sont requis.' }, { status: 400 });
    }

    await ensureFile();
    const raw = await fs.readFile(filePath, 'utf-8');
    const items = JSON.parse(raw || '[]');

    const newEntry = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      nom,
      email,
      telephone: telephone || '',
      type: type || 'Projet',
      message
    };

    items.push(newEntry);
    await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf-8');

    return NextResponse.json({ success: true, id: newEntry.id });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Erreur serveur lors de l’enregistrement.'
    }, { status: 500 });
  }
}
