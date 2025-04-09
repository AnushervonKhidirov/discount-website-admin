import type { User } from '@type/user.type';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Button, Avatar } from 'antd/es';
import { UserOutlined } from '@ant-design/icons';
import { Headers } from '@constant/headers.constant';

import { Page } from '@constant/link.constant';
import classes from './profile-btn.module.css';

const ProfileBtn = async () => {
  const header = await headers();
  const userJson = header.get(Headers.User);
  if (!userJson) redirect(Page.Login);
  const user = JSON.parse(userJson) as User;

  return (
    <Button className={classes.profile_btn} href={Page.Profile}>
      <Avatar className={classes.avatar} icon={<UserOutlined />} shape="square" />
      <div className={classes.username}>{user.username}</div>
      <div className={classes.role}>{user.role.toLowerCase().replace('_', ' ')}</div>
    </Button>
  );
};

export default ProfileBtn;
