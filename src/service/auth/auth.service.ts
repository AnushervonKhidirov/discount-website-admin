import type { LoginData, Token } from '@type/auth.type';
import type { ReturnPromiseWithErr } from '@type/return-with-error.type';

import axios from 'axios';
import { Endpoint } from '@constant/endpoint.constant';
import { HttpError } from '@error/http.error';
import { isHttpError, returnError } from '@helper/response.helper';

export class AuthService {
  async signin(body: LoginData): ReturnPromiseWithErr<Token> {
    try {
      const { data: user } = await axios.post<Token | HttpError>(Endpoint.Signin, body, {
        validateStatus: () => true,
      });

      if (isHttpError(user)) throw new HttpError(user.status, user.error, user.message);

      return [user, null];
    } catch (err) {
      return returnError(err);
    }
  }

  async refreshToken(refreshToken: string): ReturnPromiseWithErr<Token> {
    try {
      const { data: token } = await axios.post<Token | HttpError>(
        Endpoint.RefreshToken,
        { refreshToken },
        {
          validateStatus: () => true,
        },
      );

      if (isHttpError(token)) throw new HttpError(token.status, token.error, token.message);

      return [token, null];
    } catch (err) {
      return returnError(err);
    }
  }
}
