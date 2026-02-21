import { NextResponse } from 'next/server';
import imagekit from '@/lib/imagekit';

export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error('[ImageKit Auth Error]', error);
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
