import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(about);
  } catch (error) {
    console.error('[GET Public About]', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
