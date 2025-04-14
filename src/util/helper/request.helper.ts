import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';
import type { Token } from '@type/auth.type';

import { AuthService } from '@service/auth/auth.service';
import { CookieService } from '@service/cookie/cookie.service';
import { HttpError } from '@error/http.error';
import { returnError } from './response.helper';

export const requestWithRefresh = async <T>(
  request: () => ReturnPromiseWithErr<T>,
  cookieStore?: () => Promise<ReadonlyRequestCookies>,
): ReturnPromiseWithErr<T> => {
  try {
    const [response, err] = await request();

    if (err) {
      if (err instanceof HttpError && err.status === 401) {
        const authService = new AuthService();
        const cookieService = new CookieService(cookieStore);
        
        const { refreshToken } = await cookieService.getCookie<Token>(['refreshToken']);
        if (!refreshToken) throw new HttpError(401, 'Unauthorized', 'Token not found');

        const [tokens, tokenErr] = await authService.refreshToken(refreshToken);
        if (tokenErr) throw tokenErr;

        await cookieService.setCookie(tokens);

        const [response, requestErr] = await request();
        if (requestErr) throw requestErr;

        return [response, null];
      }

      throw err;
    }

    return [response, null];
  } catch (err) {
    return returnError(err);
  }
};
