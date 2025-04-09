import { middlewareChain } from './service/middleware/chain';
import { authMiddleware } from './service/middleware/auth';
import { protectedRouteMiddleware } from './service/middleware/protected-route';

export default middlewareChain([authMiddleware, protectedRouteMiddleware]);

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
