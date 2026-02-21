import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const personalInfo = await prisma.personalInfo.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(personalInfo);
  } catch (error) {
    console.error('[GET Public PersonalInfo]', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
