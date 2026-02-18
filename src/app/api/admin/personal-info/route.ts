// src/app/api/admin/personal-info/route.ts

import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const personalInfo = await prisma.personalInfo.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(personalInfo);
  } catch (error) {
    console.error('[GET PersonalInfo Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch personal info' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      title,
      subtitle,
      email,
      phone,
      location,
      website,
      github,
      linkedin,
      twitter,
      resume,
      avatar,
    } = body;

    const personalInfo = await prisma.personalInfo.create({
      data: {
        name,
        title,
        subtitle,
        email,
        phone,
        location,
        website,
        github,
        linkedin,
        twitter,
        resume,
        avatar,
      },
    });

    return NextResponse.json(personalInfo, { status: 201 });
  } catch (error) {
    console.error('[POST PersonalInfo Error]', error);
    return NextResponse.json(
      { error: 'Failed to create personal info' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      title,
      subtitle,
      email,
      phone,
      location,
      website,
      github,
      linkedin,
      twitter,
      resume,
      avatar,
    } = body;

    const data = {
      name,
      title,
      subtitle,
      email,
      phone,
      location,
      website,
      github,
      linkedin,
      twitter,
      resume,
      avatar,
    };

    let personalInfo;

    if (id) {
      // Update existing record
      personalInfo = await prisma.personalInfo.update({
        where: { id },
        data,
      });
    } else {
      // No id — check if any record exists, update first or create new
      const existing = await prisma.personalInfo.findFirst();
      if (existing) {
        personalInfo = await prisma.personalInfo.update({
          where: { id: existing.id },
          data,
        });
      } else {
        personalInfo = await prisma.personalInfo.create({ data });
      }
    }

    return NextResponse.json(personalInfo);
  } catch (error) {
    console.error('[PUT PersonalInfo Error]', error);
    return NextResponse.json(
      { error: 'Failed to update personal info' },
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

    await prisma.personalInfo.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE PersonalInfo Error]', error);
    return NextResponse.json(
      { error: 'Failed to delete personal info' },
      { status: 500 },
    );
  }
}