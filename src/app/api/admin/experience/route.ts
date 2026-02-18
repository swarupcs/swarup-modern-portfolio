

import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        skills: { select: { skill: true } },
      },
    });

    const formatted = experience.map((exp) => ({
      ...exp,
      skills: exp.skills.map((s) => s.skill),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('[GET Experience Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { role, company, duration, description, skills } = await request.json();

    const experience = await prisma.experience.create({
      data: {
        role,
        company,
        duration,
        description,
        skills: {
          create: (skills as string[]).map((skill) => ({ skill })),
        },
      },
      include: {
        skills: { select: { skill: true } },
      },
    });

    return NextResponse.json(
      { ...experience, skills: experience.skills.map((s) => s.skill) },
      { status: 201 },
    );
  } catch (error) {
    console.error('[POST Experience Error]', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, role, company, duration, description, skills } =
      await request.json();

    const experience = await prisma.$transaction(async (tx) => {
      await tx.experienceSkill.deleteMany({ where: { experienceId: id } });

      return tx.experience.update({
        where: { id },
        data: {
          role,
          company,
          duration,
          description,
          skills: {
            create: (skills as string[]).map((skill) => ({ skill })),
          },
        },
        include: {
          skills: { select: { skill: true } },
        },
      });
    });

    return NextResponse.json({
      ...experience,
      skills: experience.skills.map((s) => s.skill),
    });
  } catch (error) {
    console.error('[PUT Experience Error]', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
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

    await prisma.experience.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE Experience Error]', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 },
    );
  }
}
