'use client';
import type { User } from '@type/user.type';

import { useEffect, useState } from 'react';
import { notification, Table } from 'antd/es';
import { UserService } from '@service/user/user.service';
import { requestWithRefresh } from '@helper/request.helper';

import { columns } from './coldef';

const UsersPage = () => {
  const [api, context] = notification.useNotification();
  const userService = new UserService();
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers() {
    const [users, err] = await requestWithRefresh(() => userService.getAllUsers());

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setUsers(users);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {context}
      <Table<User> dataSource={users} columns={columns} rowKey={({ id }) => id} />
    </>
  );
};

export default UsersPage;
