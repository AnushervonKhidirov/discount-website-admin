import type { Cookie } from '@type/common.type';

export class CookieService {
  set(cookie: Cookie) {
    for (const name in cookie) {
      document.cookie = `${name}=${cookie[name]}`;
    }
  }

  get<T = unknown>(names?: (keyof T)[]): Cookie<T> {
    const cookie: Cookie = {};
    const cookieArr = document.cookie.replaceAll(' ', '').split(';');

    cookieArr.forEach(cookieItem => {
      const [name, value] = cookieItem.split('=');

      if (Array.isArray(names)) {
        if (names.includes(<keyof T>name)) cookie[name] = value;
      } else {
        cookie[name] = value;
      }
    });

    return <Cookie<T>>cookie;
  }

  deleteAll() {
    const cookieArr = document.cookie.replaceAll(' ', '').split(';');

    cookieArr.forEach(cookieItem => {
      const [name] = cookieItem.split('=');
      document.cookie = `${name}=; Max-Age=0;`;
    });
  }
}
