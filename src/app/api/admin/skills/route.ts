// src/app/api/admin/skills/route.ts

import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('[GET Skills Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, category, level, icon } = await request.json();

    const skill = await prisma.skill.create({
      data: { name, category, level, icon },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('[POST Skill Error]', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, category, level, icon } = await request.json();

    const skill = await prisma.skill.update({
      where: { id },
      data: { name, category, level, icon },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error('[PUT Skill Error]', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
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

    await prisma.skill.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE Skill Error]', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 },
    );
  }
}
