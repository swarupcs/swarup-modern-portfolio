// src/app/api/admin/contact/route.ts

import { prisma } from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('[GET Contact Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('[POST Contact Error]', error);
    return NextResponse.json(
      { error: 'Failed to submit contact message' },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, read } = await request.json();

    const contact = await prisma.contact.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('[PUT Contact Error]', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
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

    await prisma.contact.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE Contact Error]', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 },
    );
  }
}
