import type { FC } from 'react';
import type { AdditionalProps } from '@type/common.type';

import { useUserStore } from '@store/user.store';
import { NavLink } from 'react-router';
import { Button, Avatar } from 'antd/es';
import { UserOutlined } from '@ant-design/icons';
import { Page } from '@constant/link.constant';

import classNames from 'classnames';
import classes from './profile-btn.module.css';

const ProfileBtn: FC<AdditionalProps> = ({ className }) => {
  const { user } = useUserStore();

  return (
    user && (
      <Button className={classNames(classes.profile_btn, className)}>
        <NavLink to={Page.Profile}>
          <Avatar className={classes.avatar} icon={<UserOutlined />} shape="square" />
          <div className={classes.username}>{user.username}</div>
          <div className={classes.role}>{user.role.replaceAll('_', ' ').toLocaleLowerCase()}</div>
        </NavLink>
      </Button>
    )
  );
};

export default ProfileBtn;
