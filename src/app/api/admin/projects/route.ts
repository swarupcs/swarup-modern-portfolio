// src/app/api/admin/projects/route.ts

import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        technologies: {
          select: { technology: true },
        },
      },
    });

    const formatted = projects.map((p) => ({
      ...p,
      technologies: p.technologies.map((t) => t.technology),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('[GET Projects Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      image,
      liveUrl,
      githubUrl,
      category,
      featured,
      technologies,
    } = await request.json();

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image,
        liveUrl,
        githubUrl,
        category,
        featured: featured ?? false,
        technologies: {
          create: (technologies as string[]).map((tech) => ({
            technology: tech,
          })),
        },
      },
      include: {
        technologies: { select: { technology: true } },
      },
    });

    return NextResponse.json(
      { ...project, technologies: project.technologies.map((t) => t.technology) },
      { status: 201 },
    );
  } catch (error) {
    console.error('[POST Project Error]', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      title,
      description,
      image,
      liveUrl,
      githubUrl,
      category,
      featured,
      hidden,
      technologies,
    } = await request.json();

    // Step 1: delete old technologies
    await prisma.projectTechnology.deleteMany({ where: { projectId: id } });

    // Step 2: update project and insert new technologies
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        image,
        liveUrl,
        githubUrl,
        category,
        featured: featured ?? false,
        hidden: hidden ?? false,
        technologies: {
          create: (technologies as string[]).map((tech) => ({
            technology: tech,
          })),
        },
      },
      include: {
        technologies: { select: { technology: true } },
      },
    });

    return NextResponse.json({
      ...project,
      technologies: project.technologies.map((t) => t.technology),
    });
  } catch (error) {
    console.error('[PUT Project Error]', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
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

    // Cascade delete handles project_technologies automatically
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE Project Error]', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 },
    );
  }
}
