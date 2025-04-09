import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { User } from '@type/user.type';
import type { Token } from '@type/auth.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { ReturnPromiseWithErr } from '@type/return-with-error.type';
import { HttpError } from '@error/http.error';
import { isError, returnError } from '@helper/response.helper';
import { CookieService } from '@service/cookie/cookie.service';

export class UserService {
  private readonly cookies: (() => Promise<ReadonlyRequestCookies>) | undefined;

  constructor(cookies?: () => Promise<ReadonlyRequestCookies>) {
    this.cookies = cookies;
  }

  async getUser(id: number): ReturnPromiseWithErr<User> {
    try {
      const cookieService = new CookieService(
        typeof document !== 'object' ? this.cookies : undefined,
      );

      const { accessToken } = await cookieService.getCookie<Token>(['accessToken']);

      const { data } = await axios.get<User | HttpError>(
        Endpoint.GetUser.replace(':id', id.toString()),
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          validateStatus: () => true,
        },
      );

      if (isError(data)) throw new HttpError(data.status, data.error, data.message);

      return [data, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
