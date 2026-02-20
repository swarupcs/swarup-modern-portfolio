import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
      include: { skills: { select: { skill: true } } },
    });
    const formatted = experience.map((exp) => ({
      ...exp,
      skills: exp.skills.map((s) => s.skill),
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    console.error('[GET Public Experience]', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
