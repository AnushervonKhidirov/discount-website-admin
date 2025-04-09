'use client';
import type { User } from '@type/user.type';

import { useEffect, useState } from 'react';
import { notification, Table } from 'antd/es';
import { UserService } from '@service/user/user.service';

import { columns } from './coldef';

const UsersPage = () => {
  const [api, context] = notification.useNotification();
  const userService = new UserService();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getUsers() {
    setIsLoading(true);

    const [users, err] = await userService.getAllUsers();

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setUsers(users);
      console.log(new Date(users[0].createdAt));
    }

    setIsLoading(false);
    console.log(isLoading);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {context}
      <Table<User> dataSource={users} columns={columns} rowKey={({ id }) => id} />
    </div>
  );
};

export default UsersPage;
