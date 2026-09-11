import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'newsletter.json');

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
    const email = body?.email;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }

    await ensureFile();
    const raw = await fs.readFile(filePath, 'utf-8');
    const items = JSON.parse(raw || '[]');

    items.push({
      id: Date.now(),
      email,
      createdAt: new Date().toISOString()
    });

    await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Erreur serveur lors de l’inscription.'
    }, { status: 500 });
  }
}
