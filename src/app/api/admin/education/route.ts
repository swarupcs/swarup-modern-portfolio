// src/app/api/admin/education/route.ts

import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error('[GET Education Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { degree, institution, duration, description, grade } =
      await request.json();

    const education = await prisma.education.create({
      data: { degree, institution, duration, description, grade },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error('[POST Education Error]', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, degree, institution, duration, description, grade } =
      await request.json();

    const education = await prisma.education.update({
      where: { id },
      data: { degree, institution, duration, description, grade },
    });

    return NextResponse.json(education);
  } catch (error) {
    console.error('[PUT Education Error]', error);
    return NextResponse.json(
      { error: 'Failed to update education' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.education.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE Education Error]', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 },
    );
  }
}
