import type { User } from '@type/user.type';

import { useEffect, useState } from 'react';
import { notification, Table, Form } from 'antd/es';
import { useUserStore } from '@store/user.store';
import { UserService } from '@service/user/user.service';
import { requestWithRefresh } from '@helper/request.helper';

import { columns } from './coldef';

const UsersPage = () => {
  const [api, context] = notification.useNotification();
  const { user: currentUser } = useUserStore();
  const userService = new UserService();

  const [form] = Form.useForm<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);

  async function getUsers() {
    const [users, err] = await requestWithRefresh(() => userService.getAll());

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      setUsers(users);
    }
  }

  async function saveUserData(id: number) {
    const formData = form.getFieldsValue();
    if (typeof formData.archived === 'boolean') formData.archived = !formData.archived;
    setEditingKey(null);

    const [updateUser, err] = await requestWithRefresh(() => userService.update(id, formData));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${updateUser.username} updated` });
      setUsers(users => {
        return users.map(user => (user.id === updateUser.id ? updateUser : user));
      });
    }
  }

  async function deleteUser(id: number) {
    const [deletedUser, err] = await requestWithRefresh(() => userService.delete(id));

    if (err) {
      api.error({ message: err.error, description: err.message });
    } else {
      api.success({ message: 'Success', description: `${deletedUser.username} deleted` });
      setUsers(users => {
        return users.filter(user => user.id !== deletedUser.id);
      });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    currentUser && (
      <>
        {context}
        <Form form={form}>
          <Table<User>
            dataSource={users}
            columns={columns(
              currentUser,
              form,
              editingKey,
              setEditingKey,
              saveUserData,
              deleteUser,
            )}
            rowKey={({ id }) => id}
          />
        </Form>
      </>
    )
  );
};

export default UsersPage;
