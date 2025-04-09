import type { NextMiddleware } from 'next/server';
// import type { User } from '@type/user.type';
// import type { Token } from '@type/auth.type';

// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import { decode } from 'jsonwebtoken';

// import { CookieService } from '@service/cookie/cookie.service';
// import { Page } from '@constant/link.constant';
// import { Headers } from '@constant/headers.constant';

export function protectedRouteMiddleware(nextMiddleware: NextMiddleware): NextMiddleware {
  return async (request, event) => {
    // const cookieService = new CookieService(cookies);
    // const pathname = request.nextUrl.pathname;
    // const userJson = request.headers.get(Headers.User);

    // const unAuthPage = pathname === Page.LogIn
    // const user = userJson ? (JSON.parse(userJson) as User) : null

    // if (!unAuthPage && !user) return NextResponse.redirect(new URL(Page.LogIn, request.url))
    // if (pathname === '/') return NextResponse.redirect(new URL(Page.Cars, request.url))

    return nextMiddleware(request, event);
  };
}
