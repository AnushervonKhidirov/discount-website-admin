import type { Cookie } from '@type/common.type';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export class CookieService {
  private readonly cookies: (() => Promise<ReadonlyRequestCookies>) | undefined;

  constructor(cookies?: () => Promise<ReadonlyRequestCookies>) {
    this.cookies = cookies;
  }

  async setCookie(cookie: Cookie) {
    if (typeof document === 'object') {
      await this.setCookieClient(cookie);
    } else {
      await this.setCookieServer(cookie);
    }
  }

  async getCookie<T = unknown>(names?: (keyof T)[]): Promise<Cookie<T>> {
    if (typeof document === 'object') {
      return await this.getCookieClient(names);
    } else {
      return await this.getCookieServer(names);
    }
  }

  async deleteCookie() {
    if (typeof document === 'object') {
      return await this.deleteCookieClient();
    } else {
      return await this.deleteCookieServer();
    }
  }

  private async setCookieServer(cookie: Cookie) {
    if (!this.cookies) return;
    const cookies = await this.cookies();

    for (const name in cookie) {
      cookies.set(name, cookie[name]);
    }
  }

  private async getCookieServer<T = unknown>(names?: (keyof T)[]): Promise<Cookie<T>> {
    const cookie: Cookie = {};
    if (!this.cookies) return cookie;

    const cookies = await this.cookies();

    if (Array.isArray(names)) {
      names.forEach(name => {
        const foundedCookie = cookies.get(<string>name);
        if (foundedCookie) cookie[foundedCookie.name] = foundedCookie.value;
      });
    } else {
      const cookieArr = cookies.getAll();

      cookieArr.forEach(cookieItem => {
        const { name, value } = cookieItem;
        cookie[name] = value;
      });
    }

    return <Cookie<T>>cookie;
  }

  private async deleteCookieServer() {
    if (!this.cookies) return;

    const cookies = await this.cookies();

    cookies.getAll().forEach(cookie => {
      cookies.delete(cookie.name);
    });
  }

  private async setCookieClient(cookie: Cookie) {
    for (const name in cookie) {
      document.cookie = `${name}=${cookie[name]}`;
    }
  }

  private async getCookieClient<T = unknown>(names?: (keyof T)[]): Promise<Cookie<T>> {
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

  private async deleteCookieClient() {
    const cookieArr = document.cookie.replaceAll(' ', '').split(';');

    cookieArr.forEach(cookieItem => {
      const [name] = cookieItem.split('=');
      document.cookie = `${name}=; Max-Age=0;`
    });
  }
}

// 'refresh_token=; Max-Age=0;'
