import type { Dispatch, SetStateAction } from 'react';
import type { FormInstance, TableColumnsType } from 'antd/es';
import type { DefaultOptionType } from 'antd/es/select';
import type { User } from '@type/user.type';

import { Role } from '@type/user.type';
import { Flex, Tag, Button, Input, Form, Select, Switch, Popconfirm } from 'antd/es';

export function columns(
  currentUser: User,
  form: FormInstance<User>,
  editingKey: number | null,
  setEditingKey: Dispatch<SetStateAction<number | null>>,
  saveUserData: (id: number) => void,
  deleteUser: (id: number) => void,
) {
  const columns: TableColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (username: User['username'], user: User) => {
        if (editingKey === user.id) {
          return (
            <Form.Item
              name="username"
              style={{ margin: 0 }}
              rules={[{ required: true, message: 'Username is required!' }]}
              initialValue={username}
            >
              <Input />
            </Form.Item>
          );
        }

        return username;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '13em',
      render: (role: User['role'], user: User) => {
        if (editingKey === user.id && currentUser.role === Role.SUPER_ADMIN) {
          const options: DefaultOptionType[] = [
            { value: Role.SUPER_ADMIN },
            { value: Role.ADMIN },
            { value: Role.USER },
          ];

          return (
            <Form.Item
              name="role"
              style={{ margin: 0 }}
              rules={[{ required: true, message: 'Role is required!' }]}
              initialValue={role}
            >
              <Select options={options} />
            </Form.Item>
          );
        }

        return role;
      },
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
      title: 'Status',
      dataIndex: 'archived',
      key: 'archived',
      width: '7em',
      render: (archived: User['archived'], user: User) => {
        if (editingKey === user.id) {
          return (
            <Form.Item
              name="archived"
              style={{ margin: 0 }}
              rules={[{ required: true, message: 'Status is required!' }]}
            >
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Archived"
                defaultChecked={!archived}
              />
            </Form.Item>
          );
        }

        return archived ? <Tag color="error">Archived</Tag> : <Tag color="success">Active</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '13em',
      render: (_, user: User) => {
        if (editingKey === user.id && user.role !== Role.SUPER_ADMIN) {
          return (
            <Flex gap={10} justify="center">
              <Button onClick={() => setEditingKey(null)}>Cancel</Button>
              <Button onClick={() => saveUserData(user.id)}>Save</Button>
            </Flex>
          );
        }

        return (
          <Flex gap={10} justify="center">
            <Button
              disabled={user.role === Role.SUPER_ADMIN}
              onClick={() => {
                setEditingKey(user.id);
                form.resetFields(Object.keys(user) as (keyof User)[]);
              }}
            >
              Edit
            </Button>

            {currentUser.role === Role.SUPER_ADMIN && (
              <Popconfirm title={`Delete ${user.username}?`} onConfirm={() => deleteUser(user.id)}>
                <Button disabled={user.role === Role.SUPER_ADMIN} color="danger" variant="solid">
                  Delete
                </Button>
              </Popconfirm>
            )}
          </Flex>
        );
      },
    },
  ];

  return columns;
}
