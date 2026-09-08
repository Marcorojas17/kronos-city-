// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const url = request.nextUrl;

  // Rutas públicas
  const isPublicPath = 
    url.pathname.startsWith('/login') ||
    url.pathname.startsWith('/api/auth') ||
    url.pathname === '/' ||
    url.pathname.startsWith('/api/verify') ||
    url.pathname.startsWith('/verificar') ||
    url.pathname.startsWith('/offline');

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // SUPER_ADMIN puede todo
    if (role === 'SUPER_ADMIN') {
      return NextResponse.next();
    }

    // Restricciones por rol
    if (url.pathname.startsWith('/dashboard/admin')) {
      if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    if (url.pathname.startsWith('/dashboard/auditor')) {
      if (role !== 'AUDITOR' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    // Para rutas de API, similar
    if (url.pathname.startsWith('/api/admin')) {
      if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }

    if (url.pathname.startsWith('/api/auditor')) {
      if (role !== 'AUDITOR' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/admin/:path*',
    '/api/auditor/:path*',
    '/api/normas/:path*',
    '/api/requisitos/:path*',
    '/api/auditorias/:path*',
  ],
};
