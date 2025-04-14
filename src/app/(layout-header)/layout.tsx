import type { ReactNode } from 'react';

import { CookiesProvider } from 'next-client-cookies/server';
import Header from '@component/common/header/header';
import Content from '@component/common/content/content';

const HeaderLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <CookiesProvider>
      <Header />
      <main>
        <Content>{children}</Content>
      </main>
    </CookiesProvider>
  );
};

export default HeaderLayout;
