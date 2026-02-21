import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      console.error('ADMIN_USERNAME or ADMIN_PASSWORD not set in environment');
      return NextResponse.json(
        { error: 'Server misconfiguration' },
        { status: 500 },
      );
    }

    if (username !== validUsername || password !== validPassword) {
      await new Promise((r) => setTimeout(r, 1000));
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // Check if running on localhost
    const host = request.headers.get('host') ?? '';
    const isLocalhost =
      host.startsWith('localhost') ||
      host.startsWith('127.0.0.1') ||
      host.startsWith('0.0.0.0');

    // 30 days on localhost, 24 hours in production
    const maxAge = isLocalhost
      ? 60 * 60 * 24 * 30 // 30 days
      : 60 * 60 * 24; // 24 hours

    const response = NextResponse.json({
      success: true,
      expiresIn: isLocalhost ? '30 days' : '24 hours',
    });

    response.cookies.set('admin_session', process.env.ADMIN_SESSION_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
