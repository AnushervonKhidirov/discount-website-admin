import type { NextMiddleware } from 'next/server';
import type { Token as TToken } from '@type/auth.type';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decode } from 'jsonwebtoken';

import { CookieService } from '@service/cookie/cookie.service';
import { UserService } from '@service/user/user.service';
import { Headers } from '@constant/headers.constant';
import { Page } from '@constant/link.constant';
import { requestWithRefresh } from '@helper/request.helper';

export function authMiddleware(nextMiddleware: NextMiddleware): NextMiddleware {
  return async (request, event) => {
    const pathname = request.nextUrl.pathname;
    if (pathname === Page.Login) return nextMiddleware(request, event);

    const userService = new UserService(cookies);
    const cookieService = new CookieService(cookies);

    async function redirectToLogin() {
      await cookieService.deleteCookie();
      return NextResponse.redirect(new URL(Page.Login, request.url));
    }

    const { accessToken } = await cookieService.getCookie<TToken>(['accessToken']);
    if (!accessToken) return redirectToLogin();

    const payload = decode(accessToken);
    if (typeof payload === 'string' || !payload?.sub || !payload?.role) {
      return redirectToLogin();
    }

    const id = +payload.sub;
    const [user, err] = await requestWithRefresh(() => userService.getUser(id), cookies);

    if (err) return redirectToLogin();

    request.headers.set(Headers.User, JSON.stringify(user));

    return nextMiddleware(request, event);
  };
}
