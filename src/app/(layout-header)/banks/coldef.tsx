import type { TableColumnsType } from 'antd/es';
import type { Bank } from '@type/bank.type';

import { Flex, Tag } from 'antd/es';
import { Page } from '@constant/link.constant';
import Link from 'next/link';

export const columns: TableColumnsType<Bank> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Bank['createdAt']) => `${date.toDateString()}, ${date.toLocaleTimeString()}`,
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date: Bank['updatedAt']) => `${date.toDateString()}, ${date.toLocaleTimeString()}`,
  },
  {
    title: 'Archived',
    dataIndex: 'archived',
    key: 'archived',
    render: (archived: Bank['archived']) => {
      if (archived) return <Tag color="error">Archived</Tag>;
      return <Tag color="success">Active</Tag>;
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, user: Bank) => {
      return (
        <Flex gap={10}>
          <Link type="link" href={`${Page.Banks}/${user.id}`}>
            View Bank
          </Link>
        </Flex>
      );
    },
  },
];
