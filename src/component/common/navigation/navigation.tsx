'use client';
import type { MenuProps } from 'antd/es';
import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'antd/es';
import { Page } from '@constant/link.constant';

import classNames from 'classnames';
import classes from './navigation.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    label: <Link href={Page.Users}>Users</Link>,
    key: getFromUrl(Page.Users),
  },
  {
    label: <Link href={Page.Companies}>Companies</Link>,
    key: getFromUrl(Page.Companies),
  },
  {
    label: <Link href={Page.Banks}>Banks</Link>,
    key: getFromUrl(Page.Banks),
  },
  {
    label: <Link href={Page.Discounts}>Discounts</Link>,
    key: getFromUrl(Page.Discounts),
  },
  {
    label: <Link href={Page.Cashbacks}>Cashback</Link>,
    key: getFromUrl(Page.Cashbacks),
  },
];

function getFromUrl(url: string) {
  return url.replaceAll('/', ' ').trim().split(' ')[0];
}

const Navigation: FC<AdditionalProps> = ({ className }) => {
  const pathname = usePathname();
  return (
    <Menu
      className={classNames(classes.navigation, className)}
      items={menuItems}
      selectedKeys={[getFromUrl(pathname)]}
    />
  );
};

export default Navigation;
