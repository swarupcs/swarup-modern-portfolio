import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { level: 'desc' }],
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('[GET Public Skills]', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
