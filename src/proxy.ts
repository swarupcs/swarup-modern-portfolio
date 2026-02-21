import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin';
  const isAuthApi = pathname === '/api/admin/auth';

  if (isAdminRoute && !isLoginPage && !isAuthApi) {
    const session = request.cookies.get('admin_session');
    const validSecret = process.env.ADMIN_SESSION_SECRET;

    if (!session || session.value !== validSecret) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
