// src/app/api/admin/about/route.ts

import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const about = await prisma.about.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(about);
  } catch (error) {
    console.error('[GET About Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch about info' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { bio, description, highlights } = await request.json();

    const about = await prisma.about.create({
      data: {
        bio,
        description,
        highlights: highlights ?? [],
      },
    });

    return NextResponse.json(about, { status: 201 });
  } catch (error) {
    console.error('[POST About Error]', error);
    return NextResponse.json(
      { error: 'Failed to create about info' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, bio, description, highlights } = await request.json();

    const data = {
      bio,
      description,
      highlights: highlights ?? [],
    };

    let about;

    if (id) {
      about = await prisma.about.update({
        where: { id },
        data,
      });
    } else {
      const existing = await prisma.about.findFirst();
      if (existing) {
        about = await prisma.about.update({
          where: { id: existing.id },
          data,
        });
      } else {
        about = await prisma.about.create({ data });
      }
    }

    return NextResponse.json(about);
  } catch (error) {
    console.error('[PUT About Error]', error);
    return NextResponse.json(
      { error: 'Failed to update about info' },
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

    await prisma.about.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE About Error]', error);
    return NextResponse.json(
      { error: 'Failed to delete about info' },
      { status: 500 },
    );
  }
}