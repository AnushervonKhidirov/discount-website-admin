import type { FC } from 'react';
import type { User } from '@type/user.type';
import type { AdditionalProps } from '@type/common.type';

import '@ant-design/v5-patch-for-react-19';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Button, Avatar } from 'antd/es';
import { UserOutlined } from '@ant-design/icons';
import { Headers } from '@constant/headers.constant';
import { Page } from '@constant/link.constant';

import classNames from 'classnames';
import classes from './profile-btn.module.css';

const ProfileBtn: FC<AdditionalProps> = async ({ className }) => {
  const header = await headers();
  const userJson = header.get(Headers.User);
  if (!userJson) redirect(Page.Login);
  const user = JSON.parse(userJson) as User;

  return (
    <Button className={classNames(classes.profile_btn, className)}>
      <Link href={Page.Profile}>
        <Avatar className={classes.avatar} icon={<UserOutlined />} shape="square" />
        <div className={classes.username}>{user.username}</div>
        <div className={classes.role}>{user.role.toLowerCase().replace('_', ' ')}</div>
      </Link>
    </Button>
  );
};

export default ProfileBtn;
