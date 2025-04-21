import { BrowserRouter, Route, Routes } from 'react-router';

import { Page } from '@constant/link.constant';

import HeaderLayout from '@layout/header/header.layout';
import LoginPage from '@pages/login/login.page';
import ProfilePage from '@pages/profile/profile.page';
import UsersPage from '@pages/users/users.page';
import CompaniesPage from '@pages/companies/companies.page';
import BanksPage from '@pages/banks/banks.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Page.Login} element={<LoginPage />} />

        <Route element={<HeaderLayout />}>
          <Route path={Page.Profile} element={<ProfilePage />} />
          <Route path={Page.Users} element={<UsersPage />} />
          <Route path={Page.Companies} element={<CompaniesPage />} />
          <Route path={Page.Banks} element={<BanksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
