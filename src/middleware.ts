import {
  NextRequestWithAuth,
  withAuth,
} from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(
  request: NextRequestWithAuth
) {
  if (
    request.nextUrl.pathname.startsWith('/admin/member/')
  ) {
    return;
  }

  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextauth.token?.roles.includes('admin')
  ) {
    return NextResponse.rewrite(
      new URL('/denied', request.url)
    );
  }
});

// all pages require authentication
export const config = {
  matcher: ['/:path*'],
};
