import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Resend } from 'resend';

const filePath = path.join(process.cwd(), 'data', 'devis.json');

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

async function saveDevisLocally(entry: Record<string, any>) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    let existing: any[] = [];

    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      existing = JSON.parse(raw || '[]');
    } catch {
      existing = [];
    }

    existing.push(entry);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.warn('Local dev file storage unavailable:', error);
    return false;
  }
}

function buildPlainText({ nom, email, telephone, type, message }: Record<string, any>) {
  return [
    'Nouveau devis',
    '',
    `Nom: ${String(nom ?? '').trim() || 'Non renseigné'}`,
    `Email: ${String(email ?? '').trim() || 'Non renseigné'}`,
    `Téléphone: ${String(telephone ?? '').trim() || 'Non renseigné'}`,
    `Type: ${String(type ?? 'Projet').trim() || 'Projet'}`,
    '',
    'Projet:',
    String(message ?? '').trim() || 'Aucun message fourni.'
  ].join('\n');
}

async function sendWhatsApp({ nom, email, telephone, type, message }: Record<string, any>) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_TOKEN;
  const to = process.env.WHATSAPP_TO;

  if (!phoneNumberId || !token || !to) {
    return false;
  }

  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: {
      body: [
        'Nouveau devis',
        '',
        `Nom: ${String(nom ?? '').trim() || 'Non renseigné'}`,
        `Email: ${String(email ?? '').trim() || 'Non renseigné'}`,
        `Téléphone: ${String(telephone ?? '').trim() || 'Non renseigné'}`,
        `Type: ${String(type ?? 'Projet').trim() || 'Projet'}`,
        '',
        'Projet:',
        String(message ?? '').trim() || 'Aucun message fourni.'
      ].join('\n')
    }
  };

  const response = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('WhatsApp API error:', errorText);
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, telephone, type, message } = body ?? {};

    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Les champs nom, email et message sont requis.' }, { status: 400 });
    }

    const newEntry = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      nom,
      email,
      telephone: telephone || '',
      type: type || 'Projet',
      message
    };

    await saveDevisLocally(newEntry);

    const subject = `Nouveau devis - ${String(nom).trim()}`;
    const plainText = buildPlainText(newEntry);

    const emailTo = process.env.CONTACT_EMAIL || 'contact@alucoaprestige.tn';
    const resendClient = getResendClient();
    const emailApiEnabled = Boolean(resendClient);

    if (resendClient) {
      await resendClient.emails.send({
        from: 'Alucoa <noreply@alucoaprestige.tn>',
        to: emailTo,
        subject,
        text: plainText
      });
    }

    const whatsappSent = await sendWhatsApp(newEntry);

    return NextResponse.json({
      success: true,
      id: newEntry.id,
      whatsappSent,
      emailSent: emailApiEnabled
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Erreur serveur lors de l’enregistrement.'
    }, { status: 500 });
  }
}
