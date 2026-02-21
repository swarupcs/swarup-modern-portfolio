import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { hidden: false },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      include: { technologies: { select: { technology: true } } },
    });
    const formatted = projects.map((p) => ({
      ...p,
      technologies: p.technologies.map((t) => t.technology),
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    console.error('[GET Public Projects]', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
