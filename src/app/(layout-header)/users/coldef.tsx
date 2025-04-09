import type { TableColumnsType } from 'antd/es';
import type { User } from '@type/user.type';

import { Button, Flex, Tag } from 'antd/es';
import { Page } from '@constant/link.constant';

export const columns: TableColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: User['role']) => role.replace('_', ' '),
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: User['createdAt']) => `${date.toDateString()}, ${date.toLocaleTimeString()}`,
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date: User['updatedAt']) => `${date.toDateString()}, ${date.toLocaleTimeString()}`,
  },
  {
    title: 'Archived',
    dataIndex: 'archived',
    key: 'archived',
    render: (archived: User['archived']) => {
      if (archived) return <Tag color="error">Archived</Tag>;
      return <Tag color="success">Active</Tag>;
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, user: User) => {
      return (
        <Flex gap={10}>
          <Button type="link" href={`${Page.Users}/${user.id}`}>
            View Profile
          </Button>
        </Flex>
      );
    },
  },
];
