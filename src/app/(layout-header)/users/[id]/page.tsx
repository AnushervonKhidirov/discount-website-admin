'use client';
import type { User } from '@type/user.type';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { notification } from 'antd/es';
import { UserService } from '@service/user/user.service';
import { requestWithRefresh } from '@helper/request.helper';

const UsersPage = () => {
  const { id: userId } = useParams<{ id: string }>();

  const [api, context] = notification.useNotification();
  const userService = new UserService();
  const [user, setUser] = useState<User | null>(null);

  async function getUser() {
    const [user, err] = await requestWithRefresh(() => userService.getUser(+userId));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setUser(user);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    user && (
      <>
        {context}
        <div>{user.id}</div>
        <div>{user.username}</div>
        <div>{user.role}</div>
        <div>{user.archived}</div>
        <div>
          {user.createdAt.toDateString()}, {user.createdAt.toLocaleTimeString()}
        </div>
        <div>
          {user.updatedAt.toDateString()}, {user.updatedAt.toLocaleTimeString()}
        </div>
      </>
    )
  );
};

export default UsersPage;
