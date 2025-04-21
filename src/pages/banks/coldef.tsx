import type { Dispatch, SetStateAction } from 'react';
import type { FormInstance, TableColumnsType } from 'antd/es';
import type { UploadFile } from 'antd/es/upload';
import type { Bank } from '@type/bank.type';
import type { User } from '@type/user.type';

import { Flex, Tag, Button, Input, Form, Switch, Upload, Popconfirm } from 'antd/es';
import { PlusOutlined } from '@ant-design/icons';
import { Endpoint } from '@constant/endpoint.constant';
import { Role } from '@type/user.type';

export function columns(
  currentUser: User,
  form: FormInstance<Bank>,
  editingKey: number | null,
  setEditingKey: Dispatch<SetStateAction<number | null>>,
  saveBankData: (id: number, file?: File) => void,
  deleteBank: (id: number) => void,
) {
  const columns: TableColumnsType<Bank> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '13em',
      render: (name: Bank['name'], bank: Bank) => {
        if (editingKey === bank.id) {
          return (
            <Form.Item
              name="name"
              style={{ margin: 0 }}
              rules={[{ required: true, message: 'Name is required!' }]}
              initialValue={name}
            >
              <Input />
            </Form.Item>
          );
        }

        return name;
      },
    },
    {
      title: 'Logo',
      dataIndex: 'logoUrl',
      key: 'logo',
      render: (logo: Bank['logoUrl'], bank: Bank) => {
        if (editingKey === bank.id) {
          const defaultFileList: UploadFile[] | undefined = logo
            ? [
                {
                  uid: '-1',
                  name: bank.name,
                  url: `${Endpoint.ServerPath}/${logo}`,
                },
              ]
            : undefined;

          return (
            <Form.Item label={null} valuePropName="file" style={{ margin: 0 }}>
              <Upload
                beforeUpload={file => saveBankData(bank.id, file)}
                listType="picture-card"
                multiple={false}
                maxCount={1}
                defaultFileList={defaultFileList}
              >
                <button
                  style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          );
        }

        return logo ? (
          <img
            draggable={false}
            src={`${Endpoint.ServerPath}/${logo}`}
            alt={bank.name}
            height={25}
          />
        ) : (
          <span style={{ fontWeight: 700 }}>No Logo</span>
        );
      },
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
      title: 'Status',
      dataIndex: 'archived',
      key: 'archived',
      width: '7em',
      render: (archived: Bank['archived'], bank: Bank) => {
        if (editingKey === bank.id) {
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
      render: (_, bank: Bank) => {
        if (editingKey === bank.id) {
          return (
            <Flex gap={10} justify="center">
              <Button onClick={() => setEditingKey(null)}>Cancel</Button>
              <Button onClick={() => saveBankData(bank.id)}>Save</Button>
            </Flex>
          );
        }

        return (
          <Flex gap={10} justify="center">
            <Button
              onClick={() => {
                setEditingKey(bank.id);
                form.resetFields(Object.keys(bank) as (keyof Bank)[]);
              }}
            >
              Edit
            </Button>

            {currentUser.role === Role.SUPER_ADMIN && (
              <Popconfirm title={`Delete ${bank.name}?`} onConfirm={() => deleteBank(bank.id)}>
                <Button color="danger" variant="solid">
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
